import { z } from "zod";

export const createStudentSchema = z.object({
  fullname: z
    .string()
    .min(3, "Fullname must be at least 3 characters long"),
  nickname: z
    .string()
    .min(3, "Nickname must be at least 3 characters long"),
});
