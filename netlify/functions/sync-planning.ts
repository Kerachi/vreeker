import { Handler } from "@netlify/functions";
import crypto from "crypto";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST" && event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const cloudinaryKey = process.env.CLOUDINARY_API_KEY;
    const cloudinarySecret = process.env.CLOUDINARY_API_SECRET;
    const tableId = "tblMbnG8ebN3GxN2i";

    if (!baseId || !apiKey || !cloudName || !cloudinaryKey || !cloudinarySecret) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing configuration (Airtable or Cloudinary)" }),
      };
    }

    // 1. Get the OneDrive link from Airtable
    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${tableId}`;
    const airtableResponse = await fetch(airtableUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!airtableResponse.ok) {
      return { statusCode: airtableResponse.status, body: "Airtable connection failed" };
    }

    const data: any = await airtableResponse.json();
    const rawValue = data.records?.[0]?.fields["De link van onedrive"];
    
    if (!rawValue) {
      return { statusCode: 404, body: "Link not found in Airtable" };
    }

    let extractedLink = "";
    if (rawValue.trim().startsWith("{")) {
      try {
        const parsed = JSON.parse(rawValue);
        extractedLink = parsed.link?.webUrl || parsed.webUrl || "";
      } catch (e) { extractedLink = rawValue; }
    } else {
      extractedLink = rawValue;
    }

    if (!extractedLink.startsWith("http")) {
      extractedLink = `https://${extractedLink}`;
    }

    // Convert to direct download link
    const separator = extractedLink.includes("?") ? "&" : "?";
    const downloadLink = `${extractedLink}${separator}download=1`;

    // 2. Upload to Cloudinary using their REST API
    const timestamp = Math.round(new Date().getTime() / 1000);
    const public_id = "planning_vreeker.xlsx";
    const folder = "planning";
    
    // Create signature for secure upload
    // MUST be in alphabetical order: folder, invalidate, overwrite, public_id, timestamp
    const signatureStr = `folder=${folder}&invalidate=true&overwrite=true&public_id=${public_id}&timestamp=${timestamp}${cloudinarySecret}`;
    const signature = crypto.createHash("sha1").update(signatureStr).digest("hex");

    const formData = new URLSearchParams();
    formData.append("file", downloadLink); // Cloudinary can upload directly from a URL!
    formData.append("public_id", public_id);
    formData.append("folder", folder);
    formData.append("resource_type", "raw");
    formData.append("overwrite", "true");
    formData.append("invalidate", "true");
    formData.append("api_key", cloudinaryKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    console.log("Triggering Cloudinary Sync...");
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;
    
    const cloudResponse = await fetch(cloudinaryUrl, {
      method: "POST",
      body: formData,
    });

    const cloudData: any = await cloudResponse.json();

    if (!cloudResponse.ok) {
      console.error("Cloudinary error:", cloudData);
      return {
        statusCode: cloudResponse.status,
        body: JSON.stringify({ error: "Cloudinary upload failed", detail: cloudData }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Successfully synced planning to Cloudinary",
        url: cloudData.secure_url,
      }),
    };

  } catch (error) {
    console.error("Sync error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error", message: String(error) }),
    };
  }
};
