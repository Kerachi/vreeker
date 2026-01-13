import { RequestHandler } from "express";

export const handleDownloadPlanning: RequestHandler = async (req, res) => {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;
    const tableId = "tblMbnG8ebN3GxN2i";

    if (!baseId || !apiKey) {
      return res.status(500).json({ error: "Server credentials not configured" });
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
      throw new Error(`Airtable error: ${response.status}`);
    }

    const data: any = await response.json();
    
    if (!data.records || data.records.length === 0) {
      return res.status(404).json({ error: "No records found in Airtable" });
    }

    const rawValue = data.records[0].fields["De link van onedrive"];
    if (!rawValue) {
      return res.status(404).json({ error: "OneDrive link not found in Airtable record" });
    }

    let extractedLink = "";

    // Parse JSON logic
    if (rawValue.trim().startsWith("{")) {
      try {
        const parsed = JSON.parse(rawValue);
        extractedLink = parsed.link?.webUrl || parsed.webUrl || "";
      } catch (e) {
        console.warn("Failed to parse JSON", e);
      }
    } else {
      extractedLink = rawValue;
    }

    if (!extractedLink) {
      return res.status(400).json({ error: "Could not extract valid URL from Airtable data" });
    }

    // Ensure absolute URL
    if (!extractedLink.startsWith("http")) {
      extractedLink = `https://${extractedLink}`;
    }

    // Convert to direct download link
    const separator = extractedLink.includes("?") ? "&" : "?";
    const downloadLink = `${extractedLink}${separator}download=1`;

    console.log("Fetching binary data from OneDrive...");

    // Fetch the actual file from OneDrive
    const fileResponse = await fetch(downloadLink);
    
    if (!fileResponse.ok) {
      return res.status(fileResponse.status).json({ error: "Failed to download file from OneDrive" });
    }

    // Get the binary content
    const arrayBuffer = await fileResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`Successfully proxied file. Size: ${buffer.length} bytes`);

    // Return the binary file directly with correct headers for WhatsApp
    res.set({
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": 'attachment; filename="planning.xlsx"',
      "Content-Length": buffer.length.toString(),
      "Cache-Control": "no-cache",
    });

    return res.send(buffer);

  } catch (error) {
    console.error("Download redirect error:", error);
    return res.status(500).json({ 
      error: "Internal server error", 
      message: error instanceof Error ? error.message : String(error) 
    });
  }
};
