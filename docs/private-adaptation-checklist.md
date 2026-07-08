# Private Adaptation Checklist

Use this checklist before turning the public starter kit into a private, production workflow.

## Keep Public And Private Work Separate

- Keep this public starter kit generic and dry-run only.
- Create a separate private repository for real integrations.
- Do not copy real customer names, campaign names, lead lists, mailbox IDs, Sheet IDs, or credentials into the public repository.

## Data And Credentials

- Store credentials in a secret manager or private environment variables.
- Keep OAuth refresh tokens, API keys, cookies, and passwords out of Git.
- Use synthetic sample rows in public examples.
- Define a data retention policy before storing private lead data.

## Review And Approval

- Require human review before any outreach is sent.
- Track who reviewed each lead and when.
- Store the approval decision separately from the raw score.
- Treat scores as prioritization hints, not permission to contact.

## Stop-Contact Handling

- Maintain a stop-contact list for replies, bounces, unsubscribes, and manual stops.
- Check stop-contact state before any follow-up.
- Preserve audit logs for stop-contact changes.
- Never continue a sequence after a stop condition is triggered.

## Delivery Integration

- Add sending providers only in a private implementation.
- Start with low-volume manual or reviewed sends.
- Log message ID, timestamp, recipient, template, reviewer, and stop conditions.
- Confirm jurisdiction-specific email, privacy, and anti-spam requirements before sending.

## Verification Before Launch

- Run automated tests.
- Run a dry-run against synthetic or approved test data.
- Review logs for accidental private data exposure.
- Confirm opt-out language and stop-contact handling.
- Confirm no public repository diff contains secrets or private project identifiers.
