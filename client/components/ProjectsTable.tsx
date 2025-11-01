import { Clock, AlertCircle, CheckCircle } from "lucide-react";

interface Project {
  id: string;
  name: string;
  client: string;
  status: "in-progress" | "busy" | "pending";
  responsible: string;
  lastUpdate: string;
}

const statusConfig = {
  "in-progress": {
    label: "🟢 In uitvoering",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  busy: {
    label: "🟡 Bezig",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
    icon: <Clock className="w-4 h-4" />,
  },
  pending: {
    label: "🔵 Nog te starten",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    icon: <AlertCircle className="w-4 h-4" />,
  },
};

const projectsData: Project[] = [
  {
    id: "1",
    name: "Hoflaan Renovatie",
    client: "Fam. de Jong",
    status: "in-progress",
    responsible: "Peter van Dijk",
    lastUpdate: "Vandaag 14:30",
  },
  {
    id: "2",
    name: "Begraafplaats Hoorn",
    client: "Gemeente Hoorn",
    status: "busy",
    responsible: "Jan Pieterse",
    lastUpdate: "Gisteren 10:15",
  },
  {
    id: "3",
    name: "Gazon aanleg De Jong",
    client: "Fam. De Jong",
    status: "in-progress",
    responsible: "Maria Garcia",
    lastUpdate: "Vandaag 09:45",
  },
  {
    id: "4",
    name: "Voortuin Kerklaan",
    client: "Dhr. & Mevr. Bakker",
    status: "pending",
    responsible: "Anna Kowalski",
    lastUpdate: "3 dagen geleden",
  },
];

export default function ProjectsTable() {
  const getStatusStats = () => {
    return {
      inProgress: projectsData.filter((p) => p.status === "in-progress").length,
      busy: projectsData.filter((p) => p.status === "busy").length,
      pending: projectsData.filter((p) => p.status === "pending").length,
    };
  };

  const stats = getStatusStats();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          🏗️ Lopende projecten
        </h2>
        <p className="text-gray-600 mt-2">
          Actieve en geplande werkzaamheden bij Vreeker BV
        </p>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-200 bg-green-50">
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Project
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Klant
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Status
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Verantwoordelijke
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Laatste update
              </th>
            </tr>
          </thead>
          <tbody>
            {projectsData.map((project, index) => {
              const config = statusConfig[project.status];
              return (
                <tr
                  key={project.id}
                  className={`border-b border-gray-100 hover:bg-green-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-4 px-4 text-gray-900 font-medium">
                    {project.name}
                  </td>
                  <td className="py-4 px-4 text-gray-700">{project.client}</td>
                  <td className="py-4 px-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} w-fit`}
                    >
                      {config.label}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700">
                        {project.responsible
                          .split(" ")
                          .map((word) => word.charAt(0))
                          .join("")}
                      </div>
                      <span className="text-gray-700">{project.responsible}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-xs sm:text-sm">
                    {project.lastUpdate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <p className="text-xs text-gray-600 font-medium mb-1">In uitvoering</p>
          <p className="text-2xl font-bold text-green-700">{stats.inProgress}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
          <p className="text-xs text-gray-600 font-medium mb-1">Bezig</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.busy}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-xs text-gray-600 font-medium mb-1">Nog te starten</p>
          <p className="text-2xl font-bold text-blue-700">{stats.pending}</p>
        </div>
      </div>
    </div>
  );
}
