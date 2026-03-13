"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq, and, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects, users } from "@/lib/db/schema";

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  return session;
}

export async function createProject(formData: FormData) {
  const session = await getSession();

  const [user] = await db
    .select({ plan: users.plan })
    .from(users)
    .where(eq(users.id, session.user.id));

  if (user?.plan === "free") {
    const activeProjects = await db
      .select({ id: projects.id })
      .from(projects)
      .where(
        and(
          eq(projects.userId, session.user.id),
          eq(projects.status, "active"),
        ),
      );

    if (activeProjects.length >= 1) {
      throw new Error(
        "Free plan is limited to 1 active project. Upgrade to Pro for unlimited projects.",
      );
    }
  }

  const [inserted] = await db
    .insert(projects)
    .values({
      userId: session.user.id,
      name: formData.get("name") as string,
      clientName: formData.get("clientName") as string,
      clientEmail: (formData.get("clientEmail") as string) || null,
      originalQuote: formData.get("originalQuote") as string,
      originalScope: formData.get("originalScope") as string,
      hourlyRate: formData.get("hourlyRate") as string,
      currency: (formData.get("currency") as string) || "USD",
    })
    .returning({ id: projects.id });

  revalidatePath("/projects");
  redirect(`/projects/${inserted.id}`);
}

export async function getProjects() {
  const session = await getSession();

  return db
    .select()
    .from(projects)
    .where(eq(projects.userId, session.user.id))
    .orderBy(desc(projects.createdAt));
}

export async function getProject(id: string) {
  const session = await getSession();

  const [project] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, session.user.id)));

  return project ?? null;
}

export async function updateProject(id: string, formData: FormData) {
  const session = await getSession();

  await db
    .update(projects)
    .set({
      name: formData.get("name") as string,
      clientName: formData.get("clientName") as string,
      clientEmail: (formData.get("clientEmail") as string) || null,
      originalQuote: formData.get("originalQuote") as string,
      originalScope: formData.get("originalScope") as string,
      hourlyRate: formData.get("hourlyRate") as string,
      currency: (formData.get("currency") as string) || "USD",
    })
    .where(and(eq(projects.id, id), eq(projects.userId, session.user.id)));

  revalidatePath(`/projects/${id}`);
  redirect(`/projects/${id}`);
}

export async function deleteProject(id: string) {
  const session = await getSession();

  await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, session.user.id)));

  revalidatePath("/projects");
  redirect("/projects");
}
