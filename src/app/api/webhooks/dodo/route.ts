import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("dodo-signature");
  if (signature !== process.env.DODO_PAYMENTS_WEBHOOK_KEY) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = await request.json();
  const { type, data } = body;

  const userId = data?.metadata?.user_id as string | undefined;
  if (!userId) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  switch (type) {
    case "subscription.active": {
      await db
        .update(users)
        .set({ plan: "pro" })
        .where(eq(users.id, userId));
      break;
    }
    case "subscription.cancelled":
    case "subscription.expired": {
      await db
        .update(users)
        .set({ plan: "free" })
        .where(eq(users.id, userId));
      break;
    }
  }

  return NextResponse.json({ received: true });
}
