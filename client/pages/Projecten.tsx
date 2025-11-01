import DashboardLayout from "@/components/DashboardLayout";
import ProjectsTable from "@/components/ProjectsTable";

export default function Projecten() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Projecten</h1>
          <p className="text-gray-600 mt-2">Overzicht van alle projecten.</p>
        </div>

        <ProjectsTable />
      </div>
    </DashboardLayout>
  );
}
