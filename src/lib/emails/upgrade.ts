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
 * Upgrade Email 1
 * "You've got a second project — nice"
 * Triggered when a free user tries to create a second project.
 */
export function upgradeEmail1({
  name,
  appUrl = "https://overage.app",
}: {
  name: string;
  appUrl?: string;
}): EmailResult {
  return {
    subject: "You've got a second project \u2014 nice",
    html: layout(`
              <p style="margin: 0 0 16px 0;">Hey ${name},</p>
              <p style="margin: 0 0 16px 0;">You just tried to create a second project. That means business is good. Nice.</p>
              <p style="margin: 0 0 16px 0;">The free plan covers one project. To track scope on every project, upgrade to Pro.</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <div style="border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px 32px; display: inline-block;">
                      <p style="margin: 0; font-size: 14px; color: #666666;">Overage Pro</p>
                      <p style="margin: 4px 0 0 0; font-size: 28px; font-weight: 700; color: #0f0f0f;">$8<span style="font-size: 16px; font-weight: 400; color: #666666;">/mo</span></p>
                      <p style="margin: 8px 0 0 0; font-size: 14px; color: #666666;">Unlimited projects. Unlimited additions.</p>
                    </div>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 16px 0;">That's less than the cost of one scope addition you'd otherwise eat.</p>
              ${ctaButton("Upgrade to Pro", `${appUrl}/settings/billing`)}
              <p style="margin: 0;">Vaibhav</p>
    `),
  };
}

/**
 * Upgrade Email 2 — sent 3 days after upgrade email 1
 * "How much scope creep did project #1 have?"
 * Takes project stats to make the case concrete.
 */
export function upgradeEmail2({
  name,
  projectName,
  totalTracked,
  appUrl = "https://overage.app",
}: {
  name: string;
  projectName: string;
  totalTracked: number;
  appUrl?: string;
}): EmailResult {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalTracked);

  return {
    subject: `How much scope creep did ${projectName} have?`,
    html: layout(`
              <p style="margin: 0 0 16px 0;">Hey ${name},</p>
              <p style="margin: 0 0 16px 0;">Here's a snapshot from your project <strong>${projectName}</strong>:</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 20px 32px; display: inline-block;">
                      <p style="margin: 0; font-size: 14px; color: #92400e;">Scope additions tracked</p>
                      <p style="margin: 4px 0 0 0; font-size: 32px; font-weight: 700; color: #d97706;">${formattedAmount}</p>
                    </div>
                  </td>
                </tr>
              </table>
              <p style="margin: 0 0 16px 0;">Imagine having that visibility on <em>every</em> project.</p>
              <p style="margin: 0 0 16px 0;">Pro is $8/mo. That's less than one scope addition. And it pays for itself the first time a client sees a report and pays the difference.</p>
              ${ctaButton("Upgrade to Pro", `${appUrl}/settings/billing`)}
              <p style="margin: 0;">Vaibhav</p>
    `),
  };
}
