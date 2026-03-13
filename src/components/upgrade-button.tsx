"use client";

import { useState } from "react";

export function UpgradeButton() {
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const { checkout_url } = await res.json();
      window.location.href = checkout_url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="w-full rounded-md bg-accent px-3 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50"
    >
      {loading ? "Loading..." : "Upgrade to Pro"}
    </button>
  );
}
