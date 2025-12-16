import { useState, useEffect } from "react";

interface OneDriveRecord {
  id: string;
  fields: {
    "De link van onedrive"?: string;
  };
}

interface AirtableResponse {
  records: OneDriveRecord[];
}

export function useOneDriveLink() {
  const [link, setLink] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        setIsLoading(true);

        // Use Table ID to be robust against name changes/formatting
        const response = await fetch(
          "/.netlify/functions/airtable?table=tblMbnG8ebN3GxN2i"
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Airtable API error: ${errorData.error || response.statusText}`
          );
        }

        const data: AirtableResponse = await response.json();
        
        // Get the link from the first record
        if (data.records && data.records.length > 0) {
          const firstRecord = data.records[0];
          let rawValue = firstRecord.fields["De link van onedrive"];
          
          if (rawValue) {
            let extractedLink = rawValue;

            // Check if it's a JSON object string
            if (rawValue.trim().startsWith("{")) {
              try {
                const parsed = JSON.parse(rawValue);
                // Try to find webUrl inside the structure user showed: link -> webUrl
                if (parsed.link && parsed.link.webUrl) {
                  extractedLink = parsed.link.webUrl;
                } else if (parsed.webUrl) {
                  extractedLink = parsed.webUrl;
                }
              } catch (e) {
                console.warn("Failed to parse JSON from Airtable field", e);
              }
            }

            // Ensure link starts with http:// or https://
            if (!extractedLink.startsWith("http://") && !extractedLink.startsWith("https://")) {
              extractedLink = `https://${extractedLink}`;
            }

            // Force embed mode if it's a OneDrive link
            if (extractedLink.includes("1drv.ms") || extractedLink.includes("onedrive.live.com")) {
              const separator = extractedLink.includes("?") ? "&" : "?";
              extractedLink = `${extractedLink}${separator}action=embedview`;
            }

            setLink(extractedLink);
          } else {
            console.warn("No OneDrive link found in the first record");
          }
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching OneDrive link:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch OneDrive link"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchLink();
  }, []);

  return { link, isLoading, error };
}
