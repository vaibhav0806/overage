import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("webhook-signature");
  if (!signature || !process.env.DODO_PAYMENTS_WEBHOOK_KEY) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Dodo sends signature as "v1,<hash>" — verify using the webhook secret
  const webhookSecret = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  const timestamp = request.headers.get("webhook-timestamp") ?? "";
  const body = await request.text();

  // Compute expected signature: HMAC-SHA256(secret, "msg_id.timestamp.body")
  const msgId = request.headers.get("webhook-id") ?? "";
  const { createHmac } = await import("crypto");
  const toSign = `${msgId}.${timestamp}.${body}`;
  const secretBytes = Buffer.from(webhookSecret.replace("whsec_", ""), "base64");
  const expectedSignature = "v1," + createHmac("sha256", secretBytes).update(toSign).digest("base64");

  if (signature !== expectedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const { type, data } = JSON.parse(body);

  const userId = data?.metadata?.user_id as string | undefined;
  if (!userId) {
    // Test pings from Dodo dashboard don't include metadata — acknowledge them
    return NextResponse.json({ received: true });
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
