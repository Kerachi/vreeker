import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  status: "clocked_in" | "clocked_out";
  todayHours: number;
  weekHours: number;
  projects?: string[];
}

export default function ClockinOverview() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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
            description: "Clockin API kon niet geladen worden.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching Clockin data:", error);
        console.error("Full error details:", {
          error,
          message: error instanceof Error ? error.message : String(error),
        });
        setHasError(true);
        toast({
          title: "Fout",
          description: "Clockin API kon niet geladen worden.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClockInData();
  }, [toast]);

  const handleRowClick = (employeeId: string) => {
    navigate(`/clockin/${employeeId}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Uren &amp; Aanwezigheid
        </h2>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">Uren worden geladen…</p>
        </div>
      )}

      {hasError && !isLoading && (
        <div className="flex items-center justify-center py-8">
          <p className="text-red-500">Clockin API kon niet geladen worden.</p>
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
                  Projecten
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
  );
}
