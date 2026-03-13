"use client";

import { deleteAddition } from "@/lib/actions/scope-additions";

export function DeleteAdditionButton({ additionId }: { additionId: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (window.confirm("Delete this scope addition?")) {
          await deleteAddition(additionId);
        }
      }}
      className="text-sm font-medium text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  );
}
