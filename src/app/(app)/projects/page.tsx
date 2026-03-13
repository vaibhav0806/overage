import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/actions/projects";

export const metadata: Metadata = {
  title: "Projects",
};

function formatCurrency(amount: string, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(Number(amount));
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

const statusStyles: Record<string, string> = {
  active: "bg-green-50 text-green-700",
  completed: "bg-blue-50 text-blue-700",
  archived: "bg-gray-100 text-gray-600",
};

export default async function ProjectsPage() {
  const projectList = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <Link
          href="/projects/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          New Project
        </Link>
      </div>

      {projectList.length === 0 ? (
        <div className="mt-12 rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">No projects yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Start by creating a project — you&apos;ll be tracking scope additions in under a minute.
          </p>
          <Link
            href="/projects/new"
            className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create Project
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projectList.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <h2 className="font-semibold text-gray-900">{project.name}</h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[project.status] ?? statusStyles.archived}`}
                >
                  {project.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{project.clientName}</p>
              <p className="mt-3 text-lg font-semibold text-gray-900">
                {formatCurrency(project.originalQuote, project.currency)}
              </p>
              <p className="mt-2 text-xs text-gray-400">
                Created {formatDate(project.createdAt)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
