import { Request, Response } from "express";

export async function handleAirtable(req: Request, res: Response) {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;
    const table = (req.query.table as string) || "Table 2";

    if (!baseId || !apiKey) {
      console.error("Missing Airtable credentials:", { baseId: !!baseId, apiKey: !!apiKey });
      return res.status(500).json({
        error: "Airtable credentials not configured on server",
      });
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || "Airtable API error",
        details: data.error,
      });
    }

    return res.json(data);
  } catch (error) {
    console.error("Airtable Proxy Error:", error);
    return res.status(500).json({
      error: "Failed to fetch from Airtable",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
