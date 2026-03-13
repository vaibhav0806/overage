import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { users, sessions, accounts, verifications } from "@/lib/db/schema";
import { sendEmail } from "@/lib/email";
import { welcomeEmail1 } from "@/lib/emails/welcome";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const email = user.email ?? "";
          const name = user.name ?? email.split("@")[0];
          const { subject, html } = welcomeEmail1({ name });
          sendEmail({ to: email, subject, html }).catch(console.error);
        },
      },
    },
  },
});
