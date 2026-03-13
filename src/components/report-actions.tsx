"use client";

import { useState } from "react";

export function ReportActions({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
        <p className="text-sm font-medium text-gray-500">Scope Change Report</p>
        <div className="flex items-center gap-3">
          <a
            href={`/api/report/${token}/pdf`}
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Download PDF
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
