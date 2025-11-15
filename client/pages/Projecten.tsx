import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import ProjectsTable from "@/components/ProjectsTable";

interface FilterOption {
  id: string;
  label: string;
  value: string | null;
}

const filterOptions: FilterOption[] = [
  { id: "all", label: "Alle projecten", value: null },
  { id: "active", label: "Actieve projecten", value: "active" },
  { id: "completed", label: "Afgeronde projecten", value: "completed" },
  { id: "pending", label: "Openstaande taken", value: "pending" },
];

export default function Projecten() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
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

  const handleFilterClick = (filterValue: string | null) => {
    if (filterValue) {
      navigate(`/projecten?filter=${filterValue}`);
    } else {
      navigate("/projecten");
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{getTitle()}</h1>
          <p className="text-gray-600 mt-2">{getSubtitle()}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => handleFilterClick(option.value)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  filter === option.value ||
                  (filter === null && option.value === null)
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-green-300 hover:text-green-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <ProjectsTable filter={filter} />

        {/* Watermark */}
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-[30px] lg:right-[30px] pointer-events-none"
          style={{
            zIndex: 9999,
            animation: "floatWave 4s ease-in-out infinite",
          }}
        >
          <span
            className="font-semibold text-2xl sm:text-5xl lg:text-9xl"
            style={{
              color: "#ff69b4",
              opacity: 0.3,
            }}
          >
            Prototype 1 – Visueel
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
}
