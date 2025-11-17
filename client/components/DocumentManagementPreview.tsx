import { FileText, Download, Lock, Clock, Archive, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  status: "completed" | "in-review" | "archived";
  size: string;
}

const sampleDocuments: Document[] = [
  {
    id: "1",
    name: "Offerte Hoflaan 2024",
    type: "PDF",
    date: "12 jan 2024",
    status: "completed",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Contract klant De Jong",
    type: "DOCX",
    date: "8 jan 2024",
    status: "in-review",
    size: "1.2 MB",
  },
  {
    id: "3",
    name: "Budget 2024",
    type: "XLS",
    date: "5 jan 2024",
    status: "completed",
    size: "0.8 MB",
  },
];

const statusConfig = {
  completed: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
    label: "Afgerond",
  },
  "in-review": {
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: <Clock className="w-4 h-4 text-amber-600" />,
    label: "In review",
  },
  archived: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    icon: <Archive className="w-4 h-4 text-gray-600" />,
    label: "Gearchiveerd",
  },
};

export default function DocumentManagementPreview() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          Documenten Beheer
        </h2>
        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 rounded-full border border-blue-200">
          <span className="text-xs font-medium text-blue-700">Preview</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {sampleDocuments.map((doc) => {
          const config = statusConfig[doc.status];
          return (
            <div
              key={doc.id}
              className={`rounded-lg p-3 border ${config.bg} ${config.border} hover:shadow-sm transition-all`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 pt-0.5">{config.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {doc.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="bg-white px-1.5 py-0.5 rounded">
                      {doc.type}
                    </span>
                    <span>•</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
                <button className="flex-shrink-0 p-1 hover:bg-white rounded transition-colors">
                  <Download className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <a
          href="/documenten"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          <Lock className="w-4 h-4" />
          Naar Documenten Beheer →
        </a>
      </div>
    </div>
  );
}
