import DashboardLayout from "@/components/DashboardLayout";
import UpdatesFeed from "@/components/UpdatesFeed";

export default function Berichten() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Berichten</h1>
          <p className="text-gray-600 mt-2">Uw berichten en communicatie.</p>
        </div>

        <div className="max-w-4xl">
          <UpdatesFeed />
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
