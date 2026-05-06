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

  const siteUrl = process.env.REPLIT_DOMAINS
    ? `https://${process.env.REPLIT_DOMAINS.split(",")[0].trim()}`
    : process.env.REPLIT_DEV_DOMAIN
    ? `https://${process.env.REPLIT_DEV_DOMAIN}`
    : "https://thestoryshapers.com";

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

  const siteUrl = process.env.REPLIT_DOMAINS
    ? `https://${process.env.REPLIT_DOMAINS.split(",")[0].trim()}`
    : process.env.REPLIT_DEV_DOMAIN
    ? `https://${process.env.REPLIT_DEV_DOMAIN}`
    : "https://thestoryshapers.com";

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
