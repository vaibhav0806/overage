import { welcomeEmail1 } from "./welcome";

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
 * Onboarding Email 1 — Day 0
 * Same as welcome email 1
 */
export const onboardingEmail1 = welcomeEmail1;

/**
 * Onboarding Email 2 — Day 3
 * "You're sitting on unbilled money right now"
 */
export function onboardingEmail2({
  name,
  appUrl = "https://overage.app",
}: {
  name: string;
  appUrl?: string;
}): EmailResult {
  return {
    subject: "You're sitting on unbilled money right now",
    html: layout(`
              <p style="margin: 0 0 16px 0;">Hey ${name},</p>
              <p style="margin: 0 0 16px 0;">Try this right now. It'll take 60 seconds.</p>
              <p style="margin: 0 0 16px 0;">Open your latest client project &mdash; the one you're working on today. Think about everything that was added after the original quote or agreement.</p>
              <p style="margin: 0 0 16px 0;">The "oh, can you also..." requests. The extra revisions. The features that weren't in the original scope.</p>
              <p style="margin: 0 0 16px 0;">Now log those in Overage. Each one takes about 10 seconds. Give it a name, estimate the hours, and set your rate.</p>
              <p style="margin: 0 0 16px 0;">The number you see might surprise you.</p>
              ${ctaButton("Create a project", `${appUrl}/dashboard`)}
              <p style="margin: 0;">Vaibhav</p>
    `),
  };
}

/**
 * Onboarding Email 3 — Day 5
 * "Your first scope change report"
 */
export function onboardingEmail3({
  name,
  appUrl = "https://overage.app",
}: {
  name: string;
  appUrl?: string;
}): EmailResult {
  return {
    subject: "Your first scope change report",
    html: layout(`
              <p style="margin: 0 0 16px 0;">Hey ${name},</p>
              <p style="margin: 0 0 16px 0;">If you've logged a few scope additions, you can now generate a scope change report.</p>
              <p style="margin: 0 0 16px 0;">Here's the thing &mdash; you don't have to send it to your client today. Just see what it looks like.</p>
              <p style="margin: 0 0 16px 0;">Open your project, hit "Generate Report," and look at the total. It's a clean, professional summary of everything that was added beyond the original scope, with dollar amounts attached.</p>
              <p style="margin: 0 0 16px 0;">Most freelancers tell me seeing that number for the first time is an eye-opener.</p>
              ${ctaButton("See your report", `${appUrl}/dashboard`)}
              <p style="margin: 0;">Vaibhav</p>
    `),
  };
}

/**
 * Onboarding Email 4 — Day 8
 * "How other freelancers use Overage"
 */
export function onboardingEmail4({
  name,
}: {
  name: string;
}): EmailResult {
  return {
    subject: "How other freelancers use Overage",
    html: layout(`
              <p style="margin: 0 0 16px 0;">Hey ${name},</p>
              <p style="margin: 0 0 16px 0;">Three ways freelancers are using Overage:</p>
              <p style="margin: 0 0 8px 0;"><strong>1. Mid-project check-in</strong></p>
              <p style="margin: 0 0 16px 0;">Halfway through a project, share the scope report with your client. "Hey, just want to flag &mdash; we've added $2K in extras so far. Want to keep going or adjust?" Clients respect this. It builds trust and avoids the awkward end-of-project surprise.</p>
              <p style="margin: 0 0 8px 0;"><strong>2. End-of-project reconciliation</strong></p>
              <p style="margin: 0 0 16px 0;">Project's done. Before you send the final invoice, generate the scope report. Attach it. "Here's a breakdown of what was added beyond our original agreement." Clean, professional, hard to argue with.</p>
              <p style="margin: 0 0 8px 0;"><strong>3. CYA documentation</strong></p>
              <p style="margin: 0 0 16px 0;">Some clients are difficult. You know the ones. Overage gives you a timestamped log of every addition they requested. If things get contentious, you have receipts.</p>
              <p style="margin: 0 0 16px 0;">Pick whichever fits your situation. They all start with logging the additions.</p>
              <p style="margin: 0;">Vaibhav</p>
    `),
  };
}

/**
 * Onboarding Email 5 — Day 14
 * "Your scope tracking so far"
 */
export function onboardingEmail5({
  name,
  trackedAmount,
  appUrl = "https://overage.app",
}: {
  name: string;
  trackedAmount: number;
  appUrl?: string;
}): EmailResult {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(trackedAmount);

  const hasTracked = trackedAmount > 0;

  const body = hasTracked
    ? `
              <p style="margin: 0 0 16px 0;">Hey ${name},</p>
              <p style="margin: 0 0 16px 0;">Two weeks in. Here's where you stand:</p>
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
              <p style="margin: 0 0 16px 0;">That's money you would have lost without a paper trail. Keep logging &mdash; it adds up fast.</p>
              ${ctaButton("View your dashboard", `${appUrl}/dashboard`)}
              <p style="margin: 0;">Vaibhav</p>`
    : `
              <p style="margin: 0 0 16px 0;">Hey ${name},</p>
              <p style="margin: 0 0 16px 0;">It's been two weeks and you haven't logged any scope additions yet.</p>
              <p style="margin: 0 0 16px 0;">Here's the thing &mdash; scope creep is happening on your projects right now. Every freelancer deals with it. The only question is whether you're tracking it or eating the cost.</p>
              <p style="margin: 0 0 16px 0;">Even if you don't plan to charge for the extras, knowing the number changes how you price future projects. It's data you're currently throwing away.</p>
              <p style="margin: 0 0 16px 0;">Start with one project. One addition. Takes 10 seconds.</p>
              ${ctaButton("Log your first addition", `${appUrl}/dashboard`)}
              <p style="margin: 0;">Vaibhav</p>`;

  return {
    subject: "Your scope tracking so far",
    html: layout(body),
  };
}
