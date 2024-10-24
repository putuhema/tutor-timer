CREATE TABLE IF NOT EXISTS "prisma" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "prisma_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"level" integer NOT NULL,
	"page" integer NOT NULL,
	"operators" varchar(256) NOT NULL,
	"numbers" varchar(256) NOT NULL,
	"operation" varchar(256) NOT NULL,
	"answer" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session_students" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "session_students_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"student_id" integer NOT NULL,
	"session_id" integer NOT NULL,
	"notes" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sessions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"teacher_id" integer NOT NULL,
	"date" timestamp (6) with time zone NOT NULL,
	"location" varchar(256) NOT NULL,
	"notes" varchar(256),
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "students_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"fullname" varchar(256) NOT NULL,
	"nickname" varchar(256) NOT NULL,
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subject_time_logs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "subject_time_logs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"session_students_id" integer NOT NULL,
	"subject_id" integer NOT NULL,
	"start_time" timestamp (6) with time zone NOT NULL,
	"end_time" timestamp (6) with time zone NOT NULL,
	"duration" integer NOT NULL,
	"status" varchar(256) NOT NULL,
	"notes" varchar(256),
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subjects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "subjects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"description" varchar(256),
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "teachers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "teachers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"fullname" varchar(256) NOT NULL,
	"nickname" varchar(256) NOT NULL,
	"phone" varchar(256),
	"email" varchar(256),
	"created_at" timestamp (6) with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_students" ADD CONSTRAINT "session_students_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session_students" ADD CONSTRAINT "session_students_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_teacher_id_teachers_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subject_time_logs" ADD CONSTRAINT "subject_time_logs_session_students_id_session_students_id_fk" FOREIGN KEY ("session_students_id") REFERENCES "public"."session_students"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subject_time_logs" ADD CONSTRAINT "subject_time_logs_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
