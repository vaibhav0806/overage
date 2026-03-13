"use client";

import { deleteProject } from "@/lib/actions/projects";

export function DeleteProjectButton({ projectId }: { projectId: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (
          window.confirm(
            "Are you sure you want to delete this project? This action cannot be undone.",
          )
        ) {
          await deleteProject(projectId);
        }
      }}
      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
    >
      Delete
    </button>
  );
}
