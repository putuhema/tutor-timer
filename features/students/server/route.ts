import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createStudentSchema } from "../schema";
import { db } from "@/db";
import { students } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

const app = new Hono()
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const [data] = await db
        .select()
        .from(students)
        .where(eq(students.id, parseInt(id)))
        .limit(1);

      return c.json({ data });
    }
  )
  .get("/", async (c) => {
    const data = await db
      .select()
      .from(students)
      .orderBy(asc(students.id));
    return c.json({ data });
  })
  .post(
    "/",
    zValidator("json", createStudentSchema),
    async (c) => {
      const validatedFields = c.req.valid("json");

      const student = await db
        .select()
        .from(students)
        .where(
          eq(students.nickname, validatedFields.nickname)
        )
        .limit(1);

      if (student.length > 0) {
        return c.json({ error: "Nickname already exists" });
      }

      const [data] = await db
        .insert(students)
        .values(validatedFields)
        .returning();

      return c.json({ data });
    }
  )
  .put(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    zValidator("json", createStudentSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const validatedFields = c.req.valid("json");

      const [data] = await db
        .update(students)
        .set({
          avatar: validatedFields.avatar,
          fullname: validatedFields.fullname,
          nickname: validatedFields.nickname,
        })
        .where(eq(students.id, parseInt(id)))
        .returning();

      return c.json({ data });
    }
  );

export default app;
