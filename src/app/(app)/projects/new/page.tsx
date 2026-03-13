import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users, projects } from "@/lib/db/schema";
import { createProject } from "@/lib/actions/projects";
import { UpgradeButton } from "@/components/upgrade-button";

export const metadata: Metadata = {
  title: "New Project",
};

const inputClass =
  "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export default async function NewProjectPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const [user] = await db
    .select({ plan: users.plan })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (user?.plan === "free") {
    const activeProjects = await db
      .select({ id: projects.id })
      .from(projects)
      .where(
        and(
          eq(projects.userId, session.user.id),
          eq(projects.status, "active"),
        ),
      );

    if (activeProjects.length >= 1) {
      return (
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-900">New Project</h1>
          <div className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-700">
              You&apos;ve reached the free plan limit of 1 active project.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Upgrade to Pro for unlimited projects.
            </p>
            <div className="mt-4 inline-block">
              <UpgradeButton />
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/projects"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900">New Project</h1>

      <form action={createProject} className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Project Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClass}
            placeholder="e.g. Website Redesign"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="clientName"
              className="block text-sm font-medium text-gray-700"
            >
              Client Name
            </label>
            <input
              id="clientName"
              name="clientName"
              type="text"
              required
              className={inputClass}
              placeholder="Acme Inc."
            />
          </div>

          <div>
            <label
              htmlFor="clientEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Client Email
            </label>
            <input
              id="clientEmail"
              name="clientEmail"
              type="email"
              className={inputClass}
              placeholder="client@example.com"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <label
              htmlFor="originalQuote"
              className="block text-sm font-medium text-gray-700"
            >
              Original Quote
            </label>
            <input
              id="originalQuote"
              name="originalQuote"
              type="number"
              required
              step="0.01"
              min="0"
              className={inputClass}
              placeholder="8000.00"
            />
          </div>

          <div>
            <label
              htmlFor="hourlyRate"
              className="block text-sm font-medium text-gray-700"
            >
              Hourly Rate
            </label>
            <input
              id="hourlyRate"
              name="hourlyRate"
              type="number"
              required
              step="0.01"
              min="0"
              className={inputClass}
              placeholder="150.00"
            />
          </div>

          <div>
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700"
            >
              Currency
            </label>
            <select id="currency" name="currency" className={inputClass}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="originalScope"
            className="block text-sm font-medium text-gray-700"
          >
            Original Scope
          </label>
          <textarea
            id="originalScope"
            name="originalScope"
            required
            rows={5}
            className={inputClass}
            placeholder="Describe what was originally agreed upon..."
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Create Project
          </button>
          <Link
            href="/projects"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
