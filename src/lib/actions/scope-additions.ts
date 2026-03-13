"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq, and, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects, scopeAdditions } from "@/lib/db/schema";

async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  return session;
}

async function verifyProjectOwnership(projectId: string, userId: string) {
  const [project] = await db
    .select({ id: projects.id })
    .from(projects)
    .where(and(eq(projects.id, projectId), eq(projects.userId, userId)));

  if (!project) {
    throw new Error("Project not found");
  }
}

export async function createAddition(formData: FormData) {
  const session = await getSession();
  const projectId = formData.get("projectId") as string;

  await verifyProjectOwnership(projectId, session.user.id);

  await db.insert(scopeAdditions).values({
    projectId,
    description: formData.get("description") as string,
    dateRequested: formData.get("dateRequested") as string,
    estimatedHours: formData.get("estimatedHours") as string,
    hourlyRate: formData.get("hourlyRate") as string,
    status: (formData.get("status") as string) || "pending",
    clientRequested:
      formData.get("clientRequested") === "on" ||
      formData.get("clientRequested") === "true",
    notes: (formData.get("notes") as string) || null,
  });

  revalidatePath(`/projects/${projectId}`);
}

export async function getAdditions(projectId: string) {
  const session = await getSession();

  await verifyProjectOwnership(projectId, session.user.id);

  return db
    .select()
    .from(scopeAdditions)
    .where(eq(scopeAdditions.projectId, projectId))
    .orderBy(desc(scopeAdditions.dateRequested));
}

export async function updateAddition(id: string, formData: FormData) {
  const session = await getSession();

  const [addition] = await db
    .select({ projectId: scopeAdditions.projectId })
    .from(scopeAdditions)
    .where(eq(scopeAdditions.id, id));

  if (!addition) {
    throw new Error("Addition not found");
  }

  await verifyProjectOwnership(addition.projectId, session.user.id);

  await db
    .update(scopeAdditions)
    .set({
      description: formData.get("description") as string,
      dateRequested: formData.get("dateRequested") as string,
      estimatedHours: formData.get("estimatedHours") as string,
      hourlyRate: formData.get("hourlyRate") as string,
      status: (formData.get("status") as string) || "pending",
      clientRequested:
        formData.get("clientRequested") === "on" ||
        formData.get("clientRequested") === "true",
      notes: (formData.get("notes") as string) || null,
    })
    .where(eq(scopeAdditions.id, id));

  revalidatePath(`/projects/${addition.projectId}`);
}

export async function getAllAdditionsForUser() {
  const session = await getSession();

  return db
    .select({
      projectId: scopeAdditions.projectId,
      estimatedHours: scopeAdditions.estimatedHours,
      hourlyRate: scopeAdditions.hourlyRate,
    })
    .from(scopeAdditions)
    .innerJoin(projects, eq(scopeAdditions.projectId, projects.id))
    .where(eq(projects.userId, session.user.id));
}

export async function deleteAddition(id: string) {
  const session = await getSession();

  const [addition] = await db
    .select({ projectId: scopeAdditions.projectId })
    .from(scopeAdditions)
    .where(eq(scopeAdditions.id, id));

  if (!addition) {
    throw new Error("Addition not found");
  }

  await verifyProjectOwnership(addition.projectId, session.user.id);

  await db.delete(scopeAdditions).where(eq(scopeAdditions.id, id));

  revalidatePath(`/projects/${addition.projectId}`);
}
