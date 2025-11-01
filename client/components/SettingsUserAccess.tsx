import { Users } from "lucide-react";

interface RolePermission {
  role: string;
  projecten: string;
  planning: string;
  documenten: string;
  berichten: string;
}

const rolePermissions: RolePermission[] = [
  {
    role: "Directie",
    projecten: "Bekijken, Bewerken",
    planning: "Bekijken, Bewerken",
    documenten: "Bekijken, Bewerken",
    berichten: "Bekijken, Bewerken",
  },
  {
    role: "Projectleider",
    projecten: "Bekijken, Bewerken",
    planning: "Bekijken, Bewerken",
    documenten: "Bekijken, Bewerken",
    berichten: "Bekijken",
  },
  {
    role: "Uitvoering",
    projecten: "Bekijken",
    planning: "Bekijken",
    documenten: "Bekijken",
    berichten: "Bekijken",
  },
  {
    role: "HR",
    projecten: "Geen toegang",
    planning: "Geen toegang",
    documenten: "Bekijken",
    berichten: "Bekijken, Bewerken",
  },
];

export default function SettingsUserAccess() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          👥 Gebruikers & Toegangsrechten
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-200 bg-green-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Rol
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Projecten
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Planning
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Documenten
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Berichten
              </th>
            </tr>
          </thead>
          <tbody>
            {rolePermissions.map((role, index) => (
              <tr
                key={role.role}
                className={`border-b border-gray-100 hover:bg-green-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-3 px-4 font-medium text-gray-900">
                  {role.role}
                </td>
                <td className="py-3 px-4 text-gray-700 text-xs sm:text-sm">
                  {role.projecten}
                </td>
                <td className="py-3 px-4 text-gray-700 text-xs sm:text-sm">
                  {role.planning}
                </td>
                <td className="py-3 px-4 text-gray-700 text-xs sm:text-sm">
                  {role.documenten}
                </td>
                <td className="py-3 px-4 text-gray-700 text-xs sm:text-sm">
                  {role.berichten}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
