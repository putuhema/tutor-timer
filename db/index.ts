import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

config({ path: ".env.local" });

const client = postgres(
  process.env.DATABASE_URL as string,
  { prepare: false }
);
export const db = drizzle(client);
