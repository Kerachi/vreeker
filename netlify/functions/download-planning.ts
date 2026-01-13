import { Handler } from "@netlify/functions";
import { Buffer } from "buffer";

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

    // 1. Fetch the record from Airtable to get the OneDrive link
    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;
    const airtableResponse = await fetch(airtableUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!airtableResponse.ok) {
      return {
        statusCode: airtableResponse.status,
        body: JSON.stringify({ error: "Airtable connection failed" }),
      };
    }

    const data: any = await airtableResponse.json();
    
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

    // Parse JSON logic to get the webUrl
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

    console.log("Fetching binary data from OneDrive...");

    // 2. Fetch the actual file from OneDrive (the Proxy step)
    const fileResponse = await fetch(downloadLink, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });
    
    if (!fileResponse.ok) {
      const errorText = await fileResponse.text().catch(() => "No error body");
      return {
        statusCode: fileResponse.status,
        body: JSON.stringify({ 
          error: "Failed to download file from OneDrive",
          status: fileResponse.status,
          detail: errorText.substring(0, 200)
        }),
      };
    }

    // Get the binary content
    const arrayBuffer = await fileResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Content = buffer.toString("base64");

    console.log(`Successfully proxied file. Size: ${buffer.length} bytes`);

    // 3. Return the binary file directly with correct headers for WhatsApp
    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="planning.xlsx"',
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "no-cache",
      },
      body: base64Content,
    };

  } catch (error) {
    console.error("Proxy error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
