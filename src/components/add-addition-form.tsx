"use client";

import { useState } from "react";
import { createAddition } from "@/lib/actions/scope-additions";

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function AddAdditionForm({
  projectId,
  defaultHourlyRate,
  currency,
}: {
  projectId: string;
  defaultHourlyRate: string;
  currency: string;
}) {
  const [open, setOpen] = useState(false);
  const [hours, setHours] = useState("");
  const [rate, setRate] = useState(defaultHourlyRate);
  const [showMore, setShowMore] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const calculatedValue =
    Number(hours || 0) * Number(rate || 0);

  const today = new Date().toISOString().split("T")[0];

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    try {
      await createAddition(formData);
      setOpen(false);
      setHours("");
      setRate(defaultHourlyRate);
      setShowMore(false);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Log Addition
      </button>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="mt-4 rounded-lg border border-gray-200 bg-white p-5"
    >
      <input type="hidden" name="projectId" value={projectId} />
      {!showMore && (
        <input type="hidden" name="hourlyRate" value={rate} />
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            required
            placeholder="e.g. Add contact form to About page"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label
            htmlFor="dateRequested"
            className="block text-sm font-medium text-gray-700"
          >
            Date Requested
          </label>
          <input
            id="dateRequested"
            name="dateRequested"
            type="date"
            required
            defaultValue={today}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label
            htmlFor="estimatedHours"
            className="block text-sm font-medium text-gray-700"
          >
            Estimated Hours
          </label>
          <input
            id="estimatedHours"
            name="estimatedHours"
            type="number"
            required
            step="0.5"
            min="0"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            placeholder="0"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-600">
        Estimated value:{" "}
        <span className="font-semibold text-gray-900">
          {formatCurrency(calculatedValue, currency)}
        </span>
      </p>

      {/* Collapsible advanced section */}
      <button
        type="button"
        onClick={() => setShowMore(!showMore)}
        className="mt-3 text-sm font-medium text-primary hover:text-blue-700"
      >
        {showMore ? "Less options" : "More options"}
      </button>

      {showMore && (
        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
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
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue="pending"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="absorbed">Absorbed</option>
            </select>
          </div>

          <div className="col-span-2 flex items-center gap-2">
            <input
              id="clientRequested"
              name="clientRequested"
              type="checkbox"
              defaultChecked
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label
              htmlFor="clientRequested"
              className="text-sm font-medium text-gray-700"
            >
              Client requested this change
            </label>
          </div>

          <div className="col-span-2">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              placeholder="Optional notes..."
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Logging..." : "Log Addition"}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setHours("");
            setRate(defaultHourlyRate);
            setShowMore(false);
          }}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
