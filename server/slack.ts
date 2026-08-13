import { OFFER_FIELDS, offerFlags } from "./email";

/**
 * Posts new form submissions to a Slack channel through an incoming webhook.
 *
 * This exists because email is the fragile channel: it needs a paid sending
 * service, a verified sender and working deliverability, and when any of those
 * lapse the failure is silent. A webhook needs none of that — it is one POST to
 * a URL, free on every Slack plan, and it lands where the team already is.
 *
 * Email and Slack are independent. Configure either, both, or neither; each
 * checks its own configuration and stays quiet if it is missing.
 */

const TITLES: Record<string, string> = {
  offer: "New /offer application",
  join: "New Join submission",
  talk: "New Contact submission",
};

/** Slack renders text as mrkdwn, so the few characters it treats as markup go. */
function clean(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .slice(0, 700);
}

export async function sendSlackNotification(
  formType: string,
  data: Record<string, string>,
): Promise<void> {
  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[slack] SLACK_WEBHOOK_URL not set — skipping notification");
    return;
  }

  const isOffer = formType === "offer";

  /* Offer submissions get the curated field order shared with the email
     notifier; everything else just lists whatever keys it sent. */
  const entries: Array<[string, string]> = isOffer
    ? OFFER_FIELDS.filter(([key]) => key in data).map(([key, label]) => [
        label,
        data[key] || "—",
      ])
    : Object.entries(data).map(([key, value]) => [key, value || "—"]);

  const flags = isOffer ? offerFlags(data) : [];

  const headline = data.brand
    ? `*${clean(data.brand)}* — ${clean(data.name || "no name given")}`
    : `*${clean(data.name || "New submission")}*`;

  const blocks: unknown[] = [
    {
      type: "header",
      text: { type: "plain_text", text: TITLES[formType] || "New submission" },
    },
    { type: "section", text: { type: "mrkdwn", text: headline } },
  ];

  if (flags.length) {
    blocks.push({
      type: "section",
      text: { type: "mrkdwn", text: `:warning: *${flags.map(clean).join("*\n:warning: *")}*` },
    });
  }

  /* Slack caps a section's fields array at 10, so the rest go into one block
     below rather than being silently dropped. */
  const fieldPairs = entries.slice(0, 10).map(([label, value]) => ({
    type: "mrkdwn",
    text: `*${clean(label)}*\n${clean(value)}`,
  }));
  if (fieldPairs.length) {
    blocks.push({ type: "section", fields: fieldPairs });
  }
  const overflow = entries.slice(10);
  if (overflow.length) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: overflow.map(([l, v]) => `*${clean(l)}*: ${clean(v)}`).join("\n"),
      },
    });
  }

  if (data.email) {
    blocks.push({
      type: "context",
      elements: [{ type: "mrkdwn", text: `Reply to ${clean(data.email)}` }],
    });
  }

  const payload = {
    // Fallback for notifications and screen readers, which ignore blocks.
    text: `${TITLES[formType] || "New submission"}: ${data.brand || data.name || ""}`.trim(),
    blocks,
  };

  const response = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(
      `Slack webhook returned ${response.status}: ${await response.text()}`,
    );
  }
}
