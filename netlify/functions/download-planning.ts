import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;
    const tableId = "tblMbnG8ebN3GxN2i";

    if (!baseId || !apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Server credentials not configured" }),
      };
    }

    // Fetch the record from Airtable
    const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Airtable connection failed" }),
      };
    }

    const data: any = await response.json();
    
    if (!data.records || data.records.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "No data found in Airtable" }),
      };
    }

    const rawValue = data.records[0].fields["De link van onedrive"];
    if (!rawValue) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Link not found in record" }),
      };
    }

    let extractedLink = "";

    // Parse JSON logic
    if (rawValue.trim().startsWith("{")) {
      try {
        const parsed = JSON.parse(rawValue);
        extractedLink = parsed.link?.webUrl || parsed.webUrl || "";
      } catch (e) {
        console.warn("Failed to parse JSON");
      }
    } else {
      extractedLink = rawValue;
    }

    if (!extractedLink) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Could not extract URL" }),
      };
    }

    // Ensure absolute URL
    if (!extractedLink.startsWith("http")) {
      extractedLink = `https://${extractedLink}`;
    }

    // Convert to direct download link
    const separator = extractedLink.includes("?") ? "&" : "?";
    const downloadLink = `${extractedLink}${separator}download=1`;

    // Perform the redirect
    return {
      statusCode: 302,
      headers: {
        Location: downloadLink,
      },
      body: "",
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
