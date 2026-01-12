import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const response = await fetch(
      "https://hook.eu2.make.com/ilbdvxd8mo2myervxvpdl9u7pt3mm8bv",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          triggeredBy: "dashboard",
          source: "Vreeker planning button (Direct Netlify Function)",
          timestamp: new Date().toISOString(),
        }),
      }
    );

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ success: false, error: "Make.com returned an error" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: String(error) }),
    };
  }
};
