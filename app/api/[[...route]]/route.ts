import { Hono } from "hono";
import { handle } from "hono/vercel";

import prisma from "@/features/prisma/server/route";

const app = new Hono().basePath("/api");

const routes = app.route("/prisma", prisma);

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
