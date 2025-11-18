import { CheckCircle, Clock, AlertCircle } from "lucide-react";

interface ProjectCardProps {
  id: string;
  name: string;
  client: string;
  status: "completed" | "in-progress" | "pending";
  responsible: string;
  progress?: number;
}

const statusConfig = {
  completed: {
    label: "Voltooid",
    icon: <CheckCircle className="w-4 h-4" />,
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    badgeColor: "bg-green-100",
  },
  "in-progress": {
    label: "In uitvoering",
    icon: <Clock className="w-4 h-4" />,
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    badgeColor: "bg-blue-100",
  },
  pending: {
    label: "In afwachting",
    icon: <AlertCircle className="w-4 h-4" />,
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    badgeColor: "bg-amber-100",
  },
};

export default function ProjectCard({
  name,
  client,
  status,
  responsible,
  progress = 0,
}: ProjectCardProps) {
  const config = statusConfig[status];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="mb-3">
        <h3 className="font-semibold text-gray-900 text-lg">{name}</h3>
        <p className="text-sm text-gray-600">{client}</p>
      </div>

      {progress > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600">Voortgang</span>
            <span className="text-xs font-medium text-gray-900">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          <span className="font-medium text-gray-900">Verantwoordelijke:</span> {responsible}
        </p>
      </div>
    </div>
  );
}
