import DashboardLayout from "@/components/DashboardLayout";

export default function Leeg3() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
        <div className="bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all p-6">
          <iframe
            className="airtable-embed"
            src="https://airtable.com/embed/appHSB36SlsZqJkAi/shrlWLYv7RDItRccE"
            frameBorder="0"
            width="100%"
            height="533"
            style={{
              background: "transparent",
              border: "1px solid #ccc",
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
