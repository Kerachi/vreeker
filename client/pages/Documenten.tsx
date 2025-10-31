import DashboardLayout from "@/components/DashboardLayout";

export default function Documenten() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Documenten</h1>
          <p className="text-gray-600 mt-2">Alle bedrijfsdocumenten en bestanden.</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Documenten pagina</h2>
            <p className="text-gray-600 mb-4">
              Deze pagina is nog in ontwikkeling. Voer een prompt in om deze inhoud aan te passen.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
