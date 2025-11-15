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
