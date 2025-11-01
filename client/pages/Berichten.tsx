import DashboardLayout from "@/components/DashboardLayout";
import UpdatesFeed from "@/components/UpdatesFeed";

export default function Berichten() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Berichten</h1>
          <p className="text-gray-600 mt-2">Uw berichten en communicatie.</p>
        </div>

        <div className="max-w-4xl">
          <UpdatesFeed />
        </div>
      </div>
    </DashboardLayout>
  );
}
