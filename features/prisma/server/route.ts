import { Hono } from "hono";
import { z } from "zod";

import { zValidator } from "@hono/zod-validator";
import { createPrismaSchema } from "../schema";
import { db } from "@/db";
import { prismaData } from "@/db/schema";
import { and, eq } from "drizzle-orm";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({ level: z.string(), page: z.string() })
    ),
    async (c) => {
      const { level, page } = c.req.valid("query");
      const data = await db
        .select()
        .from(prismaData)
        .where(
          and(
            eq(prismaData.level, parseInt(level)),
            eq(prismaData.page, parseInt(page))
          )
        );

      return c.json({ data });
    }
  )
  .post(
    "/",
    zValidator("json", createPrismaSchema),
    async (c) => {
      const validatedFields = c.req.valid("json");

      const [data] = await db
        .insert(prismaData)
        .values(validatedFields)
        .returning();

      return c.json({ data });
    }
  );

export default app;
