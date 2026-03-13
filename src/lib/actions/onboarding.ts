"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  return session;
}

export async function setDefaultHourlyRate(formData: FormData) {
  const session = await getSession();
  const rate = formData.get("defaultHourlyRate") as string;

  await db
    .update(users)
    .set({ defaultHourlyRate: rate })
    .where(eq(users.id, session.user.id));

  revalidatePath("/onboarding");
}

export async function checkOnboardingNeeded() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return false;

  const [user] = await db
    .select({ defaultHourlyRate: users.defaultHourlyRate })
    .from(users)
    .where(eq(users.id, session.user.id));

  return !user?.defaultHourlyRate;
}
