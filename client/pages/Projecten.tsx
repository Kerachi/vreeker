import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectsTable from "@/components/ProjectsTable";

export default function Projecten() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  const getSubtitle = () => {
    if (filter === "pending") {
      return "Projecten met openstaande taken en updates.";
    }
    return "Overzicht van alle projecten.";
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Projecten</h1>
          <p className="text-gray-600 mt-2">{getSubtitle()}</p>
          {filter === "pending" && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg">
              <span className="text-sm font-medium text-purple-900">
                Filter: Openstaande taken
              </span>
              <button
                onClick={() => window.history.back()}
                className="text-xs text-purple-600 hover:text-purple-700 font-semibold ml-2"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <ProjectsTable filter={filter} />
      </div>
    </DashboardLayout>
  );
}
