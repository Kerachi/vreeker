import { Clock, AlertCircle, CheckCircle, Star } from "lucide-react";

interface Project {
  id: string;
  name: string;
  client: string;
  status: "in-progress" | "busy" | "pending" | "completed";
  responsible: string;
  lastUpdate?: string;
  progress?: number;
  endDate?: string;
  rating?: number;
}

interface Task {
  id: string;
  name: string;
  project: string;
  responsible: string;
  deadline: string;
  status: "not-started" | "in-progress" | "in-review";
}

interface ProjectsTableProps {
  filter?: string | null;
}

const statusConfig = {
  "in-progress": {
    label: "🟢 In uitvoering",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  busy: {
    label: "🟡 Licht vertraagd",
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
  completed: {
    label: "✅ Voltooid",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    icon: <CheckCircle className="w-4 h-4" />,
  },
};

const taskStatusConfig = {
  "not-started": {
    label: "🔴 Nog niet gestart",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  "in-progress": {
    label: "🟡 In behandeling",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  "in-review": {
    label: "🔵 In review",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
  },
};

const activeProjectsData: Project[] = [
  {
    id: "1",
    name: "Hoflaan Renovatie",
    client: "Fam. de Boer",
    status: "in-progress",
    responsible: "Mark",
    progress: 75,
  },
  {
    id: "2",
    name: "Aanleg Herdenkingstuin",
    client: "Gemeente Hoorn",
    status: "in-progress",
    responsible: "Johan",
    progress: 60,
  },
  {
    id: "3",
    name: "Tuinonderhoud Crematorium West",
    client: "Crematorium Hoorn",
    status: "busy",
    responsible: "Peter",
    progress: 55,
  },
];

const completedProjectsData: Project[] = [
  {
    id: "4",
    name: "Terras Aanleg",
    client: "Restaurant De Tuin",
    status: "completed",
    responsible: "Mark",
    endDate: "21 okt 2025",
    rating: 4,
  },
  {
    id: "5",
    name: "Groenonderhoud Begraafplaats Oost",
    client: "Gemeente Hoorn",
    status: "completed",
    responsible: "Johan",
    endDate: "17 okt 2025",
    rating: 5,
  },
];

const tasksData: Task[] = [
  {
    id: "1",
    name: "Offerte afronden",
    project: "Hoflaan Renovatie",
    responsible: "Fleur",
    deadline: "5 nov 2025",
    status: "in-progress",
  },
  {
    id: "2",
    name: "Foto's uploaden",
    project: "Crematorium West",
    responsible: "Johan",
    deadline: "3 nov 2025",
    status: "not-started",
  },
  {
    id: "3",
    name: "Budget goedkeuring",
    project: "Aanleg Herdenkingstuin",
    responsible: "Mark",
    deadline: "7 nov 2025",
    status: "in-progress",
  },
  {
    id: "4",
    name: "Inspectie rapport",
    project: "Tuinonderhoud Crematorium West",
    responsible: "Peter",
    deadline: "2 nov 2025",
    status: "not-started",
  },
];

const renderRating = (rating: number) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

export default function ProjectsTable({ filter }: ProjectsTableProps) {
  if (filter === "active") {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-green-200 bg-green-50">
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Projectnaam
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Klant
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Verantwoordelijke
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Status
                </th>
                <th className="text-center py-4 px-4 font-semibold text-gray-900">
                  Voortgang
                </th>
              </tr>
            </thead>
            <tbody>
              {activeProjectsData.map((project, index) => {
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
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700">
                          {project.responsible.charAt(0)}
                        </div>
                        <span className="text-gray-700">{project.responsible}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} w-fit`}
                      >
                        {config.label}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-gray-900 min-w-10">
                          {project.progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (filter === "completed") {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-blue-200 bg-blue-50">
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Projectnaam
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Klant
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Verantwoordelijke
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Einddatum
                </th>
                <th className="text-center py-4 px-4 font-semibold text-gray-900">
                  Beoordeling
                </th>
              </tr>
            </thead>
            <tbody>
              {completedProjectsData.map((project, index) => (
                <tr
                  key={project.id}
                  className={`border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-4 px-4 text-gray-900 font-medium">
                    {project.name}
                  </td>
                  <td className="py-4 px-4 text-gray-700">{project.client}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-semibold text-blue-700">
                        {project.responsible.charAt(0)}
                      </div>
                      <span className="text-gray-700">{project.responsible}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{project.endDate}</td>
                  <td className="py-4 px-4 text-center">
                    {renderRating(project.rating || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (filter === "pending") {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-purple-200 bg-purple-50">
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Taak
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Project
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Verantwoordelijke
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Deadline
                </th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tasksData.map((task, index) => {
                const taskConfig = taskStatusConfig[task.status];
                return (
                  <tr
                    key={task.id}
                    className={`border-b border-gray-100 hover:bg-purple-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="py-4 px-4 text-gray-900 font-medium">
                      {task.name}
                    </td>
                    <td className="py-4 px-4 text-gray-700">{task.project}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-semibold text-purple-700">
                          {task.responsible.charAt(0)}
                        </div>
                        <span className="text-gray-700">{task.responsible}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{task.deadline}</td>
                    <td className="py-4 px-4">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${taskConfig.bgColor} ${taskConfig.textColor}`}
                      >
                        {taskConfig.label}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Default view - all projects
  const allProjects = [...activeProjectsData];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          🏗️ Alle projecten
        </h2>
        <p className="text-gray-600 mt-2">Alle werkzaamheden bij Vreeker BV</p>
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
                Verantwoordelijke
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Voortgang
              </th>
            </tr>
          </thead>
          <tbody>
            {allProjects.map((project, index) => (
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
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700">
                      {project.responsible.charAt(0)}
                    </div>
                    <span className="text-gray-700">{project.responsible}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-900">
                      {project.progress}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
