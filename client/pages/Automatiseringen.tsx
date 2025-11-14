import DashboardLayout from "@/components/DashboardLayout";

function FeaturedAutomationCard() {
  return (
    <a
      href="https://zapier.com/editor/333185153/draft/_GEN_1763126233202/sample"
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-[700px] h-[300px] bg-white rounded-[20px] shadow-md hover:shadow-lg transition-shadow p-[30px] flex flex-col items-center justify-center text-center cursor-pointer"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2Fe1fa1463634b42c9a84ff3fd4e4382b1%2Fddd9cd674d96448a806ab35993f7233a?format=webp&width=800"
        alt="OneDrive naar Email en WhatsApp Automatisering Flow"
        className="w-[80%] max-w-[300px] mb-4"
      />
      <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">
        OneDrive Automatisering
      </h2>
      <p className="text-gray-600 text-sm">
        Nieuw bestand in OneDrive → Emailmelding + WhatsApp notificatie
      </p>
    </a>
  );
}

export default function Automatiseringen() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Automatiseringen
          </h1>
          <p className="text-gray-600 mt-2">
            Beheer en monitor uw Zapier AI automatiseringen
          </p>
        </div>

        <div className="mb-8">
          <FeaturedAutomationCard />
        </div>
      </div>
    </DashboardLayout>
  );
}
