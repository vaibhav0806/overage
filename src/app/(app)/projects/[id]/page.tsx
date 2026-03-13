import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/actions/projects";
import { getAdditions } from "@/lib/actions/scope-additions";
import { AddAdditionForm } from "@/components/add-addition-form";
import { GenerateReportForm } from "@/components/generate-report-form";
import { DeleteProjectButton } from "@/components/delete-project-button";
import { DeleteAdditionButton } from "@/components/delete-addition-button";
import { DeleteReportButton } from "@/components/delete-report-button";
import { getReportsForProject } from "@/lib/actions/reports";

export const metadata: Metadata = {
  title: "Project Details",
};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

function formatDate(date: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

const statusStyles: Record<string, string> = {
  active: "bg-green-50 text-green-700",
  completed: "bg-blue-50 text-blue-700",
  archived: "bg-gray-100 text-gray-600",
};

const additionStatusStyles: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700",
  approved: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
  absorbed: "bg-gray-100 text-gray-600",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const additions = await getAdditions(id);
  const existingReports = await getReportsForProject(id);

  const totalHours = additions.reduce(
    (sum, a) => sum + Number(a.estimatedHours),
    0,
  );
  const totalValue = additions.reduce(
    (sum, a) => sum + Number(a.estimatedHours) * Number(a.hourlyRate),
    0,
  );
  const originalQuote = Number(project.originalQuote);
  const percentage =
    originalQuote > 0 ? ((totalValue / originalQuote) * 100).toFixed(1) : "0";

  return (
    <div>
      {/* Project header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="mt-1 text-sm text-gray-500">{project.clientName}</p>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[project.status] ?? statusStyles.archived}`}
          >
            {project.status}
          </span>
          <Link
            href={`/projects/${project.id}/edit`}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Edit
          </Link>
          <DeleteProjectButton projectId={project.id} />
        </div>
      </div>

      {/* Running total — hero section */}
      <div className="mt-6 rounded-lg bg-primary p-6 text-white">
        <p className="text-sm font-medium text-blue-100">
          Total Scope Additions
        </p>
        <p className="mt-2 text-4xl font-bold">
          {formatCurrency(totalValue, project.currency)}
        </p>
        <div className="mt-3 flex items-center gap-6 text-sm text-blue-100">
          <span>
            {additions.length} addition{additions.length !== 1 ? "s" : ""}
          </span>
          <span>{totalHours}h estimated</span>
          <span>
            {percentage}% of original{" "}
            {formatCurrency(originalQuote, project.currency)} quote
          </span>
        </div>
      </div>

      {/* Scope additions section */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Scope Additions{" "}
            <span className="text-sm font-normal text-gray-500">
              ({additions.length})
            </span>
          </h2>
        </div>

        <AddAdditionForm
          projectId={project.id}
          defaultHourlyRate={project.hourlyRate}
          currency={project.currency}
        />

        {additions.length === 0 ? (
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">No scope additions yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              When your client asks for something outside the original agreement, log it here.
              Each addition tracks the hours and dollar impact automatically.
            </p>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                    Value
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500">
                    Client
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {additions.map((addition) => {
                  const value =
                    Number(addition.estimatedHours) *
                    Number(addition.hourlyRate);

                  return (
                    <tr key={addition.id}>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">
                          {addition.description}
                        </p>
                        {addition.notes && (
                          <p className="mt-0.5 text-xs text-gray-400">
                            {addition.notes}
                          </p>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-500">
                        {formatDate(addition.dateRequested)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right text-sm text-gray-900">
                        <span className="font-medium">
                          {formatCurrency(value, project.currency)}
                        </span>
                        <span className="block text-xs text-gray-400">
                          {addition.estimatedHours}h @{" "}
                          {formatCurrency(
                            Number(addition.hourlyRate),
                            project.currency,
                          )}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize ${additionStatusStyles[addition.status] ?? additionStatusStyles.pending}`}
                        >
                          {addition.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-500">
                        {addition.clientRequested ? "Yes" : "No"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <DeleteAdditionButton additionId={addition.id} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Generate report */}
      {additions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Scope Change Reports
          </h2>
          <GenerateReportForm
            projectId={project.id}
            additions={additions.map((a) => ({
              id: a.id,
              description: a.description,
              dateRequested: a.dateRequested,
              estimatedHours: a.estimatedHours,
              hourlyRate: a.hourlyRate,
              status: a.status,
            }))}
            currency={project.currency}
          />
        </div>
      )}

      {/* Existing reports */}
      {existingReports.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Reports{" "}
            <span className="text-sm font-normal text-gray-500">
              ({existingReports.length})
            </span>
          </h2>
          <div className="mt-4 space-y-3">
            {existingReports.map((report) => (
              <div
                key={report.id}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {report.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatDate(report.dateRangeStart)} &ndash;{" "}
                      {formatDate(report.dateRangeEnd)}
                      {" / "}
                      Generated {formatDate(report.generatedAt)}
                      {" / "}
                      {report.includedAdditions?.length ?? 0} addition
                      {(report.includedAdditions?.length ?? 0) !== 1 ? "s" : ""}
                    </p>
                    <p className="mt-2 text-xs text-gray-400 break-all select-all">
                      /report/{report.shareToken}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`/report/${report.shareToken}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:text-blue-700"
                    >
                      View Report
                    </a>
                    <DeleteReportButton reportId={report.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Project details */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Project Details
        </h2>
        <dl className="mt-4 grid grid-cols-3 gap-6">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Original Quote
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatCurrency(originalQuote, project.currency)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Hourly Rate
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {formatCurrency(Number(project.hourlyRate), project.currency)}/hr
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Currency
            </dt>
            <dd className="mt-1 text-sm text-gray-900">{project.currency}</dd>
          </div>
        </dl>
        {project.originalScope && (
          <div className="mt-6">
            <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Original Scope
            </dt>
            <dd className="mt-2 whitespace-pre-wrap text-sm text-gray-700">
              {project.originalScope}
            </dd>
          </div>
        )}
      </div>
    </div>
  );
}
