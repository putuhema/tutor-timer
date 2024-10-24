import { z } from "zod";

export const createTeacherSchema = z.object({
  fullname: z
    .string()
    .min(3, "Fullname must be at least 3 characters long"),
  nickname: z
    .string()
    .min(3, "Nickname must be at least 3 characters long"),
  phone: z
    .string()
    .min(10, "Phone must be at least 12 characters long"),
  email: z.string().email("Invalid email"),
});
