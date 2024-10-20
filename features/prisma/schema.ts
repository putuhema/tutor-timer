import { z } from "zod";

export const createPrismaSchema = z.object({
  level: z.number(),
  page: z.number(),
  operators: z.string(),
  numbers: z.string(),
  operation: z.string(),
  answer: z.number(),
});

export type CreatePrismaSchema = z.infer<
  typeof createPrismaSchema
>;
