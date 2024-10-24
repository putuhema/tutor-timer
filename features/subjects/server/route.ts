import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createSubjectSchema } from "../schema";
import { db } from "@/db";
import { subjects } from "@/db/schema";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db.select().from(subjects);

    return c.json({ data });
  })
  .post(
    "/",
    zValidator("json", createSubjectSchema),
    async (c) => {
      const validatedFields = c.req.valid("json");

      const [data] = await db
        .insert(subjects)
        .values(validatedFields)
        .returning();

      return c.json({ data });
    }
  );

export default app;
