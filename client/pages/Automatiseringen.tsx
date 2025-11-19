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
  title?: string;
  subtitle?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full h-[250px] sm:h-[300px] bg-white rounded-lg sm:rounded-[20px] shadow-md hover:shadow-lg transition-shadow p-4 sm:p-[30px] flex flex-col items-center justify-center text-center cursor-pointer"
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-[80%] max-w-[200px] sm:max-w-[300px] mb-2 sm:mb-4 object-contain"
      />
      {title && (
        <h2 className="text-lg sm:text-2xl font-bold text-[#1a1a1a] mb-1 sm:mb-2 line-clamp-2">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">
          {subtitle}
        </p>
      )}
    </a>
  );
}

export default function Automatiseringen() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
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
          />
          <AutomationCard
            href="https://zapier.com/editor/333453784/draft/_GEN_1763063772959/filter"
            imageSrc="https://cdn.builder.io/api/v1/image/assets%2Fe1fa1463634b42c9a84ff3fd4e4382b1%2F409e09b6177b457baaa53910d7b2042b?format=webp&width=800"
            imageAlt="OneDrive naar Airtable Automatisering Flow"
          />
          <AutomationCard
            href="https://zapier.com/editor/00000000-0000-c000-8000-000333663790/published"
            imageSrc="https://cdn.builder.io/api/v1/image/assets%2Fe1fa1463634b42c9a84ff3fd4e4382b1%2F246951a4d35f4a14bcb89ea8834d628d?format=webp&width=800"
            imageAlt="Excel naar Airtable Automatisering Flow"
          />
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
            Prototype 2 – Functioneel
          </span>
        </div>
      </div>
    </DashboardLayout>
  );
}
