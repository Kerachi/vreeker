import { ArrowLeft } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import HoursRegistration from "@/components/HoursRegistration";
import AttendanceStatus from "@/components/AttendanceStatus";
import HoursBreakdown from "@/components/HoursBreakdown";

export default function Personeel() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const showHoursBreakdown = tab === "hours";

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Terug naar Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Personeel</h1>
          <p className="text-gray-600 mt-2">
            {showHoursBreakdown
              ? "Detailweergave van deze week's urenregistratie"
              : "Beheer urenregistratie en aanwezigheid van uw team"}
          </p>
        </div>

        {showHoursBreakdown ? (
          <HoursBreakdown />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HoursRegistration />
            <AttendanceStatus />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
