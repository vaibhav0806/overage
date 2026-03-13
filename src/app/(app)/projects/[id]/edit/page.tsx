import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, updateProject } from "@/lib/actions/projects";

export const metadata: Metadata = {
  title: "Edit Project",
};

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const updateWithId = updateProject.bind(null, project.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Edit Project</h1>
      <p className="mt-1 text-sm text-gray-500">
        Update the details for {project.name}.
      </p>

      <form action={updateWithId} className="mt-6 max-w-xl space-y-4">
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
            defaultValue={project.name}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

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
            defaultValue={project.clientName}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
            defaultValue={project.clientEmail ?? ""}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

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
            defaultValue={project.originalQuote}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
            defaultValue={project.hourlyRate}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label
            htmlFor="currency"
            className="block text-sm font-medium text-gray-700"
          >
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            defaultValue={project.currency}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
            <option value="INR">INR</option>
          </select>
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
            rows={6}
            defaultValue={project.originalScope}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
          <Link
            href={`/projects/${project.id}`}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
