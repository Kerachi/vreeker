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
  const apiRouter = express.Router();

  apiRouter.get("/demo", handleDemo);
  apiRouter.post("/send-planning", handleSendPlanning);
  apiRouter.get("/clockin/hours", handleGetClockInHours);
  apiRouter.get("/clockin/hours/:employeeId", handleGetClockInEmployeeDetail);

  app.use("/api", apiRouter);
  app.use("/", apiRouter);

  // Add handlers for Netlify functions proxy (for local development)
  app.get("/.netlify/functions/airtable", handleAirtable);

  return app;
}
