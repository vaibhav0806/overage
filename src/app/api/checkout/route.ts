import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { dodo } from "@/lib/dodo";

export async function POST() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checkout = await dodo.checkoutSessions.create({
    product_cart: [
      { product_id: process.env.DODO_PRO_PRODUCT_ID!, quantity: 1 },
    ],
    return_url: `${process.env.BETTER_AUTH_URL}/dashboard?upgraded=true`,
    customer: {
      email: session.user.email,
      name: session.user.name,
      customer_id: session.user.id,
    },
    metadata: {
      user_id: session.user.id,
    },
  });

  return NextResponse.json({ checkout_url: checkout.checkout_url });
}
