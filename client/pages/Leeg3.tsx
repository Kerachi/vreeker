import DashboardLayout from "@/components/DashboardLayout";

export default function Leeg3() {
  return (
    <DashboardLayout>
      <div className="w-full h-full overflow-hidden">
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/appHSB36SlsZqJkAi/shrlWLYv7RDItRccE"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{
            background: "transparent",
            border: "none",
          }}
        />
      </div>
    </DashboardLayout>
  );
}
