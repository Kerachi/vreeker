import DashboardLayout from "@/components/DashboardLayout";
import ProjectCard from "@/components/ProjectCard";
import WeeklyPlanner from "@/components/WeeklyPlanner";
import NotesPanel from "@/components/NotesPanel";
import ProdistIntegration from "@/components/ProdistIntegration";
import InternalCommunication from "@/components/InternalCommunication";
import HoursAndAttendance from "@/components/HoursAndAttendance";

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

            <WeeklyPlanner />

            <InternalCommunication />
          </div>

          <div className="lg:col-span-1">
            <NotesPanel />
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <ProdistIntegration />
          <HoursAndAttendance />
        </div>
      </div>
    </DashboardLayout>
  );
}
