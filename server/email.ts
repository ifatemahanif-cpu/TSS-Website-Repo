import sgMail from "@sendgrid/mail";

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "";
const FROM_NAME = "The Story Shapers";

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

function baseTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${FROM_NAME}</title>
</head>
<body style="margin:0;padding:0;background-color:#0C0A3E;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0C0A3E;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;">
          <!-- Header -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(255,255,255,0.4);">The Story Shapers</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding-top:28px;border-top:1px solid rgba(255,255,255,0.08);margin-top:28px;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);line-height:1.6;">
                You're receiving this because you subscribed to Notes from the Margins.<br/>
                <a href="{{UNSUBSCRIBE_URL}}" style="color:rgba(167,139,250,0.7);text-decoration:none;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendWelcomeEmail(email: string, unsubscribeToken: string): Promise<void> {
  if (!process.env.SENDGRID_API_KEY || !FROM_EMAIL) {
    console.warn("[email] SendGrid not configured — skipping welcome email");
    return;
  }

  const siteUrl = process.env.SITE_URL
    || (process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(",")[0].trim()}` : null)
    || (process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : null)
    || "https://www.storyshaperscollective.com";

  const unsubscribeUrl = `${siteUrl}/api/subscribers/unsubscribe?token=${unsubscribeToken}`;

  const content = `
    <h1 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;color:#FFFFFF;line-height:1.3;letter-spacing:-0.02em;">
      Welcome to Notes from the Margins.
    </h1>
    <p style="margin:0 0 20px;font-size:15px;color:rgba(255,255,255,0.7);line-height:1.7;">
      Good brands are built on thinking, not just things to post. You've just signed up for writing that takes that seriously.
    </p>
    <p style="margin:0 0 28px;font-size:15px;color:rgba(255,255,255,0.7);line-height:1.7;">
      We'll send you new pieces when they're worth your time — no newsletters for the sake of newsletters, no weekly content calendars to fill. Just thinking, when we have something worth saying.
    </p>
    <a href="${siteUrl}/blog" style="display:inline-block;background-color:#7B1E7A;color:#FFFFFF;text-decoration:none;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;padding:12px 24px;border-radius:6px;">
      Read the blog →
    </a>
  `;

  const html = baseTemplate(content).replace("{{UNSUBSCRIBE_URL}}", unsubscribeUrl);

  try {
    await sgMail.send({
      to: email,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: "You're in — Notes from the Margins",
      html,
    });
    console.log(`[email] Welcome email sent to ${email}`);
  } catch (err: any) {
    console.error("[email] Failed to send welcome email:", err?.response?.body || err?.message);
  }
}

export async function sendNewPostNotification(
  subscribers: Array<{ email: string; unsubscribeToken: string }>,
  post: { title: string; slug: string; excerpt: string | null; authorName: string }
): Promise<void> {
  if (!process.env.SENDGRID_API_KEY || !FROM_EMAIL) {
    console.warn("[email] SendGrid not configured — skipping new post notification");
    return;
  }
  if (subscribers.length === 0) {
    console.log("[email] No active subscribers — skipping new post notification");
    return;
  }

  const siteUrl = process.env.SITE_URL
    || (process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(",")[0].trim()}` : null)
    || (process.env.REPLIT_DEV_DOMAIN ? `https://${process.env.REPLIT_DEV_DOMAIN}` : null)
    || "https://www.storyshaperscollective.com";

  const postUrl = `${siteUrl}/blog/${post.slug}`;

  let sent = 0;
  let failed = 0;

  for (const sub of subscribers) {
    const unsubscribeUrl = `${siteUrl}/api/subscribers/unsubscribe?token=${sub.unsubscribeToken}`;

    const content = `
      <p style="margin:0 0 8px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(167,139,250,0.8);">New from The Story Shapers</p>
      <h1 style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;color:#FFFFFF;line-height:1.3;letter-spacing:-0.02em;">
        ${post.title}
      </h1>
      ${post.excerpt ? `<p style="margin:0 0 28px;font-size:15px;color:rgba(255,255,255,0.65);line-height:1.7;border-left:2px solid rgba(167,139,250,0.4);padding-left:16px;">${post.excerpt}</p>` : ""}
      <p style="margin:0 0 28px;font-size:13px;color:rgba(255,255,255,0.4);">By ${post.authorName}</p>
      <a href="${postUrl}" style="display:inline-block;background-color:#7B1E7A;color:#FFFFFF;text-decoration:none;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;padding:12px 24px;border-radius:6px;">
        Read the article →
      </a>
    `;

    const html = baseTemplate(content).replace("{{UNSUBSCRIBE_URL}}", unsubscribeUrl);

    try {
      await sgMail.send({
        to: sub.email,
        from: { email: FROM_EMAIL, name: FROM_NAME },
        subject: post.title,
        html,
      });
      sent++;
    } catch (err: any) {
      console.error(`[email] Failed to send to ${sub.email}:`, err?.response?.body || err?.message);
      failed++;
    }
  }

  console.log(`[email] New post notification: ${sent} sent, ${failed} failed (${subscribers.length} total)`);
}


/** Human labels for the offer form, in the order we want to read them. */
/* Exported so the Slack notifier shows the same fields in the same order, and
   so the triage rules below can never drift between the two channels. */
export const OFFER_FIELDS: Array<[string, string]> = [
  ["name", "Name"],
  ["brand", "Brand"],
  ["email", "Email"],
  ["whatsapp", "WhatsApp"],
  ["instagram", "Instagram"],
  ["website", "Current website"],
  ["whatYouDo", "What the brand does"],
  ["stage", "Stage"],
  ["needsStore", "Needs to sell products directly"],
  ["assetsIn48h", "Assets within 48h"],
  ["decisionMaker", "Decision maker"],
  ["liveBy", "Wants to be live"],
  ["whatsBroken", "What's not working"],
  ["priceAcknowledged", "Agreed to terms"],
  ["referrer", "Referrer"],
];

/** The qualification read, so nobody has to work it out by eye. */
export function offerFlags(data: Record<string, string>): string[] {
  const flags: string[] = [];
  if (data.needsStore === "Yes")
    flags.push("NEEDS A STORE — primary disqualifier");
  if (data.needsStore === "Not sure")
    flags.push("Unsure about commerce — probe on the call");
  if (data.assetsIn48h === "No")
    flags.push("Cannot send assets in 48h — timeline risk");
  if (data.assetsIn48h === "Probably")
    flags.push("Hesitant on assets — timeline risk");
  if (data.liveBy === "Just exploring")
    flags.push("Just exploring — soft disqualify");
  return flags;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Notification for any public form submission (offer / join / talk).
 * Fire-and-forget — the submission is already saved before this is called, so
 * a SendGrid failure must never fail the request.
 */
export async function sendFormNotification(
  formType: string,
  data: Record<string, string>,
): Promise<void> {
  if (!process.env.SENDGRID_API_KEY || !FROM_EMAIL) {
    console.warn("[email] SendGrid not configured — skipping form notification");
    return;
  }

  const to = (process.env.NOTIFY_EMAIL || FROM_EMAIL)
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
  if (!to.length) return;

  const isOffer = formType === "offer";

  /* Offer submissions get the fixed field order; join/talk just dump whatever
     keys they sent, in insertion order. */
  const entries: Array<[string, string]> = isOffer
    ? OFFER_FIELDS.filter(([key]) => key in data).map(([key, label]) => [
        label,
        data[key] || "—",
      ])
    : Object.entries(data).map(([key, value]) => [key, value || "—"]);

  const rows = entries
    .map(
      ([label, value]) => `<tr>
        <td style="padding:8px 16px 8px 0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.4);vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
        <td style="padding:8px 0;font-size:14px;line-height:1.6;color:rgba(255,255,255,0.9);">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");

  const flags = isOffer ? offerFlags(data) : [];
  const flagHtml = flags.length
    ? `<div style="margin-top:24px;padding:14px 16px;background-color:rgba(123,30,122,0.18);border-left:3px solid #7B1E7A;border-radius:4px;">
         <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.6);">Flags</p>
         <ul style="margin:8px 0 0;padding-left:18px;font-size:14px;line-height:1.7;color:#FFFFFF;">
           ${flags.map((flag) => `<li>${escapeHtml(flag)}</li>`).join("")}
         </ul>
       </div>`
    : "";

  const heading = isOffer
    ? `${escapeHtml(data.brand || "New")} — ${escapeHtml(data.name || "applicant")}`
    : `New ${escapeHtml(formType)} submission`;

  const label = isOffer
    ? "New offer application"
    : `New ${escapeHtml(formType)} submission`;

  const content = `
    <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.45);">${label}</p>
    <h1 style="margin:10px 0 26px;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:400;color:#FFFFFF;line-height:1.3;letter-spacing:-0.02em;">
      ${heading}
    </h1>
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>
    ${flagHtml}
    <p style="margin:26px 0 0;font-size:12px;line-height:1.6;color:rgba(255,255,255,0.35);">
      Received ${new Date().toISOString()} · read and reply from the admin dashboard.
    </p>
  `;

  /* baseTemplate() carries the newsletter unsubscribe line — strip it, this is
     an internal notification, not a marketing email. */
  const html = baseTemplate(content)
    .replace(
      /You're receiving this because you subscribed to Notes from the Margins\.<br\/>\s*<a href="\{\{UNSUBSCRIBE_URL\}\}"[^>]*>Unsubscribe<\/a>/,
      "Internal notification from storyshaperscollective.com",
    )
    .replace("{{UNSUBSCRIBE_URL}}", "#");

  const text = entries
    .map(([labelText, value]) => `${labelText}: ${value}`)
    .join("\n")
    .concat(
      flags.length ? `\n\nFlags:\n${flags.map((f) => `- ${f}`).join("\n")}` : "",
    );

  const subject = isOffer
    ? `[Offer] ${data.brand || "New"} — ${data.name || "applicant"}${
        data.needsStore === "Yes" ? " (needs a store)" : ""
      }`
    : `[${formType}] ${data.name || data.email || "New submission"}`;

  try {
    await sgMail.send({
      to,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      /* Reply goes straight to the applicant. */
      ...(data.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)
        ? { replyTo: data.email }
        : {}),
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("[email] form notification failed:", error);
  }
}
