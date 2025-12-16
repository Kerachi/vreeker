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

  app.get("/api/demo", handleDemo);
  app.post("/api/send-planning", handleSendPlanning);
  app.get("/api/clockin/hours", handleGetClockInHours);
  app.get("/api/clockin/hours/:employeeId", handleGetClockInEmployeeDetail);

  // Add handlers for Netlify functions proxy (for local development)
  app.get("/.netlify/functions/airtable", handleAirtable);

  return app;
}
