import {
  Download,
  Upload,
  Folder,
  FileText,
  FileImage,
  File,
  ArrowLeft,
  FolderOpen,
  Cloud,
  CheckCircle,
  Bell,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import OneDriveCard from "@/components/OneDriveCard";
import AirtableDocumentCard from "@/components/AirtableDocumentCard";
import { useAirtableDocuments } from "@/hooks/useAirtableDocuments";

interface DocumentFile {
  id: string;
  name: string;
  type: "pdf" | "excel" | "image" | "word" | "other";
  size: string;
}

interface DocumentFolder {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  fileCount: number;
  files: DocumentFile[];
  url?: string;
}

const folders: DocumentFolder[] = [
  {
    id: "projectdocumenten",
    name: "Projectdocumenten",
    description: "Alle project-gerelateerde documenten",
    icon: <Folder className="w-8 h-8 text-blue-500" />,
    fileCount: 12,
    files: [
      {
        id: "1",
        name: "Offerte_Hoflaan_Renovatie.pdf",
        type: "pdf",
        size: "2.4 MB",
      },
      { id: "2", name: "Planning_Week_45.xlsx", type: "excel", size: "1.8 MB" },
      {
        id: "3",
        name: "Foto_Voortgang_Project.jpg",
        type: "image",
        size: "3.2 MB",
      },
      {
        id: "4",
        name: "Bestek_Begraafplaats.pdf",
        type: "pdf",
        size: "1.6 MB",
      },
      { id: "5", name: "Tekening_Grondplan.pdf", type: "pdf", size: "2.1 MB" },
      {
        id: "6",
        name: "Eindrapport_Tuinonderhoud.docx",
        type: "word",
        size: "0.9 MB",
      },
    ],
  },
  {
    id: "hr",
    name: "HR",
    description: "Personeelsbestanden en contracten",
    icon: <FileText className="w-8 h-8 text-green-500" />,
    fileCount: 8,
    files: [
      {
        id: "7",
        name: "Arbeidscontract_Mark.pdf",
        type: "pdf",
        size: "1.2 MB",
      },
      {
        id: "8",
        name: "Handleiding_Dashboard.pdf",
        type: "pdf",
        size: "3.5 MB",
      },
      {
        id: "9",
        name: "Personeelsgegevens.xlsx",
        type: "excel",
        size: "0.8 MB",
      },
      {
        id: "10",
        name: "Competentiematrix_2024.pdf",
        type: "pdf",
        size: "1.1 MB",
      },
      { id: "11", name: "Trainingsplan_Q4.docx", type: "word", size: "0.7 MB" },
    ],
  },
  {
    id: "offertes-contracten",
    name: "Offertes & Contracten",
    description: "Klantoffertes en contractuele documenten",
    icon: <FileText className="w-8 h-8 text-purple-500" />,
    fileCount: 15,
    files: [
      {
        id: "12",
        name: "Offerte_De_Jong_Familie.pdf",
        type: "pdf",
        size: "1.8 MB",
      },
      {
        id: "13",
        name: "Contract_Gemeente_Hoorn.pdf",
        type: "pdf",
        size: "2.3 MB",
      },
      {
        id: "14",
        name: "Offerte_Restaurant_Tuin.pdf",
        type: "pdf",
        size: "1.5 MB",
      },
      {
        id: "15",
        name: "Offertes_Overzicht_2024.xlsx",
        type: "excel",
        size: "0.9 MB",
      },
      {
        id: "16",
        name: "Serviceovereenkomst_Crematorium.pdf",
        type: "pdf",
        size: "1.7 MB",
      },
      {
        id: "17",
        name: "Contract_Template_NL.docx",
        type: "word",
        size: "0.6 MB",
      },
    ],
  },
  {
    id: "werkinstructies",
    name: "Werkinstructies",
    description: "Richtlijnen en procedures",
    icon: <FileText className="w-8 h-8 text-orange-500" />,
    fileCount: 9,
    files: [
      {
        id: "18",
        name: "Veiligheid_Voorschriften.pdf",
        type: "pdf",
        size: "2.6 MB",
      },
      {
        id: "19",
        name: "Bedrijfsbeleid_2024.pdf",
        type: "pdf",
        size: "1.4 MB",
      },
      {
        id: "20",
        name: "Checklist_Projectvoorbereiding.pdf",
        type: "pdf",
        size: "0.8 MB",
      },
      {
        id: "21",
        name: "Instructie_Tuinschaar.pdf",
        type: "pdf",
        size: "1.2 MB",
      },
      {
        id: "22",
        name: "Richtlijnen_Klantenservice.docx",
        type: "word",
        size: "0.7 MB",
      },
      {
        id: "23",
        name: "Noodprotocol_en_EHBO.pdf",
        type: "pdf",
        size: "1.9 MB",
      },
    ],
  },
  {
    id: "onedrive",
    name: "OneDrive",
    description: "Gedeelde bestanden en mappen",
    icon: <Folder className="w-8 h-8 text-[#0078D4]" />,
    fileCount: 0,
    files: [],
    url: "https://onedrive.live.com/?view=0",
  },
];

function getFileIcon(type: string) {
  switch (type) {
    case "pdf":
      return <FileText className="w-4 h-4 text-red-500" />;
    case "excel":
      return <FileText className="w-4 h-4 text-green-600" />;
    case "word":
      return <FileText className="w-4 h-4 text-blue-600" />;
    case "image":
      return <FileImage className="w-4 h-4 text-blue-500" />;
    default:
      return <File className="w-4 h-4 text-gray-500" />;
  }
}

function DocumentFile({ file }: { file: DocumentFile }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-white transition-all">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {getFileIcon(file.type)}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </p>
          <p className="text-xs text-gray-600">{file.size}</p>
        </div>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="text-green-600 hover:text-green-700 hover:bg-green-50 flex-shrink-0 ml-2"
      >
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
}

interface AutomationCard {
  id: string;
  title: string;
  description?: string;
  status?: string;
  detail?: string;
  icon: React.ReactNode;
}

function AutomationCardComponent({
  automation,
}: {
  automation: AutomationCard;
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-green-50 rounded-lg">{automation.icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {automation.title}
          </h3>
          {automation.description && (
            <p className="text-sm text-gray-600 mt-1">
              {automation.description}
            </p>
          )}
        </div>
      </div>

      {automation.status && (
        <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-3">
          <CheckCircle className="w-4 h-4" />
          {automation.status}
        </div>
      )}

      {automation.detail && (
        <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
          {automation.detail}
        </p>
      )}
    </div>
  );
}

function FolderCard({
  folder,
  onOpen,
}: {
  folder: DocumentFolder;
  onOpen: (folderId: string) => void;
}) {
  const cardContent = (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gray-100 group-hover:bg-green-50 rounded-lg transition-colors">
          {folder.icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
        {folder.name}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{folder.description}</p>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {folder.fileCount} bestand{folder.fileCount !== 1 ? "en" : ""}
        </span>
        <span className="text-green-600 font-medium text-sm">Open →</span>
      </div>
    </>
  );

  if (folder.url) {
    return (
      <a
        href={folder.url}
        target="_blank"
        rel="noopener noreferrer"
        className="p-6 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all text-left group block"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <button
      onClick={() => onOpen(folder.id)}
      className="p-6 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all text-left group"
    >
      {cardContent}
    </button>
  );
}

const automations: AutomationCard[] = [
  {
    id: "1",
    title: "N-schijf → OneDrive (Sync actief)",
    detail: "Laatste update: 14 nov 2025, 10:22",
    icon: <Cloud className="w-6 h-6 text-blue-600" />,
  },
  {
    id: "2",
    title: "Nieuwe documenten verplaatsen naar projectmappen",
    status: "Status: Actief ✅",
    icon: <Folder className="w-6 h-6 text-green-600" />,
  },
  {
    id: "3",
    title: "Dashboardmelding bij nieuw bestand",
    detail:
      "Voorbeeld: Offerte_VanDerMeer.pdf toegevoegd aan Project Tuin Noord",
    icon: <Bell className="w-6 h-6 text-orange-600" />,
  },
];

export default function DocumentCenter() {
  const [openFolderId, setOpenFolderId] = useState<string | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const {
    documents: airtableDocuments,
    isLoading: airtableLoading,
    error: airtableError,
  } = useAirtableDocuments();

  const openFolder = folders.find((f) => f.id === openFolderId);

  if (openFolder) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setOpenFolderId(null)}
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Terug naar mappen</span>
        </button>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            <FolderOpen className="w-8 h-8 text-blue-500" />
            {openFolder.name}
          </h1>
          <p className="text-gray-600">{openFolder.description}</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-3">
            {openFolder.files.map((file) => (
              <DocumentFile key={file.id} file={file} />
            ))}
          </div>
        </div>

        <Button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          📤 Bestand uploaden naar {openFolder.name}
        </Button>

        {showUploadForm && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Nieuw document uploaden
            </h3>
            <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center mb-4">
              <p className="text-gray-600 mb-2">
                Sleep een bestand hiernaartoe of klik om te selecteren
              </p>
              <input type="file" className="hidden" id="fileInput" />
              <label
                htmlFor="fileInput"
                className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
              >
                Bestand selecteren
              </label>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowUploadForm(false)}
              className="w-full"
            >
              Annuleren
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          📂 Documenten
        </h1>
      </div>

      {process.env.NODE_ENV === "development" && (
        <pre
          style={{
            padding: 10,
            background: "#f5f5f5",
            borderRadius: 6,
            fontSize: "12px",
            overflow: "auto",
            maxHeight: "200px",
          }}
        >
          {airtableLoading
            ? "Loading Airtable…"
            : airtableError
              ? "Error: " + airtableError
              : JSON.stringify(airtableDocuments, null, 2)}
        </pre>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Snelle toegang</h2>
        <OneDriveCard />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Documentmappen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              onOpen={() => setOpenFolderId(folder.id)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Automatisch ingelezen bestanden (OneDrive → Airtable)
        </h2>
        <div className="bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all p-6">
          <iframe
            className="airtable-embed"
            src="https://airtable.com/embed/appHSB36SlsZqJkAi/shrLMiWPAicxPzSdM"
            frameBorder="0"
            width="100%"
            height="533"
            style={{
              background: "white",
              borderRadius: "12px",
              border: "1px solid #eee",
            }}
          />
        </div>
      </div>

      {airtableDocuments.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Bestanden uit Airtable
          </h2>
          {airtableError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
              Fout bij laden van Airtable-bestanden: {airtableError}
            </div>
          )}
          {airtableLoading && (
            <div className="text-center py-8 text-gray-600">
              Bestanden laden...
            </div>
          )}
          {!airtableLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {airtableDocuments.map((doc) => (
                <AirtableDocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          )}
        </div>
      )}

      <Button
        onClick={() => setShowUploadForm(!showUploadForm)}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
      >
        <Upload className="w-5 h-5" />
        📤 Nieuw document uploaden
      </Button>

      {showUploadForm && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nieuw document uploaden
          </h3>
          <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center mb-4">
            <p className="text-gray-600 mb-2">
              Sleep een bestand hiernaartoe of klik om te selecteren
            </p>
            <input type="file" className="hidden" id="fileInput" />
            <label
              htmlFor="fileInput"
              className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
            >
              Bestand selecteren
            </label>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setShowUploadForm(false)}
            >
              Sluiten
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
