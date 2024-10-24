import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createTeacherSchema } from "../schema";
import { db } from "@/db";
import { teacher } from "@/db/schema";

const app = new Hono().post(
  "/",
  zValidator("json", createTeacherSchema),
  async (c) => {
    const validatedFields = c.req.valid("json");

    const [data] = await db
      .insert(teacher)
      .values(validatedFields)
      .returning();

    return c.json({ data });
  }
);

export default app;
