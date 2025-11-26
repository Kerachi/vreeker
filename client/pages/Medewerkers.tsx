import DashboardLayout from "@/components/DashboardLayout";

export default function Medewerkers() {
  return (
    <DashboardLayout>
      <div className="w-full h-full overflow-hidden">
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/appHSB36SlsZqJkAi/shroExu0tIWZQ5RjR"
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
