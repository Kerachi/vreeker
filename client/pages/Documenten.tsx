import DashboardLayout from "@/components/DashboardLayout";
import DocumentCenter from "@/components/DocumentCenter";

export default function Documenten() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <DocumentCenter />
      </div>
    </DashboardLayout>
  );
}
