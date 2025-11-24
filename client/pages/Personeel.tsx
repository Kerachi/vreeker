import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import HoursRegistration from "@/components/HoursRegistration";
import AttendanceStatus from "@/components/AttendanceStatus";
import HoursBreakdown from "@/components/HoursBreakdown";
import ClockinPersonnelOverview from "@/components/ClockinPersonnelOverview";

type Role = "medewerker" | "manager";

export default function Personeel() {
  const [currentRole, setCurrentRole] = useState<Role>(() => {
    const saved = localStorage.getItem("personeel_role");
    return (saved as Role) || "medewerker";
  });

  useEffect(() => {
    localStorage.setItem("personeel_role", currentRole);
  }, [currentRole]);

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

  const toggleRole = () => {
    setCurrentRole(currentRole === "medewerker" ? "manager" : "medewerker");
  };

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Terug naar Dashboard</span>
            </Link>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <span>Rol:</span>
              <button
                onClick={toggleRole}
                className="text-green-600 hover:text-green-700 font-semibold transition-colors"
              >
                {currentRole === "medewerker"
                  ? "Medewerker"
                  : "Manager (Antoon)"}
              </button>
            </div>
          </div>
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
            <HoursBreakdown currentRole={currentRole} />
          </div>
        </div>

        {/* Watermark */}
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-[30px] lg:right-[30px] pointer-events-none"
          style={{
            zIndex: 9999,
            animation: "floatWave 4s ease-in-out infinite",
          }}
        >
          <span
            className="font-semibold text-2xl sm:text-5xl lg:text-9xl"
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
