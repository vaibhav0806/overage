# Scope Creep: Execution Plan — Idea to Paying Users

A complete, product-specific execution plan for building and launching **Scope Creep** — the tool that turns untracked scope drift into documented, billable work for freelancers.

> **Skill hygiene: Only install skills for the phase you're currently executing.**
> Too many skills pollute your context window, cause trigger conflicts, and slow things down.
> Each phase below has its own install block — run it when you enter that phase, not before.
> You can uninstall unused skills with `npx skills remove <skill-name>` when you move on.

---

## Phase 1: Ideation & Problem Discovery — COMPLETE (Validated)

**Status**: Skip — already validated. Documented here for reference.

### Problem Statement

"I help freelancers and small agencies track scope additions so they can get paid for the extra work or push back professionally."

### Evidence

- Freelancers lose 15–30% of project value to untracked scope additions (industry surveys, freelancer community data)
- Individual additions feel minor ("can you also add a contact form?"), so freelancers absorb them to avoid the awkward conversation — but they compound into thousands of dollars of free work
- Duct tape solutions exist everywhere: freelancers track scope changes in Google Docs, Notion pages, Slack messages, or not at all — no purpose-built tool exists
- Reddit threads in r/freelance, r/webdev, r/graphic_design regularly surface complaints about clients adding "just one more thing"
- No direct competitor occupies this space. PM tools (Asana, Monday, Linear) track tasks; time trackers (Toggl, Harvest) track hours. Neither frames deviations as *money owed against the original agreement*
- Built-in distribution: the scope change report itself gets sent to clients, exposing non-users to the product

### Confidence

- MVP buildable solo in 1–2 weeks (CRUD app with PDF generation)
- Users already lose real money from this problem — the ROI case writes itself
- Blue ocean: no one owns "scope deviation tracking as a billing tool"

### Exit Criteria — PASSED
- [x] One clear problem statement
- [x] Evidence that people care
- [x] Confidence in solo MVP in 1–2 weeks

---

## Phase 2: Strategic Positioning & Market Analysis

**Goal**: Lock in positioning, persona, pricing, and competitive wedge before building anything.

### Skills Install — Phase 2
```bash
npx skills add supercent-io/skills-template@bmad-idea -g -y
npx skills add coreyhaines31/marketingskills@marketing-psychology -g -y
npx skills add phuryn/pm-skills@pricing-strategy -g -y
npx skills add wondelai/skills@hundred-million-offers -g -y
```

### Steps

#### 1. Competitive Landscape Analysis

**Direct competitors**: None. This is a blue ocean.

**Adjacent tools people misuse for this job**:

| Tool | What it does well | Why it fails at scope tracking |
|------|------------------|-------------------------------|
| **Toggl / Harvest** | Tracks hours spent | Doesn't distinguish in-scope vs. out-of-scope hours. No dollar-value framing against original agreement. |
| **Asana / Monday / Linear** | Manages tasks | Treats all tasks equally. No concept of "this was added after the contract was signed." |
| **FreshBooks / QuickBooks** | Invoicing | Only captures what you bill, not what you *should have* billed. No scope deviation tracking. |
| **Google Docs / Notion** | Flexible notes | Manual, unstructured, no dollar calculations, not client-presentable as a professional document. |
| **Email / Slack** | Communication | Scope additions are buried in threads. No aggregation, no totals, no export. |

**Key insight**: Every existing tool either tracks *all work* or tracks *money billed*. Nothing tracks the **gap** — work that was added beyond the original agreement but never billed. That gap is Scope Creep's entire market.

#### 2. Positioning Statement

> **Scope Creep is the only tool built for freelancers that turns scope drift into a documented, billable process — so you never eat the cost of "just one more thing" again.**

**Wedge**: Niche focus. We don't compete with PM tools or time trackers. We sit alongside them and do one thing no other tool does: quantify the dollar value of scope deviations and produce a professional document for the client conversation.

#### 3. Target Persona

**Primary persona: "Tired Taylor"**
- Freelance web developer or designer, 2–8 years experience
- Works on 2–5 client projects at a time
- Charges $75–$150/hr or $3K–$15K per project
- Loses $500–$3,000 per project to scope creep
- Knows scope creep is happening but doesn't track it because it feels petty to bring up a $200 addition — until there are fifteen of them
- Uses Notion/Figma/VS Code daily. Comfortable with web tools.
- Pain: "I finished the project and realized I did 40% more work than I quoted for"
- Dream: "I want to send the client a professional document that shows exactly what was added, so the conversation isn't awkward — it's just data"

**Secondary persona: "Agency Alex"**
- Runs a 2–5 person agency/studio
- Manages 5–15 projects at once
- Scope creep compounds across team members — harder to spot
- Needs the team to log scope additions, not just the lead
- Will upgrade to paid faster because the dollar amounts are larger

#### 4. Pricing Model

**Structure**: Freemium with project-count gating.

| Tier | Price | What you get |
|------|-------|-------------|
| **Free** | $0 | 1 active project. Log scope additions, see running total, generate 1 report/month. |
| **Pro** | $8/mo | Unlimited projects. Unlimited reports. Report branding customization. CSV export. |

**Rationale**:
- **Why $8/mo**: At 1 project/month, even a modest freelancer loses $500+ to scope creep. $8 to recover even 10% of that is a 6x+ ROI. It's an impulse price — no procurement, no approval needed, no sticker shock.
- **Why not $15+**: At this stage, conversion volume matters more than ARPU. $8 removes friction. Price can increase later once PMF is proven and features expand.
- **Why project-count gating (not feature gating)**: The free tier must deliver the full "aha moment" — logging additions, seeing the dollar total, generating a report. If you gate features, free users never experience the value and never convert. Gate on *scale* (1 project) so they convert when they have a second project, which is when they're clearly an active freelancer who needs this.
- **Why not annual plans at launch**: Too early. Add annual (2 months free) after 50+ paying users to improve retention and cash flow.

#### 5. Offer Stack

**The $8/mo Pro plan includes**:
- Unlimited active projects
- Unlimited scope change reports (PDF + shareable link)
- Custom branding on reports (your logo, colors — not Scope Creep's)
- CSV export of all scope additions
- Dollar-value dashboard across all projects
- "Powered by Scope Creep" removed from reports (free tier reports include this — distribution mechanic)
- Cancel anytime, no contract

**Guarantee**: "If Scope Creep doesn't help you recover at least $8 in your first month, email us and we'll refund you. No questions." (This will almost never get triggered — the product surfaces hundreds to thousands in unbilled work.)

### Exit Criteria
- [x] Clear positioning statement: "The only tool that turns scope drift into a documented, billable process"
- [x] Identified wedge: niche focus on the gap between original scope and actual work, framed as money
- [x] Pricing model decided: Free (1 project) / $8/mo (unlimited)
- [x] Target persona defined: "Tired Taylor" — freelance dev/designer losing $500–$3K/project
- [x] Offer stack designed: unlimited projects + reports + custom branding + export

---

## Phase 3: Build the MVP

**Goal**: Ship the smallest thing that delivers the core value — log scope additions, see the dollar total, generate a professional report.

### Skills Install — Phase 3
```bash
npx skills add kostja94/marketing-skills@landing-page-generator -g -y
npx skills add manutej/luxor-claude-marketplace@ux-principles -g -y
# frontend-design is pre-installed
```

### The Magic Moment

The user logs their first scope addition with a dollar value, sees the running total update, and thinks: *"Holy shit, they've already added $1,200 of extra work and it's only week 3."*

Everything in the MVP exists to get the user to that moment as fast as possible.

### MVP Feature Set — What to Build

1. **Project creation**: Name, client name, original quoted price, original scope summary (free-text)
2. **Scope addition logging**: For each addition — description, date, estimated hours, hourly rate (pre-filled from project default), calculated dollar value, status (pending / approved / rejected / absorbed)
3. **Running scope total dashboard**: Per-project view showing total # of additions, total dollar value, % of original quote represented by additions
4. **Scope change report generation**: Professional PDF and shareable-link report the freelancer sends to the client. Includes: project name, client name, date range, table of additions (description, date, value), total dollar value, optional note from freelancer
5. **Authentication**: Magic link email auth (no passwords to manage)
6. **Landing page**: Built into the app at `/` route — the marketing IS the product
7. **Payment**: Stripe Checkout for $8/mo Pro upgrade

### What NOT to Build for MVP

- Team/collaboration features (solo users first)
- Integrations (no Slack, no Jira, no Notion — bolt-on later)
- Time tracking (not your job — Toggl exists)
- Client portal / client login (the report is a static document, not a collaboration space)
- Contract or SOW generation (stay in your lane)
- Mobile app (PWA responsiveness is enough)
- Analytics dashboard for the user (they don't need charts; they need the number)
- Notification emails ("you have new scope additions") — overkill for MVP
- Settings page with 20 options
- Admin dashboard

### Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 16 (App Router) | Full-stack in one repo. SSR for landing page SEO. API routes for backend. |
| **Database** | NeonDB (Postgres) | Serverless Postgres. Generous free tier. Branches for preview envs later. |
| **ORM** | Drizzle | TypeScript-native, first-class Neon support, schema-as-code with migrations. |
| **Auth** | Better Auth (self-hosted) | Open source, runs in our app. Email+password. No external service needed. |
| **Hosting** | Railway | Simple deploys, good DX, supports Next.js natively. |
| **Payments** | DodoPayments | Checkout for $8/mo. Webhook to update user plan. Billing portal for cancellation. |
| **PDF generation** | `@react-pdf/renderer` or Puppeteer (headless Chrome) | `@react-pdf/renderer` for simple layouts; Puppeteer if you want the report to match the web preview exactly. |
| **Shareable report links** | Public Next.js route `/report/[id]` with unique token | No auth required for viewing. The report is a public page with an unguessable URL. |
| **Styling** | Tailwind CSS v4 | Fast to build, consistent, no design system needed. |
| **Email (transactional)** | Resend | Welcome email, transactional emails. Simple API, good DX. |
| **Analytics** | Plausible or PostHog (Cloud) | Don't build your own. Drop in a script tag. |

### Data Model

```
User (managed by Better Auth — "users" table)
├── id (text, primary key — Better Auth generates this)
├── email (text, unique)
├── email_verified (boolean)
├── name (text)
├── image (text, nullable)
├── plan (text: free | pro)
├── stripe_customer_id (text, nullable)
├── default_hourly_rate (numeric, nullable)
├── created_at (timestamptz)
├── updated_at (timestamptz)

Session (Better Auth — "sessions" table)
├── id, token, expires_at, user_id, ip_address, user_agent, created_at, updated_at

Account (Better Auth — "accounts" table)
├── id, account_id, provider_id, user_id, access_token, refresh_token, password, etc.

Verification (Better Auth — "verifications" table)
├── id, identifier, value, expires_at, created_at, updated_at

Project
├── id (uuid)
├── user_id → User
├── name ("Acme Corp Website Redesign")
├── client_name ("Acme Corp")
├── client_email (optional, for report delivery)
├── original_quote (decimal, e.g. 8000.00)
├── original_scope (text — free-form summary of what was agreed)
├── hourly_rate (decimal — default for additions on this project)
├── currency (USD | EUR | GBP | CAD | AUD)
├── status (active | completed | archived)
├── created_at

ScopeAddition
├── id (uuid)
├── project_id → Project
├── description ("Add contact form to About page")
├── date_requested (date)
├── estimated_hours (decimal)
├── hourly_rate (decimal — inherited from project, overridable)
├── (dollar_value is computed client-side: estimated_hours × hourly_rate — not stored)
├── status (pending | approved | rejected | absorbed)
├── client_requested (boolean — was this requested by client or discovered by freelancer?)
├── notes (text, optional — "Client asked via Slack on 3/5")
├── created_at

Report
├── id (uuid)
├── project_id → Project
├── share_token (unique string for public URL)
├── title ("Scope Change Report — March 2026")
├── date_range_start (date)
├── date_range_end (date)
├── included_additions (uuid[] — which ScopeAdditions are in this report)
├── freelancer_note (text — optional message to the client)
├── generated_at
├── branding_logo_url (nullable — Pro only)
├── branding_color (nullable — Pro only)
├── show_powered_by (boolean — true for free, false for Pro)
```

### Build Order — Week by Week

**Week 1: Core Loop (Days 1–5)**

| Day | What to build |
|-----|--------------|
| **Day 1** ✅ | Project setup: Next.js 16 + NeonDB + Drizzle + Tailwind v4. DB schema. Better Auth (email+password). Basic layout shell with nav. |
| **Day 2** ✅ | Project CRUD: Create project form (name, client, quote, scope summary, hourly rate). Project list view. Project detail page (empty state). Dashboard with stats. |
| **Day 3** ✅ | Scope addition CRUD: "Log Addition" form on project detail page (description, date, hours, rate, status). Addition list on project detail. Running total calculation displayed prominently. |
| **Day 4** ✅ | Report generation: "Generate Report" flow — select date range, pick additions, add note. Public report page at `/report/[token]`. PDF download via `@react-pdf/renderer`. Reports section on project detail. |
| **Day 5** ✅ | Polish: Real scope addition totals on dashboard. Select All/Deselect All on report form. Date handling fixes. Full flow works: create project → log additions → generate report → view/share link → download PDF. |

**Week 2: Monetization + Landing Page (Days 6–10)**

| Day | What to build |
|-----|--------------|
| **Day 6** ✅ | Landing page at `/`. Hero with animated scope counter, feature blocks, before/after story, objection handler, pricing cards, final CTA. Instrument Serif display font. Editorial design. |
| **Day 7** ✅ | DodoPayments integration: Checkout session for $8/mo. Webhook to update user plan. Billing portal link for cancellation. Gate project creation (free tier: 1 active project). |
| **Day 8** ✅ | Report branding: Pro users can upload logo + pick accent color for reports. Free-tier reports show "Powered by Overage" footer with link. |
| **Day 9** ✅ | Onboarding: After signup, 2-step flow — (1) set your default hourly rate, (2) create your first project. Empty states with clear CTAs everywhere. |
| **Day 10** ✅ | Deploy to Railway. Custom domain (overage.app). OG images. Final QA pass. Plausible/PostHog script added. Resend configured for transactional emails. |

### Exit Criteria
- [x] Core feature works end-to-end: create project → log additions → see running total → generate report
- [x] User can sign up (email+password via Better Auth), use the product, and upgrade to Pro via DodoPayments
- [x] Landing page explains the value in 5 seconds
- [x] Deployed and accessible via Railway URL (overage-production.up.railway.app)
- [x] Custom domain (overage.app) configured — DNS pointed via Namecheap CNAME + Railway verification

---

## Phase 4: Pre-Launch Positioning

**Goal**: Craft messaging, write email sequences, and prepare all launch assets before going live.

### Skills Install — Phase 4
```bash
npx skills add coreyhaines31/marketingskills@product-marketing-context -g -y
npx skills add kostja94/marketing-skills@email-marketing -g -y
npx skills add supercent-io/skills-template@marketing-automation -g -y
npx skills add wondelai/skills@cro-methodology -g -y
npx skills add sickn33/antigravity-awesome-skills@page-cro -g -y
npx skills add reynau/landing-page-optimization@landing-page-optimization -g -y
npx skills add wshobson/agents@startup-metrics-framework -g -y
npx skills add sickn33/antigravity-awesome-skills@analytics-tracking -g -y
npx skills add alinaqi/claude-bootstrap@posthog-analytics -g -y
```

### Steps

#### 1. Landing Page Copy (Actual Copy)

**Headline**: Stop doing free work for your clients.

**Subhead**: Freelancers lose thousands to "just one more thing." Scope Creep tracks every addition, calculates the dollar total, and generates a professional report you can send to your client — so you get paid for the work you actually did.

**CTA button**: Start tracking scope — free

**Social proof line** (before you have users): Built by a freelancer who lost $11,000 to scope creep last year.

**Feature blocks**:

1. **Log additions in 10 seconds** — "Add contact form to About page. 3 hours. $450." Done. It's added to the running total.
2. **See the real cost of scope creep** — A running dollar total that updates every time something gets added. That "small" request? It's now $2,800.
3. **Send a professional scope change report** — Generate a branded PDF or shareable link. No awkward conversation — just clear documentation. "Here's what was added, here's what it costs."

**Objection handler** (below features): "But I don't want to seem difficult." — You're not being difficult. You're being professional. A scope change report isn't a complaint. It's documentation. Clients respect it because it treats the relationship as a business one.

**Pricing section**: Free for 1 project. $8/mo for unlimited projects, custom branding, and export. Cancel anytime.

**Final CTA**: Track your first scope addition — it takes 30 seconds.

#### 2. Before-After-Bridge Story

**Before**: You quoted $8,000 for a website redesign. The client loves your work. Then: "Can we add a blog?" "Actually, can the contact form also send to Slack?" "One more page would be great." Each request is small. Each one feels awkward to push back on. You finish the project. You did $11,200 worth of work. You got paid $8,000. You ate $3,200 and felt vaguely resentful.

**After**: You quoted $8,000. The same additions came in. But this time you logged each one in Scope Creep — 10 seconds per addition. At the midpoint, you sent the client a scope change report: "Here are the 9 additions since we started. The total value of added work is $3,200. How would you like to handle this?" The client paid the difference without argument. Because it wasn't an emotional conversation — it was a professional document with line items.

**Bridge**: Scope Creep turns scope drift from a feeling ("I think I'm doing more than I quoted for") into a fact ("The client has added $3,200 of work since the contract was signed"). Start logging scope additions today — it's free.

#### 3. Core Metrics to Track

- **North star metric**: Number of scope change reports generated per week (= users getting value)
- **Leading indicators**: Signups, scope additions logged (activation), reports generated (value delivery)
- **Lagging indicators**: Free-to-Pro conversion rate, monthly churn, MRR
- **Activation definition**: User logs at least 3 scope additions on their first project

#### 4. Email Sequences (Actual Subject Lines + Summaries)

**Welcome Sequence (3 emails, days 0–3)**:

| Day | Subject Line | Content |
|-----|-------------|---------|
| 0 | "Your scope creep tracker is ready" | Welcome. Here's how to create your first project and log your first addition. Link to 60-second quickstart. |
| 1 | "The $3,200 email" | Tell the Before/After story. "This is what happened when one freelancer started tracking scope additions." End with: "Log your first addition — it takes 10 seconds." |
| 3 | "Quick question" | "Have you logged your first scope addition yet? If not, what's blocking you? Reply to this email — I read every one." (genuine ask, surfaces onboarding friction) |

**Onboarding Drip (5 emails, days 0–14)**:

| Day | Subject Line | Purpose |
|-----|-------------|---------|
| 0 | "Your scope creep tracker is ready" | (same as welcome #1) |
| 3 | "You're sitting on unbilled money right now" | Prompt them to think about their current projects. "Open your latest client project. Think about what was added since the quote. Log those additions now." |
| 5 | "Your first scope change report" | Walk through generating a report. "You don't have to send it today. But see what it looks like. See the total." |
| 8 | "How other freelancers use Scope Creep" | 2–3 short use cases: mid-project check-in, end-of-project reconciliation, "CYA documentation" for difficult clients. |
| 14 | "Your scope tracking so far" | Recap their usage. If they've logged additions: "You've tracked $X in scope additions. That's money you'd have lost." If they haven't: "You haven't logged anything yet — here's why that matters." |

**Upgrade Nudge (for free users who hit the 1-project limit)**:

| Email | Subject Line | Content |
|-------|-------------|---------|
| 1 | "You've got a second project — nice" | "You tried to create a second project. That means business is good. Upgrade to Pro for $8/mo and track every project." |
| 2 (3 days later) | "How much scope creep did project #1 have?" | Recap their stats from the free project. "Imagine having this visibility on every project. $8/mo. Less than one scope addition." |

#### 5. Launch Assets Checklist

- [x] Landing page live with CTA → signup flow
- [ ] 4 screenshots: (1) project dashboard with running total, (2) logging a scope addition, (3) scope change report (PDF preview), (4) report shared link (client view)
- [x] 30-second demo video (Remotion, 6 scenes, lofi BGM, SFX) — `demo.mp4`. Convert to GIF for PH/directories.
- [x] Open Graph image: "Stop doing free work for your clients." + app screenshot
- [x] Favicon and app icon
- [x] "Built by a freelancer" maker story (for Product Hunt and community posts) — see `maker-story.md`
- [x] Consistent branding: "Overage" + orange dot logo across login, landing page, onboarding, sidebar

### Exit Criteria
- [x] Landing page copy written and implemented
- [ ] Screenshots created — manual task (take from live app on overage.app)
- [ ] Plausible/PostHog tracking live — set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=overage.app` env var on Railway
- [x] Messaging doc complete (one-liner, paragraph, full page) — see `messaging.md`
- [x] All 3 email sequences written — see `src/lib/emails/` (welcome, onboarding, upgrade)
- [ ] Load email sequences into Resend (welcome, onboarding drip, upgrade nudge)
- [x] Landing page CRO checklist passed — added mid-page CTAs, ROI callout, trust props, pricing nav link
- [x] Demo video complete — `demo.mp4` (Remotion)

---

## Phase 5: Launch

**Goal**: Get the first 100 signups.

### Skills Install — Phase 5
```bash
npx skills add ognjengt/founder-skills@product-hunt-launch-plan -g -y
npx skills add ognjengt/founder-skills@go-to-market-plan -g -y
npx skills add kostja94/marketing-skills@cold-start-strategy -g -y
npx skills add kostja94/marketing-skills@directory-submission -g -y
```

### Steps

#### 1. Community Seeding (Week 1 — Before Product Hunt)

Seed communities first to build initial momentum before the PH launch.

**Reddit — specific subreddits and post angles**:

| Subreddit | Post Title | Angle |
|-----------|-----------|-------|
| r/freelance (780K) | "I tracked every scope addition on my last 3 projects. I was doing $4,200 in free work." | Lead with personal story + data. Mention the tool at the end as "I built something to help." |
| r/webdev (2.3M) | "Scope creep cost me more than my hosting, tools, and subscriptions combined last year" | Frame scope creep as the most expensive hidden cost in freelancing. |
| r/graphic_design (4M) | "How I stopped doing free revisions without being 'that designer'" | Speak to the emotional angle — not wanting to seem difficult. |
| r/web_design (870K) | "I built a tool that calculates exactly how much free work you're doing for clients" | Direct product post, but lead with the problem. |
| r/SaaS (120K) | "I'm launching a scope creep tracker for freelancers — no competitors, blue ocean. Here's my approach." | Build-in-public angle for the SaaS community. |
| r/Entrepreneur (2.5M) | "The most underserved market I found: freelancers losing 15-30% of project value to scope creep" | Business opportunity angle. |
| r/consulting (180K) | "How do you handle scope creep with clients? I built something that made the conversation 10x easier" | Ask a question + offer solution. |

**Hacker News**:
- **Show HN title**: "Show HN: Scope Creep — Track scope additions and calculate how much free work you're doing for clients"
- **First comment**: Personal story. "I'm a freelance developer. Last year I went through my projects and estimated how much extra work I did that wasn't in the original scope. It was over $11K. Each individual addition was small — 'can you add a contact form?' 'can we change the navigation?' — but they compounded. I built Scope Creep to make the invisible visible: log each addition in 10 seconds, see the running dollar total, and generate a professional scope change report you can send to the client. Free for 1 project, $8/mo unlimited."

**Other communities**:

| Platform | Action |
|----------|--------|
| **Indie Hackers** | Post in the "Show IH" section. Angle: "Launching in a blue ocean — no one tracks scope creep as money." Share MRR updates monthly. |
| **Twitter/X** | Thread: "I lost $11K to scope creep last year. Here's how it happens (and what I built to fix it)." Tag #buildinpublic #freelance #indiehackers. |
| **Dev.to** | Article: "The hidden tax on freelancing: how scope creep steals 15-30% of your income" |
| **Designer News** | Submit with angle: "A tool that makes the scope conversation professional instead of awkward" |
| **Freelancer Facebook Groups** | Share the Before/After story. Don't lead with the product — lead with the problem and the $11K number. |

#### 2. Product Hunt Launch

**Timing**: Tuesday–Thursday, 12:01 AM PT.

**Tagline**: "Track scope drift. Calculate unbilled work. Get paid for it."

**Description**: "Freelancers lose 15–30% of project value to untracked scope additions. Scope Creep lets you log each addition in 10 seconds, see the running dollar total, and generate a professional scope change report to send your client. Stop eating the cost of 'just one more thing.'"

**First comment**: Same personal story as HN — the $11K revelation.

**Gallery**: 4 screenshots + 1 demo GIF (from Phase 4 assets).

**Maker story**: "I'm a freelance developer who was doing thousands of dollars in free work every year without realizing it. I built Scope Creep because I needed it myself."

#### 3. Directory Submissions

Submit to all of these in the first week:

| Directory | Category |
|-----------|----------|
| Product Hunt | Freelance, Productivity |
| BetaList | SaaS |
| SaaSHub | Project Management → Freelancer Tools |
| AlternativeTo | Listed as alternative to "manual scope tracking" |
| Indie Hackers Products | Freelance |
| ToolPilot.ai | Business → Freelance |
| SaaS Worthy | Project Management |
| GetApp | Freelance |
| G2 | Freelance Tools |
| Capterra | Freelance Software |
| awesome-selfhosted (GitHub) | If/when self-hosted option exists |
| awesome-indie (GitHub) | Indie SaaS products |
| MicroConf Connect | Community listing |

#### 4. Cold Outreach (20 Conversations)

**Where to find targets**:
- Reddit users who posted about scope creep problems in r/freelance, r/webdev, r/graphic_design
- Twitter users who tweeted about doing free work for clients
- Indie Hackers users who mentioned freelancing pains
- Freelancers in your network or local community

**DM template**:

> Hey [name], I saw your [post/tweet] about [specific scope creep problem they mentioned]. I've been dealing with the same thing — I actually calculated that I did $11K in free work last year from untracked scope additions.
>
> I built a small tool called Scope Creep that lets you log scope additions as they happen and generates a professional report you can send clients. Would love your feedback if you have 5 minutes to try it — it's free for your first project.
>
> No pressure at all, just thought it might help based on what you described.

**Goal**: 20 personal conversations. Not mass DMs. Read their actual post and reference it specifically.

### Exit Criteria
- [ ] Product Hunt launched
- [ ] Submitted to 10+ directories
- [ ] Posted in 5+ communities (Reddit, HN, IH, Twitter, Dev.to)
- [ ] Had 20+ personal conversations with target users
- [ ] First 100 signups

---

## Phase 6: Feedback Loop & Iteration

**Goal**: Determine if Scope Creep has product-market fit and iterate on what matters.

### Skills Install — Phase 6
```bash
npx skills add daffy0208/ai-dev-standards@customer-feedback-analyzer -g -y
npx skills add daffy0208/ai-dev-standards@product-analyst -g -y
npx skills add "daffy0208/ai-dev-standards@Product Strategist" -g -y
npx skills add kostja94/marketing-skills@pmf-strategy -g -y
```

### Steps

#### 1. Feedback Collection

**In-app feedback**: Add a single question after the user generates their first report: "Was this report useful enough to send to your client? Yes / No / Not sure." This is the most important activation signal.

**Churn survey** (when a Pro user cancels): One question: "What's the main reason you're canceling?" with options:
- I don't have enough active projects right now
- The reports didn't help with my client conversations
- I switched to tracking scope changes another way
- It's too expensive for what I get
- Other (free text)

**Direct conversations**: Email every user who generates a report in their first week. Subject: "How did the scope conversation go?" Ask what happened when they sent (or didn't send) the report. This is gold — it tells you if the product is actually changing behavior.

#### 2. Specific Feedback Questions to Ask

In calls or email conversations with active users, ask these:

1. "What happened the last time you sent a scope change report to a client?" (Actual outcome — did the client pay? Push back? Ignore?)
2. "How were you tracking scope changes before Scope Creep?" (Understand what you displaced)
3. "What almost stopped you from signing up?" (Surface objections to fix in marketing)
4. "Is there anything you're tracking outside of Scope Creep that you wish was inside it?" (Feature discovery)
5. "If Scope Creep disappeared tomorrow, what would you do instead?" (PMF signal — if "nothing" or "go back to not tracking," you have a problem)
6. "Would you recommend Scope Creep to a freelancer friend? What would you say?" (Word-of-mouth test + get their language for marketing copy)

#### 3. PMF Metrics Specific to Scope Creep

| Metric | Target | How to measure |
|--------|--------|---------------|
| **Sean Ellis test** | 40%+ "very disappointed" | Survey users after 2+ weeks of usage |
| **Report generation rate** | 50%+ of users with 3+ additions generate a report | Tracks whether users complete the value loop |
| **Report send rate** | 30%+ of generated reports are actually shared (link opened by non-user or PDF downloaded) | The real test — did they use it with a client? |
| **Repeat usage** | User logs additions on 2+ projects | Not a one-time novelty |
| **Free-to-Pro conversion** | 5%+ of free users upgrade within 60 days | Price/value alignment |
| **Dollar recovery attribution** | Users self-report recovering money | Ask in report feedback: "Did this report help you bill for scope additions?" |

#### 4. What to Iterate On (Priority Framework)

Prioritize based on: **Does this help more users generate and send scope change reports?**

- If users sign up but don't log additions → onboarding is broken. Fix the first-run experience.
- If users log additions but don't generate reports → the report feature is too hard to find or use. Simplify.
- If users generate reports but don't send them → the report doesn't feel professional enough, or users are scared of the conversation. Add report templates, softer language options, or a guide on how to present it.
- If users send reports but clients ignore them → the report needs to be more compelling. Add project context, original scope reference, visual summary.

#### 5. Kill Criteria

- **Week 4 post-launch**: < 10 weekly active users (logging at least 1 addition/week) despite consistent marketing → the problem isn't urgent enough to build a habit around
- **Week 8 post-launch**: 0 paying users despite 100+ free signups → the value doesn't justify $8/mo, or the upgrade trigger (project limit) is wrong
- **Week 12 post-launch**: < 3 reports sent to clients per week across all users → the product isn't changing behavior; people track but don't use the output

### Exit Criteria
- [ ] Talked to 10+ active users about their scope report experience
- [ ] Sean Ellis test run (know your PMF score)
- [ ] Report generation rate measured (target: 50%+ of eligible users)
- [ ] Clear next-3-features roadmap based on feedback
- [ ] Go/no-go decision made on continuing

---

## Phase 7: Post-Launch Growth

**Goal**: Build sustainable, repeatable growth channels.

### Skills Install — Phase 7
```bash
npx skills add phuryn/pm-skills@growth-loops -g -y
npx skills add phuryn/pm-skills@gtm-motions -g -y
npx skills add daffy0208/ai-dev-standards@growth-experimenter -g -y
npx skills add kostja94/marketing-skills@integrated-marketing -g -y
npx skills add onewave-ai/claude-skills@seo-content-optimizer -g -y
npx skills add kostja94/marketing-skills@content-strategy -g -y
npx skills add kostja94/marketing-skills@content-optimization -g -y
npx skills add refoundai/lenny-skills@community-building -g -y
npx skills add coreyhaines31/marketingskills@marketing-ideas -g -y
```

### Steps

#### 1. Primary Growth Loop: Client-Facing Report Virality

This is Scope Creep's built-in distribution mechanic. Design it deliberately.

**The loop**:
1. Freelancer uses Scope Creep → generates a scope change report
2. Freelancer sends report to client (via shareable link or PDF)
3. Client sees the report. Free-tier reports include: "Generated with Scope Creep — scopecreep.app"
4. Client is also a business owner / project manager. They think: "I should use this for my own freelancers / contractors"
5. OR: Client shows the report to a colleague who also hires freelancers
6. New user signs up

**Optimize the loop**:
- The report shareable link page should look exceptional — it IS your marketing to potential users
- Below the report on the shared link, add a subtle CTA: "Are you a freelancer? Track your scope changes free → scopecreep.app"
- On the PDF footer: "Scope Change Report generated by Scope Creep — scopecreep.app"
- Track: How many shared report links get viewed? How many viewers click through to the marketing site? How many convert?

**Secondary loop**: Word of mouth in freelancer communities. When a freelancer successfully uses a scope report to get paid, they tell other freelancers. Amplify this by:
- Asking users: "Did this report help you recover money? Share your story (we'll feature you, anonymized if preferred)"
- Posting success stories (with permission) in freelancer communities

#### 2. SEO Keywords to Target

**High-intent, low-competition keywords** (these are terms freelancers search when they feel the pain):

| Keyword | Search Intent | Content Type |
|---------|--------------|-------------|
| "scope creep freelance" | Problem-aware | Blog post |
| "how to handle scope creep with clients" | Solution-seeking | Guide (with product CTA) |
| "scope change request template" | Tool-seeking | Free template + product pitch |
| "freelance scope creep email template" | Tool-seeking | Free template download |
| "how to bill for extra work freelance" | Solution-seeking | Guide |
| "client keeps adding to project" | Problem-aware, emotional | Blog post |
| "scope creep tracker" | Product-seeking | Landing page (SEO-optimized) |
| "freelance project scope template" | Tool-seeking | Free template |
| "how to say no to scope creep" | Solution-seeking | Guide |
| "scope change report" | Tool-seeking | Product page |
| "unbilled work freelance" | Problem-aware | Blog post |
| "freelance contract scope clause" | Prevention | Guide |

#### 3. Content Ideas (Exact Article Titles)

Publish 1 per week. Each article targets a keyword and ends with a Scope Creep CTA.

1. **"I Tracked Every Scope Addition for 3 Months. Here's How Much Free Work I Was Doing."** — Personal story. Concrete numbers. r/freelance crosspost material.
2. **"The Scope Change Request Template That Saved Me $4,200"** — Provide a free Google Doc template. CTA: "Or use Scope Creep and skip the template."
3. **"How to Tell a Client 'That's Out of Scope' Without Sounding Difficult"** — Practical scripts for the awkward conversation. Position Scope Creep as the tool that makes the conversation data-driven instead of emotional.
4. **"Why 'Just One More Thing' Is Killing Your Freelance Income"** — SEO play for "scope creep freelance." Quantify the compound cost.
5. **"The Real Cost of Scope Creep: A Breakdown for Freelance Developers"** — Data-driven. Break down the 15–30% figure with examples.
6. **"How to Add a Scope Change Clause to Your Freelance Contract (With Examples)"** — Template-driven. Attracts prevention-minded freelancers who are also the most likely Scope Creep users.
7. **"Scope Creep vs. Harvest vs. Toggl: What's the Difference?"** — Comparison page. Capture bottom-of-funnel searches.
8. **"I Sent My Client a Scope Change Report. Here's What Happened."** — Customer story (anonymized if needed). Social proof.
9. **"The Freelancer's Guide to Getting Paid for Extra Work"** — Comprehensive guide. Link to Scope Creep as the tool that automates the tracking.
10. **"5 Signs You're Losing Money to Scope Creep (And What to Do About It)"** — Listicle. Easy to share. Targets problem-aware searchers.

#### 4. Repeatable Marketing Cadence

| Frequency | Activity |
|-----------|----------|
| **Weekly** | 1 SEO article published. 2 community posts (Reddit/Twitter with problem-first angle). Reply to any Reddit/Twitter/forum post about scope creep with genuine advice (not product spam). |
| **Biweekly** | 1 Twitter/X build-in-public update (user count, MRR, interesting feedback, product decisions). |
| **Monthly** | 1 case study or user story. 1 Indie Hackers revenue update. Review SEO performance and double down on what's ranking. |

#### 5. Build in Public

Share milestones on Twitter/X and Indie Hackers:
- "First 100 signups"
- "First paying customer ($8 MRR lol)"
- "$100 MRR"
- "A user told me they recovered $2,800 using a scope report"
- "Interesting churn data: people cancel when they're between projects, not because they dislike the product"
- Weekly: what you built, what you learned, what's next

### Exit Criteria
- [ ] Report virality loop measured (shared link → viewer → signup conversion rate known)
- [ ] Repeatable weekly/monthly marketing cadence running
- [ ] 3+ SEO articles published and indexed
- [ ] Email sequences active for onboarding and retention
- [ ] Building in public with consistent updates

---

## Phase 8: Monetization & Scaling

**Goal**: Turn users into revenue and revenue into growth.

### Skills Install — Phase 8
```bash
npx skills add phuryn/pm-skills@monetization-strategy -g -y
npx skills add wshobson/agents@startup-financial-modeling -g -y
npx skills add phuryn/pm-skills@metrics-dashboard -g -y
# marketing-psychology and cro-methodology should still be installed from earlier phases
```

### Steps

#### 1. Pricing Tiers (Evolved)

Once PMF is confirmed and you have 50+ paying users, expand to three tiers:

| | **Free** | **Pro** | **Agency** |
|---|---------|---------|-----------|
| **Price** | $0 | $12/mo ($8/mo if annual) | $29/mo ($24/mo if annual) |
| **Active projects** | 1 | Unlimited | Unlimited |
| **Reports/month** | 1 | Unlimited | Unlimited |
| **Report branding** | "Powered by Scope Creep" watermark | Custom logo + colors | Custom logo + colors + white-label (no Scope Creep branding at all) |
| **Export** | — | CSV | CSV + API access |
| **Team members** | — | — | Up to 5 seats |
| **Scope templates** | — | Reusable addition templates | Reusable addition templates |
| **Priority support** | — | — | Yes |
| **Client email delivery** | — | Send report via email from within app | Send report + auto-schedule follow-up |

**Note**: Launch with Free + Pro ($8/mo) only. Add Agency tier when you see small teams signing up for multiple Pro accounts.

**Price increase rationale**: Move Pro from $8 to $12/mo after 100+ paying users. Grandfather existing users at $8. The product is more proven, has more features, and users have validated willingness to pay. $12/mo is still a no-brainer ROI for anyone billing $75+/hr.

#### 2. Specific Upgrade Triggers

These are the moments when a free user is most likely to convert. Optimize the UX and messaging at each trigger:

| Trigger | What happens | Upgrade message |
|---------|-------------|----------------|
| **Second project** | User tries to create project #2 | "Nice — you've got more work coming in. Upgrade to Pro to track scope on every project. $8/mo." |
| **Second report** | User tries to generate report #2 in the same month | "Your first report tracked $[X] in scope additions. Imagine having that visibility every time. Upgrade for unlimited reports." |
| **Dollar threshold** | Running total across all additions crosses $500 | "You've tracked $[X] in scope additions. That's [Y]x what Pro costs for a year. Upgrade and never lose track of unbilled work again." |
| **Report share** | User shares a report link for the first time | "Your client just saw your scope change report. Want to remove the Scope Creep branding and add your own logo? Upgrade to Pro." |

#### 3. Conversion Optimization (Psychological Triggers)

- **Loss aversion on the dashboard**: "You've tracked $2,340 in scope additions this month. Without Scope Creep, this would be invisible — and unbilled." Show this on the project dashboard for free and paid users.
- **Anchoring on the pricing page**: "The average Scope Creep user tracks $1,800/month in scope additions. Pro costs $8/month." Let the ratio speak for itself.
- **Social proof wall**: Once you have 10+ testimonials, add a wall of quotes on the landing page. Prioritize quotes that mention specific dollar amounts recovered.
- **Usage stats email** (monthly for Pro users): "This month, you tracked $[X] in scope additions across [Y] projects. You generated [Z] reports." Reinforces the value to reduce churn.

#### 4. Churn Reduction Tactics Specific to Scope Creep

**Understanding Scope Creep's churn pattern**: Freelancers have project-based cycles. Between projects, they have nothing to track. This means churn will be seasonal/cyclical, not a steady bleed.

| Churn reason | Tactic |
|-------------|--------|
| **"Between projects right now"** | Offer a pause feature: freeze your subscription for up to 2 months. Data is retained. This is better than cancellation because they come back automatically. Costs you $16 in revenue but saves the re-acquisition cost. |
| **"I only have 1 project at a time"** | They shouldn't be on Pro — they should be on Free. If they're paying and only using 1 project, the upgrade trigger was wrong. Fix the funnel, don't fight the churn. |
| **"I forgot to log additions"** | Add a weekly email reminder: "You have [X] active projects. Any scope changes this week?" Also: consider a "quick add" feature — log an addition from email reply or Slack shortcut. |
| **"My client didn't respond to the report"** | The report needs to be better, or the user needs guidance. Add a "how to present this to your client" guide. Offer email delivery from within the app so there's a clear handoff. |
| **"Too expensive"** | At $8/mo, this is almost always a proxy for "I don't see the value." If they haven't generated a report, the problem is activation, not price. Trigger an onboarding re-engagement sequence. |
| **"I started using [X] instead"** | Ask what X is. If it's a spreadsheet, your UX lost. If it's a PM tool, your positioning isn't clear enough. Learn from every instance. |

#### 5. Unit Economics Model

| Metric | Target |
|--------|--------|
| **CAC** | ~$0 (organic: SEO + community + report virality) |
| **ARPU** | $8/mo initially → $10/mo blended after Agency tier |
| **Average retention** | 8 months (freelancers churn between projects, come back) |
| **LTV** | $8 × 8 = $64 (initially) → $10 × 10 = $100 (with pause feature improving retention) |
| **LTV/CAC** | Effectively infinite if CAC stays ~$0 |
| **Monthly server cost** | ~$20–40 (Vercel Pro + Supabase Pro) |
| **Breakeven** | 5 paying users |
| **$1K MRR** | 125 paying users at $8/mo |
| **$5K MRR** | 500 paying users at $10/mo blended |

#### 6. Revenue Expansion (Post-PMF)

After 200+ paying users, consider these expansion paths:

1. **Annual plans**: $80/yr (save $16 — 2 months free). Improves cash flow and reduces churn by locking in for 12 months.
2. **Agency tier** ($29/mo): Multi-seat, white-label reports, API access. Target when you see 2+ people at the same company signing up individually.
3. **Scope Change Report API**: Let freelancers integrate scope tracking into their existing project management tools. Usage-based pricing.
4. **Template marketplace**: Pre-built scope addition templates for common industries (web dev, design, consulting). Community-contributed. Free for Pro users.
5. **"Scope Insurance" positioning**: Partner with freelancer insurance/legal platforms. "Document your scope changes professionally — it's protection if the client relationship goes south."

### Exit Criteria
- [ ] Positive unit economics (LTV > CAC)
- [ ] Monthly churn < 5% (excluding seasonal "between projects" pauses)
- [ ] Predictable MRR growth (10%+ month-over-month)
- [ ] At least 2 pricing tiers live
- [ ] Subscription pause feature reducing involuntary churn

---

## Quick Reference: Tool and Phase Mapping

| Phase | bmad-idea Agent | Skills |
|-------|----------------|--------|
| 1. Validation | Carson (`/cis-brainstorm`) | — |
| 1. Problem analysis | Dr. Quinn (`/cis-problem-solving`) | — |
| 2. Positioning | Victor (`/cis-innovation-strategy`) | `product-marketing-context` |
| 2. Pricing | Victor | `pricing-strategy`, `marketing-psychology`, `hundred-million-offers` |
| 3. Build | — | `frontend-design`, `landing-page-generator`, `ux-principles` |
| 4. Messaging | Sophia (`/cis-storytelling`) | `product-marketing-context`, `email-marketing`, `email-sequence` |
| 4. Tracking | — | `startup-metrics-framework`, `analytics-tracking`, `posthog-analytics` |
| 4. CRO | — | `cro-methodology`, `page-cro`, `landing-page-optimization` |
| 5. Launch | — | `product-hunt-launch-plan`, `directory-submission`, `cold-start-strategy` |
| 6. Feedback | — | `customer-feedback-analyzer`, `product-analyst`, `product-strategist`, `pmf-strategy` |
| 7. Growth | — | `growth-loops`, `growth-experimenter`, `go-to-market-plan`, `gtm-motions`, `integrated-marketing` |
| 7. Content | — | `seo-content-optimizer`, `content-strategy`, `content-optimization` |
| 7. Retention | — | `email-marketing`, `marketing-automation`, `community-building` |
| 8. Monetization | — | `marketing-psychology`, `cro-methodology`, `pricing-strategy`, `monetization-strategy` |
| 8. Finance | — | `startup-financial-modeling`, `metrics-dashboard` |
