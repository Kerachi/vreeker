import { Download, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image";
  size: string;
  uploadDate: string;
}

interface DocumentsPhotosProps {
  documents: Document[];
}

export default function DocumentsPhotos({ documents }: DocumentsPhotosProps) {
  const documentsByType = {
    pdf: documents.filter((doc) => doc.type === "pdf"),
    image: documents.filter((doc) => doc.type === "image"),
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Documenten & Foto's</h2>

      {documentsByType.pdf.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-600" />
            Documenten
          </h3>
          <div className="space-y-2">
            {documentsByType.pdf.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {doc.name}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {doc.size} • {doc.uploadDate}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-2 text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <Download className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {documentsByType.image.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-green-600" />
            Foto's
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {documentsByType.image.map((doc) => (
              <div
                key={doc.id}
                className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden group cursor-pointer"
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-500" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <p className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate">
                  {doc.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {documents.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">Nog geen documenten of foto's beschikbaar.</p>
        </div>
      )}
    </div>
  );
}
