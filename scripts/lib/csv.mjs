import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { repoRoot } from "./config.mjs";

export const defaultLeadsPath = resolve(repoRoot, "examples/sample-leads.csv");

export async function loadCsvRows(csvPath = defaultLeadsPath) {
  const raw = await readFile(csvPath, "utf8");
  return parseCsv(raw);
}

export function parseCsv(raw) {
  const rows = raw.trim().split(/\r?\n/).map(parseCsvLine);
  const [headers, ...records] = rows;

  return records.map((record) => {
    const row = {};
    for (const [index, header] of headers.entries()) {
      row[header] = record[index] ?? "";
    }
    return row;
  });
}

function parseCsvLine(line) {
  const cells = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === "\"" && inQuotes && next === "\"") {
      cell += "\"";
      index += 1;
    } else if (char === "\"") {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      cells.push(cell);
      cell = "";
    } else {
      cell += char;
    }
  }

  cells.push(cell);
  return cells.map((value) => value.trim());
}
