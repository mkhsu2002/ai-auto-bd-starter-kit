export function scoreLeads(config, leads) {
  const duplicateMap = buildDuplicateMap(leads);
  const excludedIndustries = new Set(config.target_segments.excluded_industries.map(normalize));

  return leads.map((lead) => {
    const signals = buildSignals(lead);
    const score = calculateScore(config.lead_scoring.rules, signals);
    const duplicateOf = duplicateMap.get(lead.lead_id) ?? "";
    const excluded = bool(lead.excluded_industry) || excludedIndustries.has(normalize(lead.industry));
    const status = getStatus({
      score,
      duplicateOf,
      excluded,
      thresholds: config.lead_scoring.thresholds
    });

    return {
      ...lead,
      score,
      signals,
      duplicate_of: duplicateOf,
      review_status: status
    };
  });
}

export function summarizeScores(scoredLeads) {
  return scoredLeads.reduce(
    (summary, lead) => {
      summary.total += 1;
      summary[lead.review_status] = (summary[lead.review_status] ?? 0) + 1;
      return summary;
    },
    {
      total: 0,
      ready_to_review: 0,
      hold: 0,
      not_ready: 0,
      excluded: 0,
      duplicate: 0
    }
  );
}

function buildSignals(lead) {
  const hasPublicEmail = Boolean(lead.public_email);
  const hasWebsite = Boolean(lead.website_url);
  const noPublicContact = bool(lead.no_public_contact) || !hasPublicEmail;

  return {
    has_public_email: hasPublicEmail,
    has_website: hasWebsite,
    weak_website: bool(lead.weak_website),
    local_service_business: bool(lead.local_service_business),
    has_clear_region: Boolean(lead.region),
    chain_store: bool(lead.chain_store),
    no_public_contact: noPublicContact
  };
}

function calculateScore(rules, signals) {
  return Object.entries(rules).reduce((total, [rule, weight]) => {
    return signals[rule] ? total + weight : total;
  }, 0);
}

function getStatus({ score, duplicateOf, excluded, thresholds }) {
  if (duplicateOf) return "duplicate";
  if (excluded) return "excluded";
  if (score >= thresholds.ready_to_review) return "ready_to_review";
  if (score >= thresholds.hold) return "hold";
  return "not_ready";
}

function buildDuplicateMap(leads) {
  const seen = new Map();
  const duplicates = new Map();

  for (const lead of leads) {
    const key = dedupeKey(lead);
    if (!key) continue;

    if (seen.has(key)) {
      duplicates.set(lead.lead_id, seen.get(key));
    } else {
      seen.set(key, lead.lead_id);
    }
  }

  return duplicates;
}

function dedupeKey(lead) {
  if (lead.public_email) return `email:${normalize(lead.public_email)}`;
  if (lead.website_url) return `website:${normalizeUrl(lead.website_url)}`;
  if (lead.business_name && lead.region) {
    return `name-region:${normalize(lead.business_name)}:${normalize(lead.region)}`;
  }
  return "";
}

function normalizeUrl(value) {
  return normalize(value).replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function bool(value) {
  return ["true", "yes", "1", "y"].includes(normalize(value));
}
