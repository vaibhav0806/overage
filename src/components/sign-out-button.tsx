"use client";

import { authClient } from "@/lib/auth-client";

export function SignOutButton() {
  return (
    <button
      onClick={async () => {
        await authClient.signOut();
        window.location.href = "/login";
      }}
      className="mt-2 text-sm font-medium text-zinc-500 hover:text-white"
    >
      Sign out
    </button>
  );
}
