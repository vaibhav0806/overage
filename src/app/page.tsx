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
      <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-cream/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight text-foreground">
            overage
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              Log in
            </Link>
            <Link
              href="/login"
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-md"
            >
              Start free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-28">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div className="animate-[slideUp_0.6s_ease-out_both]">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/70 px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-sm font-medium text-amber-800">
                For freelancers &amp; agencies
              </span>
            </div>
            <h1 className="mt-6 font-serif text-5xl leading-[1.08] tracking-tight text-foreground lg:text-6xl">
              Stop doing{" "}
              <span className="relative inline-block">
                <span className="relative z-10 italic">free work</span>
                <span className="absolute bottom-1 left-0 z-0 h-3 w-full bg-amber-200/50 lg:bottom-1.5 lg:h-3.5" />
              </span>{" "}
              for your clients.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
              Freelancers lose thousands to &ldquo;just one more thing.&rdquo;
              Overage tracks every addition, calculates the dollar total, and
              generates a professional report you can send to your client&nbsp;&mdash;
              so you get paid for the work you actually did.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/login"
                className="rounded-xl bg-foreground px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-gray-900/10 transition-all duration-200 hover:bg-zinc-800 hover:shadow-xl hover:shadow-gray-900/15 hover:-translate-y-0.5 active:translate-y-0"
              >
                Start tracking scope &mdash; free
              </Link>
              <span className="text-sm text-gray-400">No credit card required</span>
            </div>
            <p className="mt-10 flex items-center gap-2 text-sm italic text-gray-500">
              <svg className="h-4 w-4 flex-shrink-0 text-accent" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Built by a freelancer who lost $11,000 to scope creep last year.
            </p>
          </div>

          <div className="relative animate-[scaleIn_0.7s_ease-out_0.2s_both]">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-amber-100/50 via-amber-50/20 to-transparent blur-3xl" />
            <ScopeCounter />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-gray-200/60 bg-muted/50 animate-[fadeIn_0.6s_ease-out_0.4s_both]">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free tier forever
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-accent" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Set up in 30 seconds
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-28 animate-[slideUp_0.6s_ease-out_both]">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-accent">
          How it works
        </p>
        <h2 className="mt-4 text-center font-serif text-4xl tracking-tight text-foreground">
          Three steps. Ten seconds each.
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="group rounded-2xl border border-gray-200/80 bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/40">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-foreground to-zinc-700 font-serif text-xl text-white shadow-md shadow-gray-900/10">
              1
            </div>
            <h3 className="mt-6 text-lg font-semibold text-foreground">
              Log additions in 10 seconds
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              &ldquo;Add contact form to About page. 3 hours. $450.&rdquo;
              Done. It&apos;s added to the running total.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Takes 10 seconds
            </div>
          </div>

          {/* Step 2 */}
          <div className="group rounded-2xl border border-gray-200/80 bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/40">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-foreground to-zinc-700 font-serif text-xl text-white shadow-md shadow-gray-900/10">
              2
            </div>
            <h3 className="mt-6 text-lg font-semibold text-foreground">
              See the real cost of scope creep
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              A running dollar total that updates every time something gets
              added. That &ldquo;small&rdquo; request? It&apos;s now $2,800.
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Real-time totals
            </div>
          </div>

          {/* Step 3 */}
          <div className="group rounded-2xl border border-gray-200/80 bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/40">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-foreground to-zinc-700 font-serif text-xl text-white shadow-md shadow-gray-900/10">
              3
            </div>
            <h3 className="mt-6 text-lg font-semibold text-foreground">
              Send a professional report
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Generate a branded PDF or shareable link. No awkward
              conversation&nbsp;&mdash; just clear documentation.
              &ldquo;Here&apos;s what was added, here&apos;s what it costs.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              PDF &amp; shareable link
            </div>
          </div>
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/login"
            className="rounded-xl bg-foreground px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-gray-900/10 transition-all duration-200 hover:bg-zinc-800 hover:shadow-xl hover:shadow-gray-900/15 hover:-translate-y-0.5 active:translate-y-0"
          >
            Start tracking scope &mdash; free
          </Link>
        </div>
      </section>

      {/* Before / After */}
      <section className="relative overflow-hidden bg-foreground text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />
        <div className="relative mx-auto max-w-6xl px-6 py-28">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-amber-400">
            The $3,200 difference
          </p>
          <h2 className="mt-4 text-center font-serif text-4xl tracking-tight">
            Same project. Different outcome.
          </h2>

          <div className="mt-16 grid gap-0 md:grid-cols-2">
            {/* Before */}
            <div className="rounded-t-2xl border border-white/10 bg-white/5 p-10 md:rounded-l-2xl md:rounded-tr-none md:border-r-0">
              <span className="inline-block rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-400">
                Before
              </span>
              <p className="mt-6 text-base leading-relaxed text-gray-300">
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
              <p className="mt-8 font-serif text-4xl italic text-red-400 lg:text-5xl">
                &minus;$3,200
              </p>
            </div>

            {/* Divider — vertical on desktop, horizontal on mobile */}
            <div className="hidden md:absolute md:left-1/2 md:top-[calc(50%+1rem)] md:block md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-foreground text-xs font-bold text-gray-400">
                vs
              </div>
            </div>

            {/* After */}
            <div className="rounded-b-2xl border border-white/10 bg-white/5 p-10 md:rounded-r-2xl md:rounded-bl-none md:border-l-0">
              <span className="inline-block rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                After
              </span>
              <p className="mt-6 text-base leading-relaxed text-gray-300">
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
              <p className="mt-8 font-serif text-4xl italic text-emerald-400 lg:text-5xl">
                +$3,200
              </p>
            </div>
          </div>

          <p className="mx-auto mt-14 max-w-2xl text-center text-base text-gray-400">
            Overage turns scope drift from a feeling&nbsp;&mdash; &ldquo;I
            think I&apos;m doing more than I quoted for&rdquo;&nbsp;&mdash; into
            a fact: &ldquo;The client has added $3,200 of work since the
            contract was signed.&rdquo;
          </p>

          <div className="mt-12 text-center">
            <Link
              href="/login"
              className="inline-block rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-foreground shadow-lg shadow-black/20 transition-all duration-200 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              Don&apos;t lose another $3,200
            </Link>
          </div>
        </div>
      </section>

      {/* Objection handler */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-white to-cream" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center">
          <svg className="mx-auto h-10 w-10 text-gray-200" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.18 11 15c0 1.933-1.567 3.5-3.5 3.5-1.288 0-2.435-.695-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.18 21 15c0 1.933-1.567 3.5-3.5 3.5-1.288 0-2.435-.695-2.917-1.179z" />
          </svg>
          <p className="mt-6 font-serif text-3xl italic leading-snug text-gray-400">
            &ldquo;But I don&apos;t want to seem difficult.&rdquo;
          </p>
          <div className="mx-auto mt-8 max-w-xl space-y-4 text-base leading-relaxed text-gray-600">
            <p>
              You&apos;re not being difficult. You&apos;re being professional.
            </p>
            <p>
              A scope change report isn&apos;t a complaint. It&apos;s documentation.
              Clients respect it because it treats the relationship as a business
              one.
            </p>
          </div>
          <div className="mt-10">
            <Link
              href="/login"
              className="rounded-xl bg-foreground px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-gray-900/10 transition-all duration-200 hover:bg-zinc-800 hover:shadow-xl hover:shadow-gray-900/15 hover:-translate-y-0.5 active:translate-y-0"
            >
              Start being professional &mdash; free
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-gray-200/60 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-accent">
            Simple pricing
          </p>
          <h2 className="mt-4 text-center font-serif text-4xl tracking-tight text-foreground">
            Less than one scope addition.
          </h2>
          <p className="mt-3 text-center text-sm text-gray-500">
            The average user tracks $1,800/month in scope additions. Overage costs $8.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3 rounded-xl border border-amber-200/60 bg-amber-50/50 px-6 py-3 max-w-md">
            <span className="text-sm text-amber-800">
              That&apos;s a <span className="font-bold">225x return</span> on every dollar you spend.
            </span>
          </div>

          <div className="mx-auto mt-14 grid max-w-2xl gap-6 md:grid-cols-2">
            {/* Free */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/40">
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
                className="mt-8 block w-full rounded-xl border border-gray-200 py-2.5 text-center text-sm font-semibold text-foreground transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
              >
                Start tracking &mdash; free forever
              </Link>
            </div>

            {/* Pro */}
            <div className="relative rounded-2xl bg-white p-8 shadow-xl shadow-amber-900/5 ring-2 ring-foreground transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-900/10">
              <div className="absolute -top-3.5 left-6 rounded-full bg-gradient-to-r from-foreground to-zinc-700 px-4 py-1 text-xs font-semibold text-white shadow-md">
                Most popular
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Pro
              </p>
              <p className="mt-3 font-serif text-4xl text-foreground">
                $8
                <span className="font-sans text-lg text-gray-400">/mo</span>
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
                className="mt-8 block w-full rounded-xl bg-foreground py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-gray-900/10 transition-all duration-200 hover:bg-zinc-800 hover:shadow-lg"
              >
                Start free, upgrade anytime
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-foreground text-white">
        <div className="mx-auto max-w-3xl px-6 py-28 text-center">
          <h2 className="font-serif text-4xl tracking-tight lg:text-5xl">
            Track your first scope addition.
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            It takes 30 seconds. It&apos;s free. And you&apos;ll never eat the
            cost of &ldquo;just one more thing&rdquo; again.
          </p>
          <Link
            href="/login"
            className="mt-12 inline-block rounded-xl bg-white px-10 py-4 text-base font-semibold text-foreground shadow-lg shadow-black/20 transition-all duration-200 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            Start tracking scope &mdash; free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-cream">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start">
            <div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                overage
              </span>
              <p className="mt-1.5 text-sm text-gray-400">
                Stop doing free work.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-gray-500">
              <Link href="/login" className="transition-colors hover:text-gray-900">
                Sign up
              </Link>
              <Link href="/login" className="transition-colors hover:text-gray-900">
                Log in
              </Link>
              <Link href="#pricing" className="transition-colors hover:text-gray-900">
                Pricing
              </Link>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-200/60 pt-6">
            <p className="text-center text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Overage. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
