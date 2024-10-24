import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  createSessionSchema,
  SessionHistoryResponseSchema,
} from "../schema";
import { db } from "@/db";
import {
  sessions,
  sessionStudents,
  students,
  subjects,
  subjectTimeLogs,
} from "@/db/schema";
import {
  and,
  asc,
  between,
  desc,
  eq,
  sql,
} from "drizzle-orm";

const app = new Hono()
  .get(
    "/:teacherId",
    zValidator(
      "param",
      z.object({
        teacherId: z.string(),
      })
    ),
    async (c) => {
      const teacherId = parseInt(
        c.req.valid("param").teacherId
      );

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const data = await db
        .select({
          sessionId: sessions.id,
          date: sessions.date,
          studentSessionId: sessionStudents.id,
          // Student information
          studentId: students.id,
          studentName: students.fullname,
          studentAvatar: students.avatar,
          // Subject information
          subjectId: subjects.id,
          subjectName: subjects.name,
          // Time log information
          subjectTimeLogsId: subjectTimeLogs.id,
          startTime: subjectTimeLogs.startTime,
          endTime: subjectTimeLogs.endTime,
          duration: subjectTimeLogs.duration,
          status: subjectTimeLogs.status,
        })
        .from(sessions)
        .rightJoin(
          sessionStudents,
          eq(sessions.id, sessionStudents.sessionId)
        )
        .rightJoin(
          students,
          eq(sessionStudents.studentId, students.id)
        )
        .rightJoin(
          subjectTimeLogs,
          eq(
            sessionStudents.id,
            subjectTimeLogs.sessionStudentsId
          )
        )
        .rightJoin(
          subjects,
          eq(subjectTimeLogs.subjectId, subjects.id)
        )
        .where(
          and(
            between(sessions.date, today, tomorrow),
            eq(sessions.teacherId, teacherId),
            eq(subjectTimeLogs.status, "IN_PROGRESS")
          )
        );
      return c.json({ data });
    }
  )
  .get(
    "/history/:teacherId",
    zValidator(
      "param",
      z.object({
        teacherId: z.string(),
      })
    ),
    async (c) => {
      const teacherId = parseInt(
        c.req.valid("param").teacherId
      );

      const rawData = await db
        .select({
          date: sql<string>`to_char(${sessions.date}, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')`.as(
            "date"
          ),
          sessions: sql<string>`
          array_agg(distinct
            jsonb_build_object(
              'sessionId', ${sessions.id},
              'studentSessionId', ${sessionStudents.id},
              'student', jsonb_build_object(
                'id', ${students.id},
                'name', ${students.fullname},
                'avatar', ${students.avatar}
              ),
              'subject', jsonb_build_object(
                'id', ${subjects.id},
                'name', ${subjects.name}
              ),
              'startTime', to_char(${subjectTimeLogs.startTime}, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
              'endTime', to_char(${subjectTimeLogs.endTime}, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
              'duration', ${subjectTimeLogs.duration},
              'status', ${subjectTimeLogs.status}
            )
          )`,
        })
        .from(sessions)
        .rightJoin(
          sessionStudents,
          eq(sessions.id, sessionStudents.sessionId)
        )
        .rightJoin(
          students,
          eq(sessionStudents.studentId, students.id)
        )
        .rightJoin(
          subjectTimeLogs,
          eq(
            sessionStudents.id,
            subjectTimeLogs.sessionStudentsId
          )
        )
        .rightJoin(
          subjects,
          eq(subjectTimeLogs.subjectId, subjects.id)
        )
        .where(and(eq(sessions.teacherId, teacherId)))
        .groupBy(sessions.date)
        .orderBy(desc(sessions.date));

      const processedData = rawData.map((day) => {
        const sessionsArray = Array.isArray(day.sessions)
          ? day.sessions
          : JSON.parse(day.sessions);

        return {
          date: day.date,
          sessions: sessionsArray,
        };
      });

      try {
        const validatedResponse =
          SessionHistoryResponseSchema.parse({
            data: processedData,
          });

        return c.json({
          data: validatedResponse.data,
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error(
            "Validation errors:",
            error.errors.map((e) => ({
              path: e.path.join("."),
              message: e.message,
            }))
          );

          return c.json(
            {
              error: "Validation Error",
              details: error.errors,
            },
            400
          );
        }

        return c.json(
          {
            error: "Internal Server Error",
          },
          500
        );
      }
    }
  )
  .get(
    "/time/:sessionStudentId/:subjectId",
    zValidator(
      "param",
      z.object({
        sessionStudentId: z.string(),
        subjectId: z.string(),
      })
    ),
    async (c) => {
      const sessionStudentId = parseInt(
        c.req.valid("param").sessionStudentId
      );
      const subjectId = parseInt(
        c.req.valid("param").subjectId
      );

      const [data] = await db
        .select({
          startTime: subjectTimeLogs.startTime,
          endTime: subjectTimeLogs.endTime,
        })
        .from(subjectTimeLogs)
        .where(
          and(
            eq(
              subjectTimeLogs.sessionStudentsId,
              sessionStudentId
            ),
            eq(subjectTimeLogs.subjectId, subjectId)
          )
        )
        .limit(1);
      return c.json({ data });
    }
  )
  .post(
    "/",
    zValidator("json", createSessionSchema),
    async (c) => {
      const validatedFields = c.req.valid("json");

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const session = await db.transaction(async (tx) => {
        const existingSession = await tx
          .select()
          .from(sessions)
          .where(
            and(
              eq(
                sessions.teacherId,
                validatedFields.teacherId
              ),
              between(sessions.date, today, tomorrow)
            )
          )
          .limit(1);

        let sessionId = 0;
        if (existingSession.length === 0) {
          const [newSession] = await tx
            .insert(sessions)
            .values({
              date: today,
              teacherId: validatedFields.teacherId,
              location: validatedFields.location,
            })
            .returning();
          sessionId = newSession.id;
        } else {
          sessionId = existingSession[0].id;
        }

        const existingSessionStudent = await tx
          .select()
          .from(sessionStudents)
          .where(
            and(
              eq(sessionStudents.sessionId, sessionId),
              eq(
                sessionStudents.studentId,
                validatedFields.studentId
              )
            )
          )
          .limit(1);

        let sessionStudentId;

        if (existingSessionStudent.length === 0) {
          const [newSessionStudent] = await tx
            .insert(sessionStudents)
            .values({
              sessionId: sessionId,
              studentId: validatedFields.studentId,
            })
            .returning();
          sessionStudentId = newSessionStudent.id;
        } else {
          sessionStudentId = existingSessionStudent[0].id;
        }

        await tx.insert(subjectTimeLogs).values({
          duration: validatedFields.duration,
          startTime: validatedFields.startTime,
          endTime: validatedFields.endTime,
          sessionStudentsId: sessionStudentId,
          subjectId: validatedFields.subjectId,
          status: "IN_PROGRESS",
        });

        const sessionData = await tx
          .select({
            session: sessions,
          })
          .from(sessions)
          .where(eq(sessions.id, sessionId));

        return sessionData;
      });

      return c.json({ data: session[0].session });
    }
  )
  .put(
    "/time/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");
      await db
        .update(subjectTimeLogs)
        .set({
          status: "COMPLETED",
        })
        .where(eq(subjectTimeLogs.id, parseInt(id)));
      return c.json({ data: true });
    }
  )
  .delete(
    "/session-student/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().refine((id) => !isNaN(parseInt(id))),
      })
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const deletedSession = await db
        .select()
        .from(subjectTimeLogs)
        .where(eq(subjectTimeLogs.id, parseInt(id)))
        .limit(1);

      if (deletedSession.length === 0) {
        return c.json({
          data: deletedSession[0],
          message: "Session not found",
        });
      }

      await db
        .delete(subjectTimeLogs)
        .where(eq(subjectTimeLogs.id, parseInt(id)));

      return c.json({
        data: deletedSession[0],
        message: "Session deleted",
      });
    }
  );

export default app;
