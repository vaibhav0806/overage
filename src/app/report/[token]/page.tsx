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
    <div className="min-h-screen bg-gray-50">
      <ReportActions token={token} />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div
          className="rounded-lg border border-gray-200 bg-white shadow-sm"
          style={
            report.brandingColor
              ? { borderTopWidth: 4, borderTopColor: report.brandingColor }
              : undefined
          }
        >
          {/* Report Header */}
          <div className="border-b border-gray-200 px-10 py-10">
            {report.brandingLogoUrl && (
              <img
                src={report.brandingLogoUrl}
                alt="Logo"
                className="mb-6"
                style={{ maxWidth: 120 }}
              />
            )}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {report.title}
            </h1>
            <div className="mt-4 space-y-1 text-sm text-gray-600">
              <p>
                Prepared for:{" "}
                <span className="font-medium text-gray-900">
                  {project.clientName}
                </span>
              </p>
              <p>
                Project:{" "}
                <span className="font-medium text-gray-900">
                  {project.name}
                </span>
              </p>
              <p>
                Date range:{" "}
                <span className="font-medium text-gray-900">
                  {formatDate(report.dateRangeStart)} &mdash;{" "}
                  {formatDate(report.dateRangeEnd)}
                </span>
              </p>
              <p>
                Generated:{" "}
                <span className="font-medium text-gray-900">
                  {generatedDate}
                </span>
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="border-b border-gray-200 px-10 py-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Summary
            </h2>
            <div className="mt-4 grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-500">Total Additions</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {additions.length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p
                  className="mt-1 text-2xl font-bold text-gray-900"
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
                <div>
                  <p className="text-sm text-gray-500">% of Original Quote</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {percentOfQuote}%
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Additions Table */}
          <div className="border-b border-gray-200 px-10 py-8">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Scope Additions
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    <th className="py-3 pr-3">#</th>
                    <th className="py-3 pr-3">Description</th>
                    <th className="py-3 pr-3">Date</th>
                    <th className="py-3 pr-3 text-right">Hours</th>
                    <th className="py-3 pr-3 text-right">Rate</th>
                    <th className="py-3 pr-3 text-right">Value</th>
                    <th className="py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {additions.map((addition, i) => {
                    const value =
                      Number(addition.estimatedHours) *
                      Number(addition.hourlyRate);
                    return (
                      <tr
                        key={addition.id}
                        className={
                          i % 2 === 1
                            ? "bg-gray-50"
                            : ""
                        }
                      >
                        <td className="py-3 pr-3 text-gray-400">{i + 1}</td>
                        <td className="py-3 pr-3 font-medium text-gray-900">
                          {addition.description}
                        </td>
                        <td className="py-3 pr-3 whitespace-nowrap text-gray-600">
                          {formatDate(addition.dateRequested)}
                        </td>
                        <td className="py-3 pr-3 text-right text-gray-600">
                          {Number(addition.estimatedHours)}
                        </td>
                        <td className="py-3 pr-3 text-right text-gray-600">
                          {formatCurrency(
                            Number(addition.hourlyRate),
                            project.currency,
                          )}
                        </td>
                        <td className="py-3 pr-3 text-right font-medium text-gray-900">
                          {formatCurrency(value, project.currency)}
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusColor(addition.status)}`}
                          >
                            {statusLabel(addition.status)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t border-gray-300">
                    <td
                      colSpan={5}
                      className="py-3 pr-3 text-right text-sm font-semibold text-gray-900"
                    >
                      Total
                    </td>
                    <td className="py-3 pr-3 text-right text-sm font-bold text-gray-900">
                      {formatCurrency(totalValue, project.currency)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Freelancer Note */}
          {report.freelancerNote && (
            <div className="border-b border-gray-200 px-10 py-8">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Note
              </h2>
              <blockquote className="mt-4 border-l-4 border-gray-300 pl-4 text-sm leading-relaxed text-gray-700 italic">
                {report.freelancerNote}
              </blockquote>
            </div>
          )}

          {/* Footer */}
          {report.showPoweredBy && (
            <div className="border-t border-gray-100 px-10 py-6 text-center">
              <p className="text-xs text-gray-400">
                This report was generated with{" "}
                <a
                  href="https://overage.app?ref=report"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-gray-500 underline hover:text-gray-700"
                >
                  Overage
                </a>
              </p>
              <p className="mt-1 text-[11px] text-gray-300">
                Stop doing free work for your clients
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
