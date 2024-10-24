import { Hono } from "hono";
import { handle } from "hono/vercel";

import prisma from "@/features/prisma/server/route";
import students from "@/features/students/server/route";
import teachers from "@/features/teacher/server/route";
import subjects from "@/features/subjects/server/route";
import sessions from "@/features/session/server/route";

const app = new Hono().basePath("/api");

const routes = app
  .route("/prisma", prisma)
  .route("/students", students)
  .route("/teachers", teachers)
  .route("/subjects", subjects)
  .route("/sessions", sessions);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
