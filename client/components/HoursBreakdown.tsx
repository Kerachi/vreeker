import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface HourEntry {
  id: string;
  medewerker: string;
  project: string;
  datum: string;
  gewerkte_uren: number;
  omschrijving: string;
}

type StatusType = "goedgekeurd" | "in-afwachting" | "afgekeurd";

const statusConfig = {
  goedgekeurd: {
    label: "✓ Goedgekeurd",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    borderColor: "border-green-200",
  },
  "in-afwachting": {
    label: "⏳ In afwachting",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
    borderColor: "border-yellow-200",
  },
  afgekeurd: {
    label: "✗ Afgekeurd",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
    borderColor: "border-red-200",
  },
};

const statusCycle: StatusType[] = ["goedgekeurd", "in-afwachting", "afgekeurd"];

const hoursData: HourEntry[] = [
  {
    id: "1",
    medewerker: "Mark",
    project: "Hoflaan Renovatie",
    datum: "28 okt 2025",
    gewerkte_uren: 6.5,
    omschrijving: "Werkvoorbereiding + overleg klant",
  },
  {
    id: "2",
    medewerker: "Johan",
    project: "Aanleg Herdenkingstuin",
    datum: "29 okt 2025",
    gewerkte_uren: 7.0,
    omschrijving: "Grondwerk + materiaalcontrole",
  },
  {
    id: "3",
    medewerker: "Peter",
    project: "Tuinonderhoud Crematorium West",
    datum: "30 okt 2025",
    gewerkte_uren: 8.0,
    omschrijving: "Snoeiwerk + rapportage",
  },
  {
    id: "4",
    medewerker: "Daan",
    project: "Oprit Bestrating",
    datum: "30 okt 2025",
    gewerkte_uren: 6.0,
    omschrijving: "Steenvervanging en afronding",
  },
  {
    id: "5",
    medewerker: "Fleur",
    project: "Administratie HR",
    datum: "31 okt 2025",
    gewerkte_uren: 7.0,
    omschrijving: "Documentbeheer + personeelsplanning",
  },
  {
    id: "6",
    medewerker: "Mark",
    project: "Hoflaan Renovatie",
    datum: "31 okt 2025",
    gewerkte_uren: 8.0,
    omschrijving: "Eindcontrole + evaluatie klant",
  },
];

const totalHours = hoursData.reduce(
  (sum, entry) => sum + entry.gewerkte_uren,
  0,
);

// Mock current user - in a real app, this would come from auth/context
const getCurrentUser = () => {
  // Simulate Antoon as the logged-in user for this session
  return {
    name: "Antoon",
    role: "manager",
  };
};

const isManagerRole = (role: string) => role === "manager";

export default function HoursBreakdown() {
  const [statuses, setStatuses] = useState<Record<string, StatusType>>({
    "1": "goedgekeurd",
    "2": "goedgekeurd",
    "3": "in-afwachting",
    "4": "in-afwachting",
    "5": "afgekeurd",
    "6": "goedgekeurd",
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const currentUser = getCurrentUser();
  const canEditStatus = isManagerRole(currentUser.role);

  const handleStatusChange = (entryId: string, newStatus: StatusType) => {
    setStatuses((prev) => ({
      ...prev,
      [entryId]: newStatus,
    }));
    setOpenDropdown(null);
  };

  const toggleStatus = (entryId: string) => {
    if (!canEditStatus) return;
    const currentStatus = statuses[entryId];
    const currentIndex = statusCycle.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusCycle.length;
    const nextStatus = statusCycle[nextIndex];
    handleStatusChange(entryId, nextStatus);
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        🕓 Urenoverzicht – detail van deze week ({totalHours.toFixed(1)} uur)
      </h2>

      {canEditStatus && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <span className="font-semibold">Manager view:</span> Klik op statussen om deze aan te passen.
        </div>
      )}

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-200 bg-green-50">
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Medewerker
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Project
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Datum
              </th>
              <th className="text-right py-4 px-4 font-semibold text-gray-900">
                Gewerkte uren
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Omschrijving
              </th>
              <th className="text-center py-4 px-4 font-semibold text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {hoursData.map((entry, index) => {
              const status = statuses[entry.id];
              const statusInfo = statusConfig[status];
              return (
                <tr
                  key={entry.id}
                  className={`border-b border-gray-100 hover:bg-green-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-4 px-4 text-gray-900 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700">
                        {entry.medewerker.charAt(0)}
                      </div>
                      <span>{entry.medewerker}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{entry.project}</td>
                  <td className="py-4 px-4 text-gray-700">{entry.datum}</td>
                  <td className="py-4 px-4 text-right">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 min-w-24">
                      {entry.gewerkte_uren.toFixed(1)} uur
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-700 text-xs sm:text-sm">
                    {entry.omschrijving}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="relative inline-block">
                      <button
                        onClick={() => {
                          if (canEditStatus) {
                            setOpenDropdown(
                              openDropdown === entry.id ? null : entry.id
                            );
                          } else {
                            toggleStatus(entry.id);
                          }
                        }}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold transition-all ${statusInfo.bgColor} ${statusInfo.textColor} ${
                          canEditStatus
                            ? "cursor-pointer hover:shadow-md"
                            : "cursor-default"
                        }`}
                      >
                        {statusInfo.label}
                        {canEditStatus && (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>

                      {canEditStatus && openDropdown === entry.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                          {statusCycle.map((statusOption) => {
                            const optionInfo = statusConfig[statusOption];
                            const isSelected = status === statusOption;
                            return (
                              <button
                                key={statusOption}
                                onClick={() =>
                                  handleStatusChange(entry.id, statusOption)
                                }
                                className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                                  isSelected
                                    ? `${optionInfo.bgColor} ${optionInfo.textColor}`
                                    : "hover:bg-gray-50 text-gray-700"
                                } ${statusOption !== "goedgekeurd" ? "border-t border-gray-100" : ""}`}
                              >
                                {optionInfo.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pt-6 border-t border-gray-200 bg-green-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            Totaal gewerkte uren deze week:
          </span>
          <span className="text-2xl font-bold text-green-700">
            {totalHours.toFixed(1)} uur
          </span>
        </div>
      </div>
    </div>
  );
}
