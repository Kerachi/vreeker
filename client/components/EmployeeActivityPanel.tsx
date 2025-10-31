import { Upload, FileText, CheckCircle } from "lucide-react";

interface ActivityRecord {
  id: string;
  employee: string;
  action: string;
  project: string;
  type: "document" | "update" | "completion";
  timestamp: string;
}

const activities: ActivityRecord[] = [
  {
    id: "1",
    employee: "Peter van Dijk",
    action: "Document geüpload",
    project: "Achtertuin Renovatie",
    type: "document",
    timestamp: "Vandaag 14:32",
  },
  {
    id: "2",
    employee: "Maria Garcia",
    action: "Project bijgewerkt",
    project: "Gazon Aanleg",
    type: "update",
    timestamp: "Vandaag 10:15",
  },
  {
    id: "3",
    employee: "Jan Pieterse",
    action: "Project voltooid",
    project: "Boomverzorging",
    type: "completion",
    timestamp: "Gisteren 16:45",
  },
  {
    id: "4",
    employee: "Anna Kowalski",
    action: "Document geüpload",
    project: "Terras Aanleg",
    type: "document",
    timestamp: "Gisteren 11:20",
  },
  {
    id: "5",
    employee: "Marco Rossi",
    action: "Project bijgewerkt",
    project: "Haagschaar",
    type: "update",
    timestamp: "2 dagen geleden",
  },
];

function getActionIcon(type: string) {
  switch (type) {
    case "document":
      return <Upload className="w-4 h-4 text-blue-600" />;
    case "completion":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    default:
      return <FileText className="w-4 h-4 text-gray-600" />;
  }
}

export default function EmployeeActivityPanel() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Medewerkeractiviteit</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Medewerker
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Actie
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Project
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Moment
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr
                key={activity.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700">
                      {activity.employee.charAt(0)}
                    </div>
                    <span className="text-gray-900 font-medium">
                      {activity.employee}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {getActionIcon(activity.type)}
                    <span className="text-gray-700">{activity.action}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{activity.project}</td>
                <td className="py-3 px-4 text-gray-600 text-xs">
                  {activity.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
