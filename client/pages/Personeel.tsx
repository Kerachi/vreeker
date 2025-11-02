import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import HoursRegistration from "@/components/HoursRegistration";
import AttendanceStatus from "@/components/AttendanceStatus";
import HoursBreakdown from "@/components/HoursBreakdown";

export default function Personeel() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash === "urenoverzicht") {
      const element = document.getElementById("urenoverzicht");
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

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
            Beheer urenregistratie en aanwezigheid van uw team
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <HoursRegistration />
            <AttendanceStatus />
          </div>

          <div id="urenoverzicht">
            <HoursBreakdown />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
