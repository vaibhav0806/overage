import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { BrandingForm } from "@/components/branding-form";
import { UpgradeButton } from "@/components/upgrade-button";

export const metadata: Metadata = {
  title: "Report Branding",
};

export default async function BrandingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const [profile] = await db
    .select({
      plan: users.plan,
      brandingLogoUrl: users.brandingLogoUrl,
      brandingAccentColor: users.brandingAccentColor,
    })
    .from(users)
    .where(eq(users.id, session.user.id));

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Report Branding</h1>
      <p className="mt-1 text-sm text-gray-500">
        Customize how your scope change reports look when shared with clients.
      </p>

      {profile?.plan === "free" ? (
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-gray-900">
            Custom branding is a Pro feature
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Upgrade to add your logo and brand colors to client-facing reports.
          </p>
          <div className="mt-4 inline-block">
            <UpgradeButton />
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <BrandingForm
            currentLogoUrl={profile?.brandingLogoUrl ?? null}
            currentAccentColor={profile?.brandingAccentColor ?? null}
          />
        </div>
      )}
    </div>
  );
}
