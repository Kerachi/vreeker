import { MapPin, Calendar, CheckCircle, Clock } from "lucide-react";

interface Project {
  id: string;
  name: string;
  address: string;
  status: "in-progress" | "completed" | "pending";
  completionDate: string;
}

const statusConfig = {
  "in-progress": {
    label: "In uitvoering",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    badgeColor: "bg-blue-100",
    icon: <Clock className="w-4 h-4" />,
  },
  completed: {
    label: "Afgerond",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    badgeColor: "bg-green-100",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  pending: {
    label: "Gepland",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    badgeColor: "bg-amber-100",
    icon: <Calendar className="w-4 h-4" />,
  },
};

interface ProjectOverviewProps {
  projects: Project[];
}

export default function ProjectOverview({ projects }: ProjectOverviewProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Uw projectstatus</h2>

      <div className="space-y-4">
        {projects.map((project) => {
          const config = statusConfig[project.status];
          return (
            <div
              key={project.id}
              className={`rounded-lg p-5 ${config.bgColor} border border-gray-200`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4" />
                    {project.address}
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.badgeColor}`}
                >
                  {config.icon}
                  <span className={`text-xs font-medium ${config.textColor}`}>
                    {config.label}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm pt-3 border-t border-gray-200">
                <Calendar className="w-4 h-4 text-gray-600" />
                <span className="text-gray-700">
                  <span className="font-medium">Verwachte voltooiing:</span> {project.completionDate}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
