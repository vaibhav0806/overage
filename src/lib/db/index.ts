import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const db = new Proxy({} as ReturnType<typeof createDb>, {
  get(_target, prop) {
    const instance = createDb();
    return Reflect.get(instance, prop);
  },
});

function createDb() {
  const sql = neon(process.env.DATABASE_URL!);
  return drizzle(sql, { schema });
}
