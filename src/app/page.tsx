import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ScopeCounter } from "@/components/scope-counter";

export default async function LandingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-lg font-bold tracking-tight text-foreground">
          overage
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            Start free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-accent">
              For freelancers &amp; agencies
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.1] tracking-tight text-foreground lg:text-6xl">
              Stop doing free work for your clients.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 max-w-xl">
              Freelancers lose thousands to &ldquo;just one more thing.&rdquo;
              Overage tracks every addition, calculates the dollar total, and
              generates a professional report you can send to your client&nbsp;&mdash;
              so you get paid for the work you actually did.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                className="rounded-lg bg-foreground px-6 py-3 text-base font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg"
              >
                Start tracking scope &mdash; free
              </Link>
              <span className="text-sm text-gray-400">No credit card required</span>
            </div>
            <p className="mt-8 text-sm italic text-gray-500">
              Built by a freelancer who lost $11,000 to scope creep last year.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-amber-100/40 to-transparent blur-2xl" />
            <ScopeCounter />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <p className="text-sm font-medium uppercase tracking-widest text-accent text-center">
          How it works
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl tracking-tight text-foreground">
          Three steps. Ten seconds each.
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          <div className="group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-white text-lg font-serif">
              1
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">
              Log additions in 10 seconds
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              &ldquo;Add contact form to About page. 3 hours. $450.&rdquo;
              Done. It&apos;s added to the running total.
            </p>
          </div>

          <div className="group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-white text-lg font-serif">
              2
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">
              See the real cost of scope creep
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              A running dollar total that updates every time something gets
              added. That &ldquo;small&rdquo; request? It&apos;s now $2,800.
            </p>
          </div>

          <div className="group">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-white text-lg font-serif">
              3
            </div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">
              Send a professional report
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              Generate a branded PDF or shareable link. No awkward
              conversation&nbsp;&mdash; just clear documentation.
              &ldquo;Here&apos;s what was added, here&apos;s what it costs.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-400 text-center">
            The $3,200 difference
          </p>
          <h2 className="mt-4 text-center font-serif text-4xl tracking-tight">
            Same project. Different outcome.
          </h2>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {/* Before */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-8">
              <span className="inline-block rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-400">
                Before
              </span>
              <p className="mt-5 text-base leading-relaxed text-gray-300">
                You quoted $8,000 for a website redesign. The client loves your
                work. Then: &ldquo;Can we add a blog?&rdquo; &ldquo;Actually,
                can the contact form also send to Slack?&rdquo; &ldquo;One more
                page would be great.&rdquo;
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-300">
                Each request is small. Each one feels awkward to push back on.
                You finish the project. You did{" "}
                <span className="font-semibold text-white">$11,200</span> worth
                of work. You got paid{" "}
                <span className="font-semibold text-white">$8,000</span>.
              </p>
              <p className="mt-6 font-serif text-2xl italic text-red-400">
                &minus;$3,200
              </p>
            </div>

            {/* After */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-8">
              <span className="inline-block rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                After
              </span>
              <p className="mt-5 text-base leading-relaxed text-gray-300">
                You quoted $8,000. The same additions came in. But this time you
                logged each one in Overage&nbsp;&mdash; 10 seconds per
                addition. At the midpoint, you sent a scope change report.
              </p>
              <p className="mt-4 text-base leading-relaxed text-gray-300">
                &ldquo;Here are the 9 additions since we started. The total
                value of added work is $3,200. How would you like to handle
                this?&rdquo; The client paid the difference.{" "}
                <span className="text-white">Without argument.</span>
              </p>
              <p className="mt-6 font-serif text-2xl italic text-emerald-400">
                +$3,200
              </p>
            </div>
          </div>

          <p className="mt-12 text-center text-base text-gray-400 max-w-2xl mx-auto">
            Overage turns scope drift from a feeling&nbsp;&mdash; &ldquo;I
            think I&apos;m doing more than I quoted for&rdquo;&nbsp;&mdash; into
            a fact: &ldquo;The client has added $3,200 of work since the
            contract was signed.&rdquo;
          </p>
        </div>
      </section>

      {/* Objection handler */}
      <section className="mx-auto max-w-3xl px-6 py-28 text-center">
        <p className="font-serif text-3xl italic text-gray-400 leading-snug">
          &ldquo;But I don&apos;t want to seem difficult.&rdquo;
        </p>
        <div className="mt-8 text-base leading-relaxed text-gray-600 max-w-xl mx-auto space-y-4">
          <p>
            You&apos;re not being difficult. You&apos;re being professional.
          </p>
          <p>
            A scope change report isn&apos;t a complaint. It&apos;s documentation.
            Clients respect it because it treats the relationship as a business
            one.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
      </div>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-6 py-28">
        <p className="text-sm font-medium uppercase tracking-widest text-accent text-center">
          Simple pricing
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl tracking-tight text-foreground">
          Less than one scope addition.
        </h2>
        <p className="mt-3 text-center text-gray-500 text-sm">
          The average user tracks $1,800/month in scope additions. Overage costs $8.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2 max-w-2xl mx-auto">
          {/* Free */}
          <div className="rounded-xl border border-gray-200 bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Free
            </p>
            <p className="mt-3 font-serif text-4xl text-foreground">$0</p>
            <p className="mt-1 text-sm text-gray-500">forever</p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&#10003;</span>
                1 active project
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&#10003;</span>
                Unlimited scope additions
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&#10003;</span>
                Report generation &amp; PDF export
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&#10003;</span>
                Shareable report links
              </li>
            </ul>
            <Link
              href="/login"
              className="mt-8 block w-full rounded-lg border border-gray-200 py-2.5 text-center text-sm font-semibold text-foreground transition-colors hover:bg-gray-50"
            >
              Get started
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-xl border-2 border-foreground bg-white p-8 relative">
            <div className="absolute -top-3 left-6 rounded-full bg-foreground px-3 py-0.5 text-xs font-semibold text-white">
              Most popular
            </div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Pro
            </p>
            <p className="mt-3 font-serif text-4xl text-foreground">
              $8
              <span className="text-lg text-gray-400 font-sans">/mo</span>
            </p>
            <p className="mt-1 text-sm text-gray-500">cancel anytime</p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&#10003;</span>
                <span>
                  <span className="font-semibold text-foreground">Unlimited</span>{" "}
                  projects
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&#10003;</span>
                Unlimited scope additions
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&#10003;</span>
                Report generation &amp; PDF export
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&#10003;</span>
                Custom branding on reports
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">&#10003;</span>
                Remove &ldquo;Powered by Overage&rdquo;
              </li>
            </ul>
            <Link
              href="/login"
              className="mt-8 block w-full rounded-lg bg-foreground py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Start free, upgrade anytime
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-serif text-4xl tracking-tight">
            Track your first scope addition.
          </h2>
          <p className="mt-3 text-gray-400">
            It takes 30 seconds. It&apos;s free. And you&apos;ll never eat the
            cost of &ldquo;just one more thing&rdquo; again.
          </p>
          <Link
            href="/login"
            className="mt-10 inline-block rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-foreground transition-all hover:bg-gray-100 hover:shadow-lg"
          >
            Start tracking scope &mdash; free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm font-bold tracking-tight text-foreground">
            overage
          </span>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Overage. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
