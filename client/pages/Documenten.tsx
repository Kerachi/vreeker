import DashboardLayout from "@/components/DashboardLayout";
import DocumentCenter from "@/components/DocumentCenter";

export default function Documenten() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <DocumentCenter />

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
            Prototype 2 – Functioneel
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
}
