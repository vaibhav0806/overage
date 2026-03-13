import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { OnboardingFlow } from "@/components/onboarding-flow";

export const metadata: Metadata = {
  title: "Welcome to Overage",
};

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const [user] = await db
    .select({ defaultHourlyRate: users.defaultHourlyRate })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (user?.defaultHourlyRate) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-xl py-12">
      <h1 className="flex items-center gap-1.5 text-2xl font-bold text-gray-900">
        Welcome to Overage
        <span className="inline-block h-2 w-2 rounded-full bg-accent" />
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        Two quick steps and you&apos;ll be tracking every dollar of scope creep.
      </p>
      <OnboardingFlow />
    </div>
  );
}
