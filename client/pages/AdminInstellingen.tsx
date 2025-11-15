import AdminDashboardLayout from "@/components/AdminDashboardLayout";

export default function AdminInstellingen() {
  return (
    <AdminDashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Instellingen</h1>
          <p className="text-gray-600 mt-2">
            Beheer systeeminstellingen en gebruikersrollen.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Systeeminstellingen
            </h2>
            <p className="text-gray-600 mb-4">
              Deze pagina is nog in ontwikkeling. Voer een prompt in om deze
              inhoud aan te passen.
            </p>
          </div>
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
    </AdminDashboardLayout>
  );
}
