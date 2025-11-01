import DashboardLayout from "@/components/DashboardLayout";
import WeeklySchedule from "@/components/WeeklySchedule";

export default function Planning() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Planning</h1>
          <p className="text-gray-600 mt-2">Beheer hier uw planning en schema's.</p>
        </div>

        <WeeklySchedule />
      </div>
    </DashboardLayout>
  );
}
