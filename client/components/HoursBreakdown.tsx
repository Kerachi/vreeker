import { useState, useEffect, useMemo } from "react";
import { ChevronDown, X } from "lucide-react";

interface HourEntry {
  id: string;
  medewerker: string;
  project: string;
  datum: string;
  gewerkte_uren: number;
  omschrijving: string;
  week: number;
}

interface LogEntry {
  timestamp: string;
  manager: string;
  medewerker: string;
  project: string;
  newStatus: StatusType;
}

type StatusType = "goedgekeurd" | "in-afwachting" | "afgekeurd";
type Role = "medewerker" | "manager";

interface HoursBreakdownProps {
  currentRole?: Role;
}

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
    week: 44,
  },
  {
    id: "2",
    medewerker: "Johan",
    project: "Aanleg Herdenkingstuin",
    datum: "29 okt 2025",
    gewerkte_uren: 7.0,
    omschrijving: "Grondwerk + materiaalcontrole",
    week: 44,
  },
  {
    id: "3",
    medewerker: "Peter",
    project: "Tuinonderhoud Crematorium West",
    datum: "30 okt 2025",
    gewerkte_uren: 8.0,
    omschrijving: "Snoeiwerk + rapportage",
    week: 44,
  },
  {
    id: "4",
    medewerker: "Daan",
    project: "Oprit Bestrating",
    datum: "30 okt 2025",
    gewerkte_uren: 6.0,
    omschrijving: "Steenvervanging en afronding",
    week: 44,
  },
  {
    id: "5",
    medewerker: "Fleur",
    project: "Administratie HR",
    datum: "31 okt 2025",
    gewerkte_uren: 7.0,
    omschrijving: "Documentbeheer + personeelsplanning",
    week: 44,
  },
  {
    id: "6",
    medewerker: "Mark",
    project: "Hoflaan Renovatie",
    datum: "31 okt 2025",
    gewerkte_uren: 8.0,
    omschrijving: "Eindcontrole + evaluatie klant",
    week: 44,
  },
];

const totalHours = hoursData.reduce(
  (sum, entry) => sum + entry.gewerkte_uren,
  0,
);

export default function HoursBreakdown({ currentRole = "medewerker" }: HoursBreakdownProps) {
  const [statuses, setStatuses] = useState<Record<string, StatusType>>(() => {
    const saved = localStorage.getItem("hours_statuses");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      "1": "goedgekeurd",
      "2": "goedgekeurd",
      "3": "in-afwachting",
      "4": "in-afwachting",
      "5": "afgekeurd",
      "6": "goedgekeurd",
    };
  });

  const [logs, setLogs] = useState<LogEntry[]>(() => {
    const saved = localStorage.getItem("hours_logs");
    return saved ? JSON.parse(saved) : [];
  });

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [filterMedewerker, setFilterMedewerker] = useState<string>("");
  const [filterProject, setFilterProject] = useState<string>("");
  const [filterWeek, setFilterWeek] = useState<string>("");

  const canEditStatus = currentRole === "manager";

  // Extract unique values for filters
  const uniqueMedewerkers = useMemo(
    () => Array.from(new Set(hoursData.map((h) => h.medewerker))).sort(),
    []
  );
  const uniqueProjects = useMemo(
    () => Array.from(new Set(hoursData.map((h) => h.project))).sort(),
    []
  );
  const uniqueWeeks = useMemo(
    () => Array.from(new Set(hoursData.map((h) => h.week))).sort((a, b) => b - a),
    []
  );

  // Filter data based on selections
  const filteredHoursData = useMemo(() => {
    return hoursData.filter((entry) => {
      const matchesMedewerker = !filterMedewerker || entry.medewerker === filterMedewerker;
      const matchesProject = !filterProject || entry.project === filterProject;
      const matchesWeek = !filterWeek || entry.week.toString() === filterWeek;

      return matchesMedewerker && matchesProject && matchesWeek;
    });
  }, [filterMedewerker, filterProject, filterWeek]);

  const filteredTotalHours = useMemo(
    () => filteredHoursData.reduce((sum, entry) => sum + entry.gewerkte_uren, 0),
    [filteredHoursData]
  );

  const hasActiveFilters =
    filterMedewerker || filterProject || filterWeek;

  useEffect(() => {
    localStorage.setItem("hours_statuses", JSON.stringify(statuses));
  }, [statuses]);

  useEffect(() => {
    localStorage.setItem("hours_logs", JSON.stringify(logs));
  }, [logs]);

  const handleStatusChange = (entryId: string, newStatus: StatusType) => {
    const entry = hoursData.find((e) => e.id === entryId);
    if (entry && canEditStatus) {
      setStatuses((prev) => ({
        ...prev,
        [entryId]: newStatus,
      }));

      const now = new Date();
      const timestamp = now.toLocaleTimeString("nl-NL", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const logEntry: LogEntry = {
        timestamp,
        manager: "Antoon",
        medewerker: entry.medewerker,
        project: entry.project,
        newStatus,
      };

      setLogs((prev) => [logEntry, ...prev]);
      setOpenDropdown(null);
    }
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
        🕓 Urenoverzicht – detail van deze week ({filteredTotalHours.toFixed(1)} uur)
      </h2>

      {canEditStatus ? (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <span className="font-semibold">Manager view:</span> Klik op statussen om deze aan te passen.
        </div>
      ) : (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700">
          <span className="font-semibold">Medewerker view:</span> Statussen kunnen alleen door manager gewijzigd worden.
        </div>
      )}

      {/* Filter Dropdowns */}
      <div className="mb-6 flex flex-wrap gap-3 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medewerker
          </label>
          <select
            value={filterMedewerker}
            onChange={(e) => setFilterMedewerker(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-green-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
          >
            <option value="">Alle medewerkers</option>
            {uniqueMedewerkers.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project
          </label>
          <select
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-green-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
          >
            <option value="">Alle projecten</option>
            {uniqueProjects.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Week
          </label>
          <select
            value={filterWeek}
            onChange={(e) => setFilterWeek(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white hover:border-green-300 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
          >
            <option value="">Alle weken</option>
            {uniqueWeeks.map((w) => (
              <option key={w} value={w}>
                Week {w}
              </option>
            ))}
          </select>
        </div>

        {hasActiveFilters && (
          <button
            onClick={() => {
              setFilterMedewerker("");
              setFilterProject("");
              setFilterWeek("");
            }}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Wissen
          </button>
        )}
      </div>

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
                    <div
                      className="relative inline-block"
                      onMouseEnter={() => !canEditStatus && setHoveredRow(entry.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <button
                        onClick={() => {
                          if (canEditStatus) {
                            setOpenDropdown(
                              openDropdown === entry.id ? null : entry.id
                            );
                          }
                        }}
                        disabled={!canEditStatus}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold transition-all ${statusInfo.bgColor} ${statusInfo.textColor} ${
                          canEditStatus
                            ? "cursor-pointer hover:shadow-md"
                            : "cursor-not-allowed opacity-75"
                        }`}
                      >
                        {statusInfo.label}
                        {canEditStatus && (
                          <ChevronDown className="w-3 h-3" />
                        )}
                      </button>

                      {!canEditStatus && hoveredRow === entry.id && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap z-20 pointer-events-none">
                          Alleen manager kan status wijzigen
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                        </div>
                      )}

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
            {hasActiveFilters ? "Gefilterde" : "Totaal"} gewerkte uren:
          </span>
          <span className="text-2xl font-bold text-green-700">
            {filteredTotalHours.toFixed(1)} uur
          </span>
        </div>
        {hasActiveFilters && (
          <p className="text-sm text-gray-600 mt-2">
            Weergeven voor: {filterMedewerker && `${filterMedewerker}, `}
            {filterProject && `${filterProject}, `}
            {filterWeek && `Week ${filterWeek}`}
          </p>
        )}
      </div>

      {/* Change Log Section */}
      {logs.length > 0 && (
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            📋 Wijzigingslog
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700"
              >
                <span className="font-mono text-xs text-gray-500 min-w-fit">
                  {log.timestamp}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="font-semibold text-gray-900">
                    {log.manager}
                  </span>{" "}
                  wijzigde status van{" "}
                  <span className="font-semibold text-gray-900">
                    {log.medewerker}
                  </span>{" "}
                  –{" "}
                  <span className="text-gray-600">
                    {log.project}
                  </span>{" "}
                  naar{" "}
                  <span className={`font-semibold ${
                    log.newStatus === "goedgekeurd"
                      ? "text-green-700"
                      : log.newStatus === "in-afwachting"
                        ? "text-yellow-700"
                        : "text-red-700"
                  }`}>
                    {statusConfig[log.newStatus].label}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
