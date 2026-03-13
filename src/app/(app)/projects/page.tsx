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
  completed: "bg-amber-50 text-amber-700",
  archived: "bg-gray-100 text-gray-600",
};

export default async function ProjectsPage() {
  const projectList = await getProjects();

  return (
    <div className="animate-[slideUp_0.4s_ease-out]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Projects</h1>
        <Link
          href="/projects/new"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
        >
          New Project
        </Link>
      </div>

      {projectList.length === 0 ? (
        <div className="mt-12 rounded-xl border border-gray-200 bg-surface p-8 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7V17a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold text-foreground">No projects yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Start by creating a project — you&apos;ll be tracking scope additions in under a minute.
          </p>
          <Link
            href="/projects/new"
            className="mt-4 inline-block rounded-md bg-foreground px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
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
              className="group block rounded-xl border border-gray-200 bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <h2 className="font-semibold text-foreground">{project.name}</h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[project.status] ?? statusStyles.archived}`}
                >
                  {project.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{project.clientName}</p>
              <p className="mt-3 text-lg font-semibold text-foreground">
                {formatCurrency(project.originalQuote, project.currency)}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-400">
                  Created {formatDate(project.createdAt)}
                </p>
                <span className="text-gray-300 transition-transform group-hover:translate-x-0.5">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 4l4 4-4 4" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
