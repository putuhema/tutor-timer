import {
  integer,
  pgTable,
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
