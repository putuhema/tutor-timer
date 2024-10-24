import { z } from "zod";

export const createSessionSchema = z.object({
  teacherId: z.number(),
  studentId: z.number(),
  subjectId: z.number(),
  duration: z.number(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  location: z.string(),
});
