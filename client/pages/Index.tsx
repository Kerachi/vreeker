import DashboardLayout from "@/components/DashboardLayout";
import DashboardMetrics from "@/components/DashboardMetrics";
import ProjectCard from "@/components/ProjectCard";
import ProdistAlerts from "@/components/ProdistAlerts";
import TodayPlanner from "@/components/TodayPlanner";
import TeamUpdates from "@/components/TeamUpdates";

const projects = [
  {
    id: "1",
    name: "Achtertuin Renovatie",
    client: "Fam. de Boer",
    status: "in-progress" as const,
    responsible: "Peter van Dijk",
    progress: 65,
  },
  {
    id: "2",
    name: "Gazon Aanleg",
    client: "Hotel de Ambiance",
    status: "in-progress" as const,
    responsible: "Maria Garcia",
    progress: 45,
  },
  {
    id: "3",
    name: "Boomverzorging",
    client: "Gemeente Utrecht",
    status: "pending" as const,
    responsible: "Jan Pieterse",
    progress: 0,
  },
  {
    id: "4",
    name: "Terras Aanleg",
    client: "Restaurant de Tuin",
    status: "completed" as const,
    responsible: "Anna Kowalski",
    progress: 100,
  },
];

export default function Index() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welkom terug! Hier is uw overzicht van actieve projecten.
          </p>
        </div>

        <DashboardMetrics />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Actieve Projecten
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </div>

            <ProdistAlerts />

            <TodayPlanner />
          </div>

          <div className="lg:col-span-1">
            <TeamUpdates />
          </div>
        </div>

        {/* Watermark */}
        <div
          className="fixed bottom-[30px] right-[30px] pointer-events-none"
          style={{
            zIndex: 9999,
            animation: "floatWave 4s ease-in-out infinite",
          }}
        >
          <span
            className="text-lg font-semibold"
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
