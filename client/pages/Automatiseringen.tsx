import DashboardLayout from "@/components/DashboardLayout";

function AutomationCard({
  href,
  imageSrc,
  imageAlt,
  title,
  subtitle,
}: {
  href: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-[300px] bg-white rounded-[20px] shadow-md hover:shadow-lg transition-shadow p-[30px] flex flex-col items-center justify-center text-center cursor-pointer"
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-[80%] max-w-[300px] mb-4"
      />
      <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{subtitle}</p>
    </a>
  );
}

export default function Automatiseringen() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Automatiseringen</h1>
          <p className="text-gray-600 mt-2">
            Beheer en monitor uw Zapier AI automatiseringen
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AutomationCard
            href="https://zapier.com/editor/333185153/draft/_GEN_1763126233202/sample"
            imageSrc="https://cdn.builder.io/api/v1/image/assets%2Fe1fa1463634b42c9a84ff3fd4e4382b1%2Fddd9cd674d96448a806ab35993f7233a?format=webp&width=800"
            imageAlt="OneDrive naar Email en WhatsApp Automatisering Flow"
            title="OneDrive Automatisering"
            subtitle="Nieuw bestand in OneDrive → Emailmelding + WhatsApp notificatie"
          />
          <AutomationCard
            href="https://zapier.com/editor/333453784/draft/_GEN_1763063772959/filter"
            imageSrc="https://cdn.builder.io/api/v1/image/assets%2Fe1fa1463634b42c9a84ff3fd4e4382b1%2F409e09b6177b457baaa53910d7b2042b?format=webp&width=800"
            imageAlt="OneDrive naar Airtable Automatisering Flow"
            title="OneDrive → Airtable Automatisering"
            subtitle="Nieuw bestand in OneDrive → Automatische sync naar Airtable voorraad"
          />
          <AutomationCard
            href="https://zapier.com/editor/00000000-0000-c000-8000-000333663790/published"
            imageSrc="https://cdn.builder.io/api/v1/image/assets%2Fe1fa1463634b42c9a84ff3fd4e4382b1%2F246951a4d35f4a14bcb89ea8834d628d?format=webp&width=800"
            imageAlt="Excel naar Airtable Automatisering Flow"
            title="Excel → Airtable Automatisering"
            subtitle="Excel-documenten in OneDrive → Automatisch synchroniseren naar Airtable"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
