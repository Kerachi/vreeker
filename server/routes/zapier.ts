import { RequestHandler } from "express";

export const handleSendPlanning: RequestHandler = async (req, res) => {
  try {
    const response = await fetch(
      "https://hook.eu2.make.com/ilbdvxd8mo2myervxvpdl9u7pt3mm8bv",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          triggeredBy: "dashboard",
          source: "Vreeker planning button",
          timestamp: new Date().toISOString(),
        }),
      }
    );

    if (response.ok) {
      res.status(200).json({
        success: true,
        message: "Planning sent successfully",
      });
    } else {
      res.status(response.status).json({
        success: false,
        message: "Failed to send planning",
      });
    }
  } catch (error) {
    console.error("Error sending planning to Zapier:", error);
    res.status(500).json({
      success: false,
      message: "Server error while sending planning",
    });
  }
};
