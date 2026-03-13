import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/actions/projects";
import { getAllAdditionsForUser } from "@/lib/actions/scope-additions";

export const metadata: Metadata = {
  title: "Dashboard",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

const statusStyles: Record<string, string> = {
  active: "bg-green-50 text-green-700",
  completed: "bg-amber-50 text-amber-700",
  archived: "bg-gray-100 text-gray-600",
};

export default async function DashboardPage() {
  const [projectList, allAdditions] = await Promise.all([
    getProjects(),
    getAllAdditionsForUser(),
  ]);

  const activeProjects = projectList.filter((p) => p.status === "active");
  const totalQuoted = activeProjects.reduce(
    (sum, p) => sum + Number(p.originalQuote),
    0,
  );
  const recentProjects = projectList.slice(0, 6);

  const totalScopeValue = allAdditions.reduce(
    (sum, a) => sum + Number(a.estimatedHours) * Number(a.hourlyRate),
    0,
  );
  const additionCount = allAdditions.length;
  const distinctProjectCount = new Set(allAdditions.map((a) => a.projectId))
    .size;

  // Group additions by projectId to get per-project totals
  const additionsByProject = new Map<string, number>();
  const additionCountByProject = new Map<string, number>();
  for (const a of allAdditions) {
    const val = Number(a.estimatedHours) * Number(a.hourlyRate);
    additionsByProject.set(
      a.projectId,
      (additionsByProject.get(a.projectId) ?? 0) + val,
    );
    additionCountByProject.set(
      a.projectId,
      (additionCountByProject.get(a.projectId) ?? 0) + 1,
    );
  }

  return (
    <div className="animate-[slideUp_0.4s_ease-out]">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      {projectList.length === 0 ? (
        <div className="mt-12 rounded-xl border border-gray-200 bg-surface p-10 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">
            No projects yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Create your first project to start tracking scope additions and see
            exactly how much unbilled work you&apos;re doing.
          </p>
          <Link
            href="/projects/new"
            className="mt-5 inline-block rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Create Your First Project
          </Link>
        </div>
      ) : (
        <>
          {/* Hero stat — Total Scope Additions */}
          <div className="mt-6 rounded-xl border-l-4 border-l-accent bg-surface p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Scope Additions
                </p>
                <p className="mt-2 font-serif text-4xl font-bold text-foreground">
                  {formatCurrency(totalScopeValue)}
                </p>
                <p className="mt-1.5 text-sm text-gray-400">
                  {additionCount} addition{additionCount !== 1 ? "s" : ""} across{" "}
                  {distinctProjectCount} project{distinctProjectCount !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 4v12M4 10h12" />
                </svg>
              </div>
            </div>
          </div>

          {/* Supporting stats */}
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-surface p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Projects</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {activeProjects.length}
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 5.5V14a1.5 1.5 0 001.5 1.5h11A1.5 1.5 0 0016 14V7a1.5 1.5 0 00-1.5-1.5H9L7.5 3.5H3.5A1.5 1.5 0 002 5z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-surface p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Quoted</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">
                    {formatCurrency(totalQuoted)}
                  </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="9" r="7" />
                    <path d="M9 5.5v7M6.5 8h5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Projects
              </h2>
              <Link
                href="/projects"
                className="text-sm font-medium text-accent hover:text-amber-700"
              >
                View all
              </Link>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {recentProjects.map((project) => {
                const projectAdditionTotal = additionsByProject.get(project.id) ?? 0;
                const projectAdditionCount = additionCountByProject.get(project.id) ?? 0;
                return (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="group rounded-xl border border-gray-200 bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold text-foreground">
                          {project.name}
                        </h3>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {project.clientName}
                        </p>
                      </div>
                      <span
                        className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusStyles[project.status] ?? statusStyles.archived}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                      <div>
                        <p className="text-lg font-semibold text-foreground">
                          {formatCurrency(projectAdditionTotal)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {projectAdditionCount} scope addition{projectAdditionCount !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <span className="text-gray-300 transition-transform group-hover:translate-x-0.5">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 4l4 4-4 4" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
