import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    console.log("Sending planning to Make.com...");
    
    const response = await fetch(
      "https://hook.eu2.make.com/ilbdvxd8mo2myervxvpdl9u7pt3mm8bv",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          triggeredBy: "dashboard",
          source: "Vreeker planning button (Netlify Function)",
          timestamp: new Date().toISOString(),
        }),
      }
    );

    console.log("Make.com response status:", response.status);
    const responseText = await response.text();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: "Planning sent successfully",
        }),
      };
    } else {
      console.error("Make.com error:", responseText);
      return {
        statusCode: response.status,
        body: JSON.stringify({
          success: false,
          message: `Failed to send planning: ${response.status}`,
          detail: responseText
        }),
      };
    }
  } catch (error) {
    console.error("Error sending planning:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Server error while sending planning",
        error: error instanceof Error ? error.message : String(error)
      }),
    };
  }
};
