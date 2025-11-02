import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectsTable from "@/components/ProjectsTable";

export default function Projecten() {
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  const getTitle = () => {
    switch (filter) {
      case "active":
        return "Actieve projecten";
      case "completed":
        return "Afgeronde projecten";
      case "pending":
        return "Openstaande taken";
      default:
        return "Projecten";
    }
  };

  const getSubtitle = () => {
    switch (filter) {
      case "active":
        return "Projecten in uitvoering en met vertraging.";
      case "completed":
        return "Voltooide projecten met beoordelingen.";
      case "pending":
        return "Openstaande taken met deadlines.";
      default:
        return "Overzicht van alle projecten.";
    }
  };

  const getFilterBadgeColor = () => {
    switch (filter) {
      case "active":
        return "bg-green-50 border-green-200 text-green-900";
      case "completed":
        return "bg-blue-50 border-blue-200 text-blue-900";
      case "pending":
        return "bg-purple-50 border-purple-200 text-purple-900";
      default:
        return "";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{getTitle()}</h1>
          <p className="text-gray-600 mt-2">{getSubtitle()}</p>
          {filter && (
            <div className={`mt-4 inline-flex items-center gap-2 px-3 py-2 border rounded-lg ${getFilterBadgeColor()}`}>
              <span className="text-sm font-medium">
                Filter: {getTitle()}
              </span>
              <button
                onClick={() => window.history.back()}
                className="font-semibold ml-2 hover:opacity-70"
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
