import { Download } from "lucide-react";
import { AirtableDocument } from "@/hooks/useAirtableDocuments";

interface AirtableDocumentCardProps {
  document: AirtableDocument;
}

export default function AirtableDocumentCard({
  document,
}: AirtableDocumentCardProps) {
  const { Bestandsnaam, Project, Categorie, Bestand, Opmerking } =
    document.fields;

  const fileUrl = Bestand?.[0]?.url;

  const handleOpen = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    }
  };

  return (
    <button
      onClick={handleOpen}
      disabled={!fileUrl}
      className="p-6 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all text-left group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gray-100 group-hover:bg-green-50 rounded-lg transition-colors group-disabled:bg-gray-100">
          <Download className="w-6 h-6 text-blue-500 group-disabled:text-gray-400" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-green-700 transition-colors truncate">
        {Bestandsnaam}
      </h3>

      <p className="text-sm text-gray-600 mb-3">
        {Project && <span>{Project}</span>}
        {Project && Categorie && <span> • </span>}
        {Categorie && <span>{Categorie}</span>}
      </p>

      {Opmerking && (
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{Opmerking}</p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {fileUrl ? "Bestand" : "Geen bestand"}
        </span>
        <span className="text-green-600 font-medium text-sm">
          {fileUrl ? "Open →" : "—"}
        </span>
      </div>
    </button>
  );
}
