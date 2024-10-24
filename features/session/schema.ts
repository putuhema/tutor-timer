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

// Base schemas for nested objects
const StudentSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string().nullable(),
});

const SubjectSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const SessionSchema = z.object({
  sessionId: z.number(),
  studentSessionId: z.number(),
  student: StudentSchema,
  subject: SubjectSchema,
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  duration: z.number(),
  status: z.enum(["COMPLETED", "IN_PROGRESS"]),
});

const DailySessionsSchema = z.object({
  date: z.string().datetime(),
  sessions: z.array(SessionSchema),
});

// API Response schema
export const SessionHistoryResponseSchema = z.object({
  data: z.array(DailySessionsSchema),
});

export type SessionHistory = z.infer<
  typeof SessionHistoryResponseSchema
>;

export type Session = z.infer<typeof SessionSchema>;
