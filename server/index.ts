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
  // Register routes with various prefixes to ensure they are caught on Netlify
  const registerRoute = (path: string, handler: any, method: 'get' | 'post') => {
    (app as any)[method](path, handler);
    (app as any)[method](`/api${path}`, handler);
    (app as any)[method](`/.netlify/functions/api${path}`, handler);
  };

  registerRoute("/demo", handleDemo, "get");
  registerRoute("/send-planning", handleSendPlanning, "post");
  registerRoute("/clockin/hours", handleGetClockInHours, "get");
  registerRoute("/clockin/hours/:employeeId", handleGetClockInEmployeeDetail, "get");

  // Add handlers for Netlify functions proxy (for local development)
  app.get("/.netlify/functions/airtable", handleAirtable);
  app.post("/.netlify/functions/send-planning", handleSendPlanning);

  return app;
}
