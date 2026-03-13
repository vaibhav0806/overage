"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (mode === "sign-up") {
      const { error } = await authClient.signUp.email({
        email,
        password,
        name,
      });

      setLoading(false);

      if (error) {
        setError(error.message ?? "Something went wrong");
        return;
      }
    } else {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      setLoading(false);

      if (error) {
        setError(error.message ?? "Something went wrong");
        return;
      }
    }

    window.location.href = mode === "sign-up" ? "/onboarding" : "/dashboard";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-8">
        <h1 className="text-2xl font-bold text-gray-900">Overage</h1>
        <p className="mt-1 text-sm text-gray-600">
          {mode === "sign-in" ? "Sign in to your account" : "Create an account"}
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          {mode === "sign-up" && (
            <>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Your name"
              />
            </>
          )}

          <label
            htmlFor="email"
            className={`block text-sm font-medium text-gray-700 ${mode === "sign-up" ? "mt-4" : ""}`}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="you@example.com"
          />

          <label
            htmlFor="password"
            className="mt-4 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="••••••••"
          />

          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-md bg-foreground px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {loading
              ? mode === "sign-in"
                ? "Signing in..."
                : "Creating account..."
              : mode === "sign-in"
                ? "Sign In"
                : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {mode === "sign-in" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("sign-up");
                  setError(null);
                }}
                className="font-medium text-accent hover:text-amber-700"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("sign-in");
                  setError(null);
                }}
                className="font-medium text-accent hover:text-amber-700"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
