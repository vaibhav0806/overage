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

export async function getBranding() {
  const session = await getSession();

  const [user] = await db
    .select({
      brandingLogoUrl: users.brandingLogoUrl,
      brandingAccentColor: users.brandingAccentColor,
    })
    .from(users)
    .where(eq(users.id, session.user.id));

  return {
    brandingLogoUrl: user?.brandingLogoUrl ?? null,
    brandingAccentColor: user?.brandingAccentColor ?? null,
  };
}

export async function updateBranding(formData: FormData) {
  const session = await getSession();

  const logoUrl = (formData.get("logoUrl") as string) || null;
  const accentColor = (formData.get("accentColor") as string) || null;

  await db
    .update(users)
    .set({
      brandingLogoUrl: logoUrl,
      brandingAccentColor: accentColor,
    })
    .where(eq(users.id, session.user.id));

  revalidatePath("/settings/branding");
}
