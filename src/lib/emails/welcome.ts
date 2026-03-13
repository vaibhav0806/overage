type EmailResult = { subject: string; html: string };

function layout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Overage</title>
</head>
<body style="margin: 0; padding: 0; background-color: #ffffff; font-family: system-ui, -apple-system, sans-serif; color: #1a1a1a; line-height: 1.6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width: 560px; width: 100%;">
          <tr>
            <td style="font-size: 16px; color: #1a1a1a;">
${content}
            </td>
          </tr>
          <tr>
            <td style="padding-top: 40px; border-top: 1px solid #e5e5e5; margin-top: 40px; font-size: 13px; color: #888888; text-align: center;">
              <p style="margin: 0 0 8px 0; font-weight: 600; color: #666666;">Overage</p>
              <p style="margin: 0 0 8px 0;">Stop doing free work for your clients.</p>
              <a href="{{unsubscribe_url}}" style="color: #888888; text-decoration: underline;">Unsubscribe</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ctaButton(text: string, url: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" style="padding: 24px 0;">
      <a href="${url}" style="display: inline-block; background-color: #0f0f0f; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 15px; font-weight: 600;">${text}</a>
    </td>
  </tr>
</table>`;
}

/**
 * Welcome Email 1 — sent on Day 0
 * "Your scope creep tracker is ready"
 */
export function welcomeEmail1({
  name,
  appUrl = "https://overage.app",
}: {
  name: string;
  appUrl?: string;
}): EmailResult {
  return {
    subject: "Your scope creep tracker is ready",
    html: layout(`
              <p style="margin: 0 0 16px 0;">Hey ${name},</p>
              <p style="margin: 0 0 16px 0;">Welcome to Overage. You now have a way to track every time a client asks for "just one more thing."</p>
              <p style="margin: 0 0 16px 0;">Here's how to get started:</p>
              <ol style="margin: 0 0 16px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;"><strong>Create a project</strong> &mdash; name it after your client or gig.</li>
                <li style="margin-bottom: 8px;"><strong>Log your first addition</strong> &mdash; that extra feature, revision, or "small change" they asked for.</li>
                <li style="margin-bottom: 8px;"><strong>Watch the total grow</strong> &mdash; you'll see exactly how much free work you're doing.</li>
              </ol>
              <p style="margin: 0 0 4px 0;">It takes about 30 seconds.</p>
              ${ctaButton("Go to your dashboard", `${appUrl}/dashboard`)}
              <p style="margin: 0;">Vaibhav</p>
    `),
  };
}

/**
 * Welcome Email 2 — sent on Day 1
 * "The $3,200 email"
 */
export function welcomeEmail2({
  name,
  appUrl = "https://overage.app",
}: {
  name: string;
  appUrl?: string;
}): EmailResult {
  return {
    subject: "The $3,200 email",
    html: layout(`
              <p style="margin: 0 0 16px 0;">Hey ${name},</p>
              <p style="margin: 0 0 16px 0;">Quick story.</p>
              <p style="margin: 0 0 16px 0;">A freelance developer quoted a client <strong>$8,000</strong> for a project. Clean scope, clear deliverables.</p>
              <p style="margin: 0 0 16px 0;">Then it started. "Can we also add..." "One more small thing..." "This shouldn't take long, right?"</p>
              <p style="margin: 0 0 16px 0;">By the end, they'd done <strong>$11,200</strong> worth of work. They ate the extra <span style="color: #d97706; font-weight: 600;">$3,200</span> because they had no documentation, no paper trail, and no easy way to bring it up.</p>
              <p style="margin: 0 0 16px 0;">Here's the same project with Overage:</p>
              <ul style="margin: 0 0 16px 0; padding-left: 20px;">
                <li style="margin-bottom: 8px;">Every addition logged in 10 seconds as it happened.</li>
                <li style="margin-bottom: 8px;">Running total visible at all times.</li>
                <li style="margin-bottom: 8px;">Professional scope change report generated and sent to the client.</li>
              </ul>
              <p style="margin: 0 0 16px 0;">The client paid the difference. No awkward conversation &mdash; just a clean report showing what was added and what it cost.</p>
              <p style="margin: 0 0 16px 0;"><strong>Log your first addition &mdash; it takes 10 seconds.</strong></p>
              ${ctaButton("Log an addition", `${appUrl}/dashboard`)}
              <p style="margin: 0;">Vaibhav</p>
    `),
  };
}

/**
 * Welcome Email 3 — sent on Day 3
 * "Quick question"
 */
export function welcomeEmail3({
  name,
}: {
  name: string;
}): EmailResult {
  return {
    subject: "Quick question",
    html: layout(`
              <p style="margin: 0 0 16px 0;">Hey ${name},</p>
              <p style="margin: 0 0 16px 0;">Have you logged your first scope addition yet?</p>
              <p style="margin: 0 0 16px 0;">If not, I'm curious &mdash; what's blocking you? No project active right now? Not sure how to categorize something? Just haven't gotten to it?</p>
              <p style="margin: 0 0 16px 0;">Reply to this email. I read every one.</p>
              <p style="margin: 0;">Vaibhav</p>
    `),
  };
}
