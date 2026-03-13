import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/sign-out-button";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 flex w-64 flex-col border-r border-gray-200 bg-white">
        <div className="px-6 py-6">
          <span className="text-xl font-bold text-gray-900">Overage</span>
        </div>
        <nav className="flex-1 px-4">
          <Link
            href="/dashboard"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <Link
            href="/projects"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Projects
          </Link>
        </nav>
        <div className="border-t border-gray-200 px-6 py-4">
          <p className="truncate text-sm text-gray-600">{session.user.email}</p>
          <SignOutButton />
        </div>
      </aside>
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
