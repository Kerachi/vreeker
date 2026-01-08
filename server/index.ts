import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleSendPlanning } from "./routes/zapier";
import {
  handleGetClockInHours,
  handleGetClockInEmployeeDetail,
} from "./routes/clockin";
import { handleAirtable } from "./routes/airtable";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  // Support both /api/path (local) and /path (Netlify redirects)
  // We define routes on the app directly to avoid any router-stripping issues
  const routes = [
    { path: "/demo", handler: handleDemo, method: "get" },
    { path: "/send-planning", handler: handleSendPlanning, method: "post" },
    { path: "/clockin/hours", handler: handleGetClockInHours, method: "get" },
    { path: "/clockin/hours/:employeeId", handler: handleGetClockInEmployeeDetail, method: "get" },
  ];

  routes.forEach(({ path, handler, method }) => {
    (app as any)[method](path, handler);
    (app as any)[method]("/api" + path, handler);
  });

  // Add handlers for Netlify functions proxy (for local development)
  app.get("/.netlify/functions/airtable", handleAirtable);

  return app;
}
