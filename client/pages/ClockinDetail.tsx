import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { ArrowLeft, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

export default function ClockinDetail() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [employee, setEmployee] = useState<EmployeeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      if (!employeeId) return;

      try {
        setIsLoading(true);
        setHasError(false);
        const response = await fetch(`/api/clockin/hours/${employeeId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch employee details");
        }

        const result = await response.json();
        if (result.success && result.data) {
          setEmployee({
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
          setHasError(true);
          toast({
            title: "Fout",
            description: "Employee details kon niet geladen worden.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching employee detail:", error);
        setHasError(true);
        toast({
          title: "Fout",
          description: "Employee details kon niet geladen worden.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeDetail();
  }, [employeeId, toast]);

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Terug naar overzicht
        </button>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Details worden geladen…</p>
          </div>
        )}

        {hasError && !isLoading && (
          <div className="flex items-center justify-center py-12">
            <p className="text-red-500">
              Employee details kon niet geladen worden.
            </p>
          </div>
        )}

        {!isLoading && !hasError && employee && (
          <>
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-6 h-6 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">
                  {employee.name}
                </h1>
              </div>
              <p className="text-gray-600">
                Uren deze week:{" "}
                <span className="font-semibold">
                  {employee.totalWeekHours.toFixed(1)}h
                </span>
              </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">
                        Datum
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">
                        Uren
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">
                        Ingeklokt
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">
                        Uitgeklokt
                      </th>
                      <th className="px-6 py-3 text-left font-semibold text-gray-900 text-sm">
                        Projecten
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employee.entries.map((entry, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-3 text-sm text-gray-900 font-medium">
                          {new Date(entry.date).toLocaleDateString("nl-NL", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700 font-semibold">
                          {entry.hoursWorked.toFixed(1)}h
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {entry.clockInTime || "-"}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {entry.clockOutTime || "-"}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-700">
                          {entry.projects.length > 0
                            ? entry.projects.join(", ")
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {employee.entries.length === 0 && (
                <div className="flex items-center justify-center py-8">
                  <p className="text-gray-500">
                    Geen uren geregistreerd voor deze medewerker.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
