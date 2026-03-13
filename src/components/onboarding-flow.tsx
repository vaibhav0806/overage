"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { setDefaultHourlyRate } from "@/lib/actions/onboarding";
import { createProject } from "@/lib/actions/projects";

const inputClass =
  "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [hourlyRate, setHourlyRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, startSubmit] = useTransition();

  async function handleRateSubmit(formData: FormData) {
    setLoading(true);
    await setDefaultHourlyRate(formData);
    setHourlyRate(formData.get("defaultHourlyRate") as string);
    setLoading(false);
    setStep(2);
  }

  function handleCreateProject(formData: FormData) {
    startSubmit(() => createProject(formData));
  }

  return (
    <div className="mt-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
              step === 1
                ? "bg-primary text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {step === 1 ? "1" : "✓"}
          </div>
          <span className="text-xs text-gray-500">Your Rate</span>
        </div>
        <div className={`h-px flex-1 ${step === 2 ? "bg-green-500" : "bg-gray-200"}`} />
        <div className="flex flex-col items-center gap-1">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
              step === 2
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            2
          </div>
          <span className="text-xs text-gray-500">First Project</span>
        </div>
      </div>

      <p className="text-xs font-medium text-gray-500">
        Step {step} of 2
      </p>

      {step === 1 && (
        <form action={handleRateSubmit} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="defaultHourlyRate"
              className="block text-sm font-medium text-gray-700"
            >
              What&apos;s your hourly rate?
            </label>
            <input
              id="defaultHourlyRate"
              name="defaultHourlyRate"
              type="number"
              required
              step="0.01"
              min="0"
              className={inputClass}
              placeholder="150.00"
            />
            <p className="mt-1.5 text-xs text-gray-500">
              We&apos;ll use this to automatically calculate the dollar value of
              every scope addition. You can override it per-project.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </form>
      )}

      {step === 2 && (
        <>
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-gray-900">Set up your first project</h2>
          <p className="mt-1 text-sm text-gray-500">You can always edit these details later.</p>
        </div>
        <form action={handleCreateProject} className="mt-4 space-y-5">
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
                Client Email (optional)
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
                defaultValue={hourlyRate}
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
              rows={5}
              className={inputClass}
              placeholder="Optional — describe what was originally agreed upon..."
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Creating..." : "Create Project"}
            </button>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Skip — I&apos;ll do this later
            </Link>
          </div>
        </form>
        </>
      )}
    </div>
  );
}
