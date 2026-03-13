"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq, and, desc, inArray } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects, reports, scopeAdditions, users } from "@/lib/db/schema";

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

export async function createReport(formData: FormData) {
  const session = await getSession();
  const projectId = formData.get("projectId") as string;

  await verifyProjectOwnership(projectId, session.user.id);

  const [user] = await db
    .select({
      plan: users.plan,
      brandingLogoUrl: users.brandingLogoUrl,
      brandingAccentColor: users.brandingAccentColor,
    })
    .from(users)
    .where(eq(users.id, session.user.id));

  const isPro = user?.plan === "pro";

  const includedAdditions = formData.getAll("includedAdditions") as string[];

  const [report] = await db
    .insert(reports)
    .values({
      projectId,
      title: formData.get("title") as string,
      dateRangeStart: formData.get("dateRangeStart") as string,
      dateRangeEnd: formData.get("dateRangeEnd") as string,
      includedAdditions,
      freelancerNote: (formData.get("freelancerNote") as string) || null,
      shareToken: crypto.randomUUID(),
      showPoweredBy: !isPro,
      brandingLogoUrl: isPro ? (user.brandingLogoUrl ?? null) : null,
      brandingColor: isPro ? (user.brandingAccentColor ?? null) : null,
    })
    .returning();

  revalidatePath(`/projects/${projectId}`);

  return report;
}

export async function getReport(id: string) {
  const session = await getSession();

  const [report] = await db
    .select()
    .from(reports)
    .where(eq(reports.id, id));

  if (!report) {
    return null;
  }

  await verifyProjectOwnership(report.projectId, session.user.id);

  return report;
}

export async function getReportByToken(token: string) {
  const [report] = await db
    .select()
    .from(reports)
    .where(eq(reports.shareToken, token));

  if (!report) {
    return null;
  }

  const [project] = await db
    .select({
      name: projects.name,
      clientName: projects.clientName,
      currency: projects.currency,
      originalQuote: projects.originalQuote,
    })
    .from(projects)
    .where(eq(projects.id, report.projectId));

  const additions =
    report.includedAdditions && report.includedAdditions.length > 0
      ? await db
          .select()
          .from(scopeAdditions)
          .where(inArray(scopeAdditions.id, report.includedAdditions))
      : [];

  return { report, project, additions };
}

export async function getReportsForProject(projectId: string) {
  const session = await getSession();

  await verifyProjectOwnership(projectId, session.user.id);

  return db
    .select()
    .from(reports)
    .where(eq(reports.projectId, projectId))
    .orderBy(desc(reports.generatedAt));
}

export async function deleteReport(id: string) {
  const session = await getSession();

  const [report] = await db
    .select({ projectId: reports.projectId })
    .from(reports)
    .where(eq(reports.id, id));

  if (!report) {
    throw new Error("Report not found");
  }

  await verifyProjectOwnership(report.projectId, session.user.id);

  await db.delete(reports).where(eq(reports.id, id));

  revalidatePath(`/projects/${report.projectId}`);
}
