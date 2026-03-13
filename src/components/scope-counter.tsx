"use client";

import { useEffect, useState } from "react";

const additions = [
  { desc: "Add contact form to About page", hours: 3, rate: 150 },
  { desc: "Blog section with CMS", hours: 8, rate: 150 },
  { desc: "Slack integration for form submissions", hours: 2, rate: 150 },
  { desc: "Additional testimonials carousel", hours: 4, rate: 150 },
  { desc: "Mobile hamburger menu animation", hours: 1.5, rate: 150 },
  { desc: "SEO meta tags for all pages", hours: 2, rate: 150 },
  { desc: "Cookie consent banner", hours: 1, rate: 150 },
  { desc: "Dark mode toggle", hours: 5, rate: 150 },
];

function formatUSD(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function ScopeCounter() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= additions.length) return;
    const delay = visibleCount === 0 ? 800 : 1400 + Math.random() * 1000;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  const visible = additions.slice(0, visibleCount);
  const total = visible.reduce((sum, a) => sum + a.hours * a.rate, 0);

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-gray-300/40 ring-1 ring-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-sm shadow-amber-400/40" />
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Acme Corp Redesign
            </span>
          </div>
          <span className="text-xs tabular-nums text-gray-400">
            Original quote: $8,000
          </span>
        </div>

        {/* Additions list */}
        <div className="space-y-0 px-6 py-3">
          {visible.map((a, i) => (
            <div
              key={i}
              className="flex items-baseline justify-between border-b border-gray-50 py-2 last:border-b-0 animate-[fadeSlideIn_0.3s_ease-out]"
            >
              <span className="max-w-[260px] truncate text-sm text-gray-600">
                {a.desc}
              </span>
              <span className="ml-3 whitespace-nowrap text-sm font-semibold tabular-nums text-gray-900">
                +{formatUSD(a.hours * a.rate)}
              </span>
            </div>
          ))}
          {visibleCount === 0 && (
            <div className="py-8 text-center text-sm italic text-gray-300">
              Waiting for scope additions...
            </div>
          )}
        </div>

        {/* Running total */}
        <div className="flex items-baseline justify-between border-t border-gray-200/80 bg-gray-50/50 px-6 py-5">
          <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
            Scope additions total
          </span>
          <span
            className={`font-serif text-3xl font-bold tabular-nums transition-all duration-500 ${
              total > 2000 ? "text-accent" : "text-gray-900"
            }`}
          >
            {formatUSD(total)}
          </span>
        </div>

        {total > 0 && (
          <div className="rounded-b-2xl border-t border-amber-200/60 bg-gradient-to-r from-amber-50/80 to-amber-50/40 px-6 py-3.5">
            <p className="text-xs font-medium text-amber-800">
              That&apos;s{" "}
              <span className="font-bold">
                {((total / 8000) * 100).toFixed(0)}%
              </span>{" "}
              of the original quote in unbilled work.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
