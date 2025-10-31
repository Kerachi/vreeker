import AdminDashboardLayout from "@/components/AdminDashboardLayout";
import MetricsWidgets from "@/components/MetricsWidgets";
import ProjectStatusPanel from "@/components/ProjectStatusPanel";
import EmployeeActivityPanel from "@/components/EmployeeActivityPanel";
import FeedbackResultsPanel from "@/components/FeedbackResultsPanel";

export default function AdminDashboard() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Beheeromgeving – Overzicht organisatie
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor projectvoortgang, medewerkeractivity en feedback in realtime.
          </p>
        </div>

        <MetricsWidgets />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ProjectStatusPanel />
          </div>
          <div>
            <FeedbackResultsPanel />
          </div>
        </div>

        <EmployeeActivityPanel />
      </div>
    </AdminDashboardLayout>
  );
}
