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
    const delay = visibleCount === 0 ? 800 : 1600 + Math.random() * 1200;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  const visible = additions.slice(0, visibleCount);
  const total = visible.reduce((sum, a) => sum + a.hours * a.rate, 0);

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="rounded-xl border border-gray-200 bg-white shadow-2xl shadow-gray-200/60">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="text-xs font-medium tracking-wide text-gray-400 uppercase">
              Acme Corp Redesign
            </span>
          </div>
          <span className="text-xs text-gray-400">Original quote: $8,000</span>
        </div>

        {/* Additions list */}
        <div className="px-5 py-3 space-y-0">
          {visible.map((a, i) => (
            <div
              key={i}
              className="flex items-baseline justify-between py-1.5 animate-[fadeSlideIn_0.35s_ease-out]"
            >
              <span className="text-sm text-gray-600 truncate max-w-[260px]">
                {a.desc}
              </span>
              <span className="ml-3 text-sm font-medium tabular-nums text-gray-900 whitespace-nowrap">
                +{formatUSD(a.hours * a.rate)}
              </span>
            </div>
          ))}
          {visibleCount === 0 && (
            <div className="py-6 text-center text-sm text-gray-300 italic">
              Waiting for scope additions...
            </div>
          )}
        </div>

        {/* Running total */}
        <div className="border-t border-gray-100 px-5 py-4 flex items-baseline justify-between">
          <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
            Scope additions total
          </span>
          <span
            className={`text-2xl font-bold tabular-nums transition-colors duration-500 ${
              total > 2000 ? "text-accent" : "text-gray-900"
            }`}
          >
            {formatUSD(total)}
          </span>
        </div>

        {total > 0 && (
          <div className="border-t border-gray-100 px-5 py-3 bg-amber-50/60">
            <p className="text-xs text-amber-800">
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
