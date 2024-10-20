CREATE TABLE IF NOT EXISTS "prisma" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "prisma_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"level" integer NOT NULL,
	"page" integer NOT NULL,
	"operators" varchar(256) NOT NULL,
	"numbers" varchar(256) NOT NULL,
	"operation" varchar(256) NOT NULL,
	"answer" integer NOT NULL
);
