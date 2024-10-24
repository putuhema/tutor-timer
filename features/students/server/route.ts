import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createStudentSchema } from "../schema";
import { db } from "@/db";
import { students } from "@/db/schema";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db.select().from(students);

    return c.json({ data });
  })
  .post(
    "/",
    zValidator("json", createStudentSchema),
    async (c) => {
      const validatedFields = c.req.valid("json");

      const [data] = await db
        .insert(students)
        .values(validatedFields)
        .returning();

      return c.json({ data });
    }
  );

export default app;
