import { useEffect, useState } from "react";
import { Clock, X, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  status: "clocked_in" | "clocked_out";
  todayHours: number;
  weekHours: number;
  projects?: string[];
}

interface DayEntry {
  date: string;
  hoursWorked: number;
  projects: string[];
  clockInTime?: string;
  clockOutTime?: string;
}

interface EmployeeDetail {
  id: string;
  name: string;
  totalWeekHours: number;
  entries: DayEntry[];
}

export default function ClockinPersonnelOverview() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [detailData, setDetailData] = useState<EmployeeDetail | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchClockInData = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const response = await fetch("/api/clockin/hours", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Clockin data");
        }

        const result = await response.json();
        if (result.success && result.data) {
          setEmployees(result.data);
        } else {
          setHasError(true);
          toast({
            title: "Fout",
            description:
              "Clockin gegevens konden niet geladen worden. Probeer het later opnieuw.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching Clockin data:", error);
        setHasError(true);
        toast({
          title: "Fout",
          description:
            "Clockin gegevens konden niet geladen worden. Probeer het later opnieuw.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClockInData();
  }, [toast]);

  const handleRowClick = async (employeeId: string) => {
    setSelectedEmployee(employeeId);
    setIsDetailLoading(true);
    try {
      const response = await fetch(`/api/clockin/hours/${employeeId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch employee detail");
      }

      const result = await response.json();
      if (result.success && result.data) {
        setDetailData({
          id: result.data.id,
          name: result.data.name,
          totalWeekHours: result.data.hours_this_week || 0,
          entries: (result.data.entries || []).map((entry: any) => ({
            date: entry.date,
            hoursWorked: entry.hours || 0,
            projects: entry.projects || [],
            clockInTime: entry.clock_in_time,
            clockOutTime: entry.clock_out_time,
          })),
        });
      } else {
        toast({
          title: "Fout",
          description: "Werknemerdetails konden niet geladen worden.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching employee detail:", error);
      toast({
        title: "Fout",
        description: "Werknemerdetails konden niet geladen worden.",
        variant: "destructive",
      });
    } finally {
      setIsDetailLoading(false);
    }
  };

  const closeDetail = () => {
    setSelectedEmployee(null);
    setDetailData(null);
  };

  return (
    <div className="relative">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Uren &amp; aanwezigheid
          </h2>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500">Uren worden geladen…</p>
          </div>
        )}

        {hasError && !isLoading && (
          <div className="flex items-center justify-center py-8 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-600">
              Clockin gegevens konden niet geladen worden. Probeer het later
              opnieuw.
            </p>
          </div>
        )}

        {!isLoading && !hasError && employees.length === 0 && (
          <div className="flex items-center justify-center py-8">
            <p className="text-gray-500">Geen medewerkers gevonden.</p>
          </div>
        )}

        {!isLoading && !hasError && employees.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 text-sm">
                    Medewerker
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 text-sm">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 text-sm">
                    Uren vandaag
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 text-sm">
                    Uren deze week
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-900 text-sm">
                    Project(en) vandaag
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr
                    key={employee.id}
                    onClick={() => handleRowClick(employee.id)}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {employee.name}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            employee.status === "clocked_in"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        />
                        <span className="text-gray-700">
                          {employee.status === "clocked_in"
                            ? "Ingeklokt"
                            : "Niet ingeklokt"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {employee.todayHours.toFixed(1)}h
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {employee.weekHours.toFixed(1)}h
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {employee.projects && employee.projects.length > 0
                        ? employee.projects.join(", ")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 transition-opacity"
            onClick={closeDetail}
          />

          {/* Side Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-2xl bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={closeDetail}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Terug</span>
                </button>
                <button
                  onClick={closeDetail}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {isDetailLoading && (
                <div className="flex items-center justify-center py-8">
                  <p className="text-gray-500">Details worden geladen…</p>
                </div>
              )}

              {!isDetailLoading && detailData && (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {detailData.name}
                    </h2>
                    <p className="text-gray-600">
                      Totaal uren deze week:{" "}
                      <span className="font-semibold">
                        {detailData.totalWeekHours.toFixed(1)}h
                      </span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      Voorbije 7 dagen
                    </h3>
                    {detailData.entries.length === 0 ? (
                      <p className="text-gray-500 text-sm">
                        Geen uren geregistreerd voor deze periode.
                      </p>
                    ) : (
                      detailData.entries.map((entry, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-medium text-gray-900">
                                {new Date(entry.date).toLocaleDateString(
                                  "nl-NL",
                                  {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  },
                                )}
                              </p>
                              <p className="text-sm text-gray-600">
                                {entry.clockInTime || "-"} tot{" "}
                                {entry.clockOutTime || "-"}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                {entry.hoursWorked.toFixed(1)}h
                              </p>
                            </div>
                          </div>
                          {entry.projects.length > 0 && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Projecten:</span>{" "}
                              {entry.projects.join(", ")}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
