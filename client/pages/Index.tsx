import DashboardLayout from "@/components/DashboardLayout";
import ProjectCard from "@/components/ProjectCard";
import ProdistAlerts from "@/components/ProdistAlerts";
import TodayPlanner from "@/components/TodayPlanner";
import TeamUpdates from "@/components/TeamUpdates";
import { useEffect } from "react";
import { Layout } from "lucide-react";

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
  useEffect(() => {
    document.title = "Blueprint - Vreeker BV";
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Layout className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Blueprint</h1>
          </div>
          <p className="text-gray-600 mt-2">
            Welkom terug! Hier is uw overzicht van actieve projecten.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Actieve Projecten
                </h2>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 rounded-full border border-blue-200">
                  <span className="text-xs font-medium text-blue-700">Blueprint – Visueel voorbeeld</span>
                </div>
              </div>
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
            className="font-semibold"
            style={{
              color: "#ff69b4",
              opacity: 0.3,
              fontSize: "96px",
            }}
          >
            Prototype 1 – Visueel
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
}
