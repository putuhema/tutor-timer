import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const prismaData = pgTable("prisma", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  level: integer("level").notNull(),
  page: integer("page").notNull(),
  operators: varchar("operators", {
    length: 256,
  }).notNull(),
  numbers: varchar("numbers", { length: 256 }).notNull(),
  operation: varchar("operation", {
    length: 256,
  }).notNull(),
  answer: integer("answer").notNull(),
});

export type prismaData = typeof prismaData.$inferSelect;

export const students = pgTable("students", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fullname: varchar("fullname", { length: 256 }).notNull(),
  nickname: varchar("nickname", { length: 256 }).notNull(),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const teacher = pgTable("teachers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fullname: varchar("fullname", { length: 256 }).notNull(),
  nickname: varchar("nickname", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 256 }),
  email: varchar("email", { length: 256 }),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const subjects = pgTable("subjects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const sessionStudents = pgTable("session_students", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  studentId: integer("student_id")
    .references(() => students.id)
    .notNull(),
  sessionId: integer("session_id")
    .references(() => sessions.id, { onDelete: "cascade" })
    .notNull(),
  notes: varchar("notes", { length: 256 }),
});

export const sessions = pgTable("sessions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  teacherId: integer("teacher_id")
    .references(() => teacher.id)
    .notNull(),
  date: timestamp("date", {
    precision: 6,
    withTimezone: true,
  }).notNull(),
  location: varchar("location", { length: 256 }).notNull(),
  notes: varchar("notes", { length: 256 }),
  createdAt: timestamp("created_at", {
    precision: 6,
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
});

export const subjectTimeLogs = pgTable(
  "subject_time_logs",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    sessionStudentsId: integer("session_students_id")
      .references(() => sessionStudents.id, {
        onDelete: "cascade",
      })
      .notNull(),
    subjectId: integer("subject_id")
      .references(() => subjects.id, {
        onDelete: "cascade",
      })
      .notNull(),
    startTime: timestamp("start_time", {
      precision: 6,
      withTimezone: true,
    }).notNull(),
    endTime: timestamp("end_time", {
      precision: 6,
      withTimezone: true,
    }).notNull(),
    duration: integer("duration").notNull(),
    status: varchar("status", {
      length: 256,
    }).notNull(),
    notes: varchar("notes", { length: 256 }),
    createAt: timestamp("created_at", {
      precision: 6,
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  }
);

// Relations

export const teachersRelations = relations(
  teacher,
  ({ many }) => ({
    sessions: many(sessions),
  })
);

export const studentsRelations = relations(
  students,
  ({ many }) => ({
    sessionsStudents: many(sessionStudents),
  })
);

export const sessionRelations = relations(
  sessions,
  ({ many, one }) => ({
    teacher: one(teacher, {
      fields: [sessions.teacherId],
      references: [teacher.id],
    }),
    sessionStudents: many(sessionStudents),
  })
);

export const sessionStudentsRelations = relations(
  sessionStudents,
  ({ one, many }) => ({
    student: one(students, {
      fields: [sessionStudents.studentId],
      references: [students.id],
    }),
    session: one(sessions, {
      fields: [sessionStudents.sessionId],
      references: [sessions.id],
    }),
    subjectTimeLogs: many(subjectTimeLogs),
  })
);

export const subjectRelations = relations(
  subjects,
  ({ many }) => ({
    subjectTimeLogs: many(subjectTimeLogs),
  })
);

export const subjectTimeLogsRelations = relations(
  subjectTimeLogs,
  ({ one }) => ({
    sessionStudents: one(sessionStudents, {
      fields: [subjectTimeLogs.sessionStudentsId],
      references: [sessionStudents.id],
    }),
    subject: one(subjects, {
      fields: [subjectTimeLogs.subjectId],
      references: [subjects.id],
    }),
  })
);
