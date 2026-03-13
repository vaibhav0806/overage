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
  const recentProjects = projectList.slice(0, 5);

  const totalScopeValue = allAdditions.reduce(
    (sum, a) => sum + Number(a.estimatedHours) * Number(a.hourlyRate),
    0,
  );
  const additionCount = allAdditions.length;
  const distinctProjectCount = new Set(allAdditions.map((a) => a.projectId))
    .size;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>

      {projectList.length === 0 ? (
        <div className="mt-12 rounded-lg border border-gray-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            No projects yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Create your first project to start tracking scope additions and see
            exactly how much unbilled work you&apos;re doing.
          </p>
          <Link
            href="/projects/new"
            className="mt-5 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create Your First Project
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {activeProjects.length}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">Total Quoted</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {formatCurrency(totalQuoted)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Total Scope Additions
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {formatCurrency(totalScopeValue)}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {additionCount} addition{additionCount !== 1 ? "s" : ""} across{" "}
                {distinctProjectCount} project{distinctProjectCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Projects
            </h2>

            <div className="mt-4 divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white shadow-sm">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-gray-900">{project.name}</p>
                    <p className="text-sm text-gray-500">{project.clientName}</p>
                  </div>
                  <span className="text-sm text-gray-400">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
