import { useState, useEffect } from "react";

/**
 * Hook to fetch documents from Airtable API
 *
 * Environment Variables (set in DevServerControl or .env):
 * - VITE_AIRTABLE_BASE_ID: Your Airtable Base ID (e.g., appXXXXXXX)
 * - VITE_AIRTABLE_API_KEY: Your Airtable Personal Access Token (pat...)
 *
 * To update credentials:
 * 1. Go to https://airtable.com/account/developer/tokens
 * 2. Copy your personal access token
 * 3. Update VITE_AIRTABLE_API_KEY in DevServerControl settings or .env.local
 *
 * The API automatically fetches from the "Documenten" table with "Grid view"
 */

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setIsLoading(true);

        // Call the Netlify Function proxy instead of Airtable directly
        const response = await fetch("/.netlify/functions/airtable?table=Table%202");

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Airtable API error: ${errorData.error || response.statusText}`
          );
        }

        const data: AirtableResponse = await response.json();
        setDocuments(data.records);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch documents");
        setDocuments([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return { documents, isLoading, error };
}
