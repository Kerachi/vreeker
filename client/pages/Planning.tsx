import DashboardLayout from "@/components/DashboardLayout";
import WeeklySchedule from "@/components/WeeklySchedule";

export default function Planning() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Planning</h1>
          <p className="text-gray-600 mt-2">
            Beheer hier uw planning en schema's.
          </p>
        </div>

        <WeeklySchedule />

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
