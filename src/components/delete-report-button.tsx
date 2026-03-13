"use client";

import { deleteReport } from "@/lib/actions/reports";

export function DeleteReportButton({ reportId }: { reportId: string }) {
  return (
    <button
      type="button"
      onClick={async () => {
        if (window.confirm("Delete this report?")) {
          await deleteReport(reportId);
        }
      }}
      className="text-sm font-medium text-red-500 hover:text-red-700"
    >
      Delete
    </button>
  );
}
