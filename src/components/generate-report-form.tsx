"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createReport } from "@/lib/actions/reports";

type Addition = {
  id: string;
  description: string;
  dateRequested: string;
  estimatedHours: string;
  hourlyRate: string;
  status: string;
};

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function GenerateReportForm({
  projectId,
  additions,
  currency,
}: {
  projectId: string;
  additions: Addition[];
  currency: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(additions.map((a) => a.id)),
  );

  const today = new Date().toISOString().split("T")[0];

  const earliestDate =
    additions.length > 0
      ? additions.reduce((min, a) =>
          a.dateRequested < min.dateRequested ? a : min,
        ).dateRequested
      : today;

  const now = new Date();
  const defaultTitle = `Scope Change Report — ${now.toLocaleString("en-US", { month: "long" })} ${now.getFullYear()}`;

  const selectedTotal = additions
    .filter((a) => selected.has(a.id))
    .reduce((sum, a) => sum + Number(a.estimatedHours) * Number(a.hourlyRate), 0);

  function toggleAddition(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function handleSubmit(formData: FormData) {
    const report = await createReport(formData);
    if (report?.shareToken) {
      router.push(`/report/${report.shareToken}`);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Generate Report
      </button>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="mt-4 rounded-lg border border-gray-200 bg-white p-5"
    >
      <input type="hidden" name="projectId" value={projectId} />

      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={defaultTitle}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="dateRangeStart"
              className="block text-sm font-medium text-gray-700"
            >
              Date Range Start
            </label>
            <input
              id="dateRangeStart"
              name="dateRangeStart"
              type="date"
              required
              defaultValue={earliestDate}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="dateRangeEnd"
              className="block text-sm font-medium text-gray-700"
            >
              Date Range End
            </label>
            <input
              id="dateRangeEnd"
              name="dateRangeEnd"
              type="date"
              required
              defaultValue={today}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Additions to Include
          </label>
          <div className="mt-1 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSelected(new Set(additions.map((a) => a.id)))}
              className="text-xs font-medium text-primary hover:text-blue-700"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="text-xs font-medium text-primary hover:text-blue-700"
            >
              Deselect All
            </button>
          </div>
          <div className="mt-2 divide-y divide-gray-100 rounded-md border border-gray-200">
            {additions.map((addition) => {
              const value =
                Number(addition.estimatedHours) * Number(addition.hourlyRate);
              return (
                <label
                  key={addition.id}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2.5 hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    name="includedAdditions"
                    value={addition.id}
                    checked={selected.has(addition.id)}
                    onChange={() => toggleAddition(addition.id)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="flex-1 text-sm text-gray-900">
                    {addition.description}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                    }).format(new Date(addition.dateRequested + "T00:00:00"))}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(value, currency)}
                  </span>
                </label>
              );
            })}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Selected total:{" "}
            <span className="font-semibold text-gray-900">
              {formatCurrency(selectedTotal, currency)}
            </span>
          </p>
        </div>

        <div>
          <label
            htmlFor="freelancerNote"
            className="block text-sm font-medium text-gray-700"
          >
            Freelancer Note
          </label>
          <textarea
            id="freelancerNote"
            name="freelancerNote"
            rows={3}
            placeholder="Optional message to your client..."
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Generate Report
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
