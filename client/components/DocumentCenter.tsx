import { Download, Upload, Folder, FileText, FileImage, File } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DocumentFile {
  id: string;
  name: string;
  type: "pdf" | "excel" | "image" | "other";
}

interface ProjectFolder {
  id: string;
  name: string;
  icon: string;
  files: DocumentFile[];
}

interface FolderCategory {
  id: string;
  title: string;
  projects: ProjectFolder[];
}

const documentData: FolderCategory[] = [
  {
    id: "projecten",
    title: "Projecten",
    projects: [
      {
        id: "hoflaan",
        name: "🌳 Hoflaan Renovatie",
        icon: "🌳",
        files: [
          { id: "1", name: "Offerte_Hoflaan.pdf", type: "pdf" },
          { id: "2", name: "Planning_Hoflaan.xlsx", type: "excel" },
          { id: "3", name: "Foto_voor_en_na.jpg", type: "image" },
        ],
      },
      {
        id: "begraafplaats",
        name: "🏡 Begraafplaats Hoorn",
        icon: "🏡",
        files: [
          { id: "4", name: "Offerte_Hoorn.pdf", type: "pdf" },
          { id: "5", name: "Plattegrond_Hoorn.png", type: "image" },
          { id: "6", name: "Factuur_Hoorn.pdf", type: "pdf" },
        ],
      },
    ],
  },
];

const hrDocuments: DocumentFile[] = [
  { id: "7", name: "Contracten_Medewerkers.pdf", type: "pdf" },
  { id: "8", name: "Handleiding_Dashboard.pdf", type: "pdf" },
];

const generalDocuments: DocumentFile[] = [
  { id: "9", name: "Bedrijfsbeleid_2024.pdf", type: "pdf" },
  { id: "10", name: "Veiligheid_Voorschriften.pdf", type: "pdf" },
];

function getFileIcon(type: string) {
  switch (type) {
    case "pdf":
      return <FileText className="w-4 h-4 text-red-500" />;
    case "excel":
      return <FileText className="w-4 h-4 text-green-600" />;
    case "image":
      return <FileImage className="w-4 h-4 text-blue-500" />;
    default:
      return <File className="w-4 h-4 text-gray-500" />;
  }
}

function DocumentFile({
  file,
}: {
  file: DocumentFile;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {getFileIcon(file.type)}
        <span className="text-sm text-gray-900 truncate">{file.name}</span>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="text-green-600 hover:text-green-700 hover:bg-green-50 flex-shrink-0 ml-2"
      >
        <Download className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Download</span>
      </Button>
    </div>
  );
}

function ProjectSection({
  project,
}: {
  project: ProjectFolder;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 transition-colors"
      >
        <Folder className="w-5 h-5 text-green-600" />
        <span className="font-medium text-gray-900">{project.name}</span>
        <span className="ml-auto text-xs text-gray-600">
          {project.files.length} bestand{project.files.length !== 1 ? "en" : ""}
        </span>
      </button>

      {isOpen && (
        <div className="p-4 bg-white space-y-2">
          {project.files.map((file) => (
            <DocumentFile key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DocumentCenter() {
  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          📂 Documenten – Centrale opslag
        </h1>
        <p className="text-gray-600 mt-2">
          Alle bedrijfsdocumenten, projectbestanden en administratieve gegevens op één plek.
        </p>
      </div>

      {documentData.map((category) => (
        <div key={category.id}>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {category.title}
          </h2>
          <div className="space-y-4">
            {category.projects.map((project) => (
              <ProjectSection key={project.id} project={project} />
            ))}
          </div>
        </div>
      ))}

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          HR & Administratie
        </h2>
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2">
          {hrDocuments.map((file) => (
            <DocumentFile key={file.id} file={file} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Algemene documenten
        </h2>
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2">
          {generalDocuments.map((file) => (
            <DocumentFile key={file.id} file={file} />
          ))}
        </div>
      </div>

      {showUploadForm && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nieuw document uploaden
          </h3>
          <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center mb-4">
            <p className="text-gray-600 mb-2">Sleep een bestand hiernaartoe of klik om te selecteren</p>
            <input
              type="file"
              className="hidden"
              id="fileInput"
            />
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

      <Button
        onClick={() => setShowUploadForm(!showUploadForm)}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
      >
        <Upload className="w-5 h-5" />
        📤 Nieuw document uploaden
      </Button>
    </div>
  );
}
