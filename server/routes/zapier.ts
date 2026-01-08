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

    // Log response for debugging on Netlify
    console.log("Make.com response status:", response.status);

    if (response.ok) {
      return res.status(200).json({
        success: true,
        message: "Planning sent successfully",
      });
    } else {
      // Get error detail if possible
      const text = await response.text();
      console.error("Make.com error body:", text);

      return res.status(response.status).json({
        success: false,
        message: `Failed to send planning: ${response.status}`,
        detail: text
      });
    }
  } catch (error) {
    console.error("Error sending planning to Make.com:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while sending planning",
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
