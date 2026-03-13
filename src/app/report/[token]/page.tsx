import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReportByToken } from "@/lib/actions/reports";
import { ReportActions } from "@/components/report-actions";

type Props = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { token } = await params;
  const data = await getReportByToken(token);

  if (!data) {
    return { title: "Report Not Found" };
  }

  const title = data.report.title;
  const description = `Scope change report for ${data.project.name} — prepared for ${data.project.clientName}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    absorbed: "Absorbed",
  };
  return labels[status] ?? status;
}

function statusColor(status: string) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
    absorbed: "bg-gray-100 text-gray-600",
  };
  return colors[status] ?? "bg-gray-100 text-gray-600";
}

export default async function ReportPage({ params }: Props) {
  const { token } = await params;
  const data = await getReportByToken(token);

  if (!data) {
    notFound();
  }

  const { report, project, additions } = data;

  const totalValue = additions.reduce(
    (sum, a) => sum + Number(a.estimatedHours) * Number(a.hourlyRate),
    0,
  );

  const originalQuote = Number(project.originalQuote);
  const percentOfQuote =
    originalQuote > 0 ? ((totalValue / originalQuote) * 100).toFixed(1) : null;

  const generatedDate = new Date(report.generatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <ReportActions token={token} />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div
          className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-md"
          style={
            report.brandingColor
              ? { borderTopWidth: 4, borderTopColor: report.brandingColor }
              : undefined
          }
        >
          {/* Report Header */}
          <div className="px-8 pb-8 pt-10 sm:px-10">
            {report.brandingLogoUrl && (
              <img
                src={report.brandingLogoUrl}
                alt="Logo"
                className="mb-6"
                style={{ maxWidth: 120 }}
              />
            )}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {report.title}
            </h1>
            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 text-sm text-gray-500 sm:grid-cols-2">
              <p>
                Prepared for{" "}
                <span className="font-semibold text-gray-900">
                  {project.clientName}
                </span>
              </p>
              <p>
                Project{" "}
                <span className="font-semibold text-gray-900">
                  {project.name}
                </span>
              </p>
              <p>
                Date range{" "}
                <span className="font-semibold text-gray-900">
                  {formatDate(report.dateRangeStart)} &mdash;{" "}
                  {formatDate(report.dateRangeEnd)}
                </span>
              </p>
              <p>
                Generated{" "}
                <span className="font-semibold text-gray-900">
                  {generatedDate}
                </span>
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="border-t border-gray-100 bg-[#fdfcfb] px-8 py-8 sm:px-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Summary
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Additions
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {additions.length}
                </p>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50/50 px-5 py-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-amber-600/80">
                  Total Value
                </p>
                <p
                  className="mt-2 text-3xl font-bold text-[#f59e0b]"
                  style={
                    report.brandingColor
                      ? { color: report.brandingColor }
                      : undefined
                  }
                >
                  {formatCurrency(totalValue, project.currency)}
                </p>
              </div>
              {percentOfQuote && (
                <div className="rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    % of Original Quote
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">
                    {percentOfQuote}%
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Additions Table */}
          <div className="border-t border-gray-100 px-8 py-8 sm:px-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Scope Additions
            </h2>
            <div className="mt-5 overflow-hidden rounded-lg border border-gray-200/80">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50/80 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-right">Hours</th>
                      <th className="px-4 py-3 text-right">Rate</th>
                      <th className="px-4 py-3 text-right">Value</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {additions.map((addition, i) => {
                      const value =
                        Number(addition.estimatedHours) *
                        Number(addition.hourlyRate);
                      return (
                        <tr
                          key={addition.id}
                          className="transition-colors hover:bg-amber-50/30"
                        >
                          <td className="px-4 py-3.5 text-gray-300 font-medium">{i + 1}</td>
                          <td className="px-4 py-3.5 font-medium text-gray-900">
                            {addition.description}
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap text-gray-500">
                            {formatDate(addition.dateRequested)}
                          </td>
                          <td className="px-4 py-3.5 text-right text-gray-500">
                            {Number(addition.estimatedHours)}
                          </td>
                          <td className="px-4 py-3.5 text-right text-gray-500">
                            {formatCurrency(
                              Number(addition.hourlyRate),
                              project.currency,
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-right font-semibold text-gray-900">
                            {formatCurrency(value, project.currency)}
                          </td>
                          <td className="px-4 py-3.5">
                            <span
                              className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(addition.status)}`}
                            >
                              {statusLabel(addition.status)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-gray-200 bg-gray-50/50">
                      <td
                        colSpan={5}
                        className="px-4 py-3.5 text-right text-sm font-semibold text-gray-900"
                      >
                        Total
                      </td>
                      <td className="px-4 py-3.5 text-right text-sm font-bold text-gray-900">
                        {formatCurrency(totalValue, project.currency)}
                      </td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* Freelancer Note */}
          {report.freelancerNote && (
            <div className="border-t border-gray-100 px-8 py-8 sm:px-10">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Note
              </h2>
              <blockquote className="mt-4 rounded-lg border-l-4 border-[#f59e0b]/40 bg-amber-50/40 py-3 pl-5 pr-4 text-sm leading-relaxed text-gray-700 italic">
                {report.freelancerNote}
              </blockquote>
            </div>
          )}

          {/* CTA Banner */}
          {report.showPoweredBy && (
            <div className="mx-8 mb-8 mt-2 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 px-8 py-8 text-center sm:mx-10">
              <p className="text-lg font-semibold text-white">
                Are you a freelancer losing money to scope creep?
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
                Track every out-of-scope request, calculate the cost, and send professional
                reports like this one to your clients.
              </p>
              <a
                href="https://overage.app?ref=report-cta"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block rounded-lg bg-[#f59e0b] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#d97706]"
              >
                Try Overage for free
              </a>
            </div>
          )}

          {/* Footer */}
          {report.showPoweredBy && (
            <div className="border-t border-gray-100 px-10 py-6 text-center">
              <a
                href="https://overage.app?ref=report"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-col items-center gap-1.5"
              >
                <span className="flex items-center gap-1.5 text-sm font-bold text-gray-400 transition-colors group-hover:text-gray-600">
                  Powered by Overage
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                </span>
                <span className="text-xs text-gray-300 transition-colors group-hover:text-gray-400">
                  Track scope creep. Bill with confidence.
                </span>
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
