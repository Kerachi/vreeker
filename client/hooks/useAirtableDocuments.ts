import { useState, useEffect } from "react";

export interface AirtableDocument {
  id: string;
  fields: {
    Bestandsnaam: string;
    datum_toegevoegd?: string;
    Project?: string;
    Categorie?: string;
    Bestand?: Array<{ url: string; filename: string }>;
    Opmerking?: string;
  };
}

interface AirtableResponse {
  records: AirtableDocument[];
}

export function useAirtableDocuments() {
  const [documents, setDocuments] = useState<AirtableDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const baseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
        const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

        if (!baseId || !apiKey) {
          throw new Error(
            "Airtable credentials not configured. Set VITE_AIRTABLE_BASE_ID and VITE_AIRTABLE_API_KEY environment variables."
          );
        }

        const response = await fetch(
          `https://api.airtable.com/v0/${baseId}/Documenten?view=Grid%20view`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Airtable API error: ${response.statusText}`);
        }

        const data: AirtableResponse = await response.json();
        setDocuments(data.records);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch documents");
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return { documents, loading, error };
}
