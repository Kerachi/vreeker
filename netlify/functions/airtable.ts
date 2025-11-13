import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
  // Only allow GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;
    const table = event.queryStringParameters?.table || "Table 2";

    if (!baseId || !apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Airtable credentials not configured on server",
        }),
      };
    }

    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({
          error: data.error?.message || "Airtable API error",
          details: data.error,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch from Airtable",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};

export { handler };
