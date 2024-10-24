import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z
    .string()
    .min(
      3,
      "Subject name must be at least 3 characters long"
    ),
  description: z.string().optional(),
});
