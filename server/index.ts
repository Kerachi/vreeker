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
import { handleDownloadPlanning } from "./routes/onedrive";

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
  app.get("/api/demo", handleDemo);
  app.post("/api/send-planning", handleSendPlanning);
  app.get("/api/download-planning", handleDownloadPlanning);
  app.get("/api/clockin/hours", handleGetClockInHours);
  app.get("/api/clockin/hours/:employeeId", handleGetClockInEmployeeDetail);

  // Direct paths for Netlify compatibility
  app.get("/download-planning", handleDownloadPlanning);

  // Add handlers for Netlify functions proxy (for local development)
  app.get("/.netlify/functions/airtable", handleAirtable);
  
  // Make the direct function path work locally too
  app.post("/.netlify/functions/send-planning", handleSendPlanning);

  return app;
}
