import DashboardLayout from "@/components/DashboardLayout";
import { Link } from "react-router-dom";
import { Zap, Database, Box } from "lucide-react";

function InnovatieCard({
  title,
  subtitle,
  icon: Icon,
  iconColor,
  href,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor: string;
  href: string;
}) {
  return (
    <Link
      to={href}
      className="w-[280px] h-[280px] bg-white rounded-[12px] shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 p-6 flex flex-col items-center justify-center text-center group cursor-pointer"
    >
      <div
        className={`w-20 h-20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 ${iconColor}`}
      >
        {Icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </Link>
  );
}

export default function Innovatie() {
  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 w-full max-w-full">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Innovatie</h1>
          <p className="text-gray-600 text-lg">
            Hier zie je welke technologieën Vreeker slim en actueel houden.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {/* Top Row - All cards with Minor 2025 label */}
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
            {/* Zapier with label */}
            <div>
              <div className="bg-[#FAD1E8] text-[#333] font-bold text-sm rounded-lg px-4 py-2 text-center mb-4 w-[280px]">
                Minor 2025
              </div>
              <InnovatieCard
                title="Zapier Automatiseringen"
                subtitle="Bekijk alle workflows."
                icon={<Zap className="w-10 h-10 text-white" />}
                iconColor="bg-orange-500"
                href="/automatiseringen"
              />
            </div>

            {/* Airtable with label */}
            <div>
              <div className="bg-[#FAD1E8] text-[#333] font-bold text-sm rounded-lg px-4 py-2 text-center mb-4 w-[280px]">
                Minor 2025
              </div>
              <InnovatieCard
                title="Airtable Databronnen"
                subtitle="Bekijk de tabellen."
                icon={<Database className="w-10 h-10 text-white" />}
                iconColor="bg-blue-600"
                href="/documenten"
              />
            </div>

            {/* Coming Soon with label 1 */}
            <div>
              <div className="bg-[#FAD1E8] text-[#333] font-bold text-sm rounded-lg px-4 py-2 text-center mb-4 w-[280px]">
                Minor 2025
              </div>
              <div className="w-[280px] h-[280px] bg-white rounded-[12px] shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 p-6 flex flex-col items-center justify-center text-center cursor-not-allowed opacity-75">
                <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4 bg-gray-100">
                  <Box className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-sm text-[#777]">
                  Nieuwe functies worden hier toegevoegd
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Row - Coming Soon cards */}
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
            {/* Coming Soon with Minor 2026 label */}
            <div>
              <div className="bg-[#C9A0FF] text-[#4B2E83] font-bold text-sm rounded-lg px-4 py-2 text-center mb-4 w-[280px]">
                Minor 2026
              </div>
              <div className="w-[280px] h-[280px] bg-white rounded-[12px] shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 p-6 flex flex-col items-center justify-center text-center cursor-not-allowed opacity-75">
                <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4 bg-gray-100">
                  <Box className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-sm text-[#777]">
                  Nieuwe functies worden hier toegevoegd
                </p>
              </div>
            </div>

            {/* Coming Soon with Stagiair 2026 label */}
            <div>
              <div className="bg-[#A7C7FF] text-[#1E3A8A] font-bold text-sm rounded-lg px-4 py-2 text-center mb-4 w-[280px]">
                Stagiair 2026
              </div>
              <div className="w-[280px] h-[280px] bg-white rounded-[12px] shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 p-6 flex flex-col items-center justify-center text-center cursor-not-allowed opacity-75">
                <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4 bg-gray-100">
                  <Box className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-sm text-[#777]">
                  Nieuwe functies worden hier toegevoegd
                </p>
              </div>
            </div>

            {/* Coming Soon with Bedrijf X 2027 label */}
            <div>
              <div className="bg-[#F2F2F2] text-[#000000] font-bold text-sm rounded-lg px-4 py-2 text-center mb-4 w-[280px]">
                Bedrijf X 2027
              </div>
              <div className="w-[280px] h-[280px] bg-white rounded-[12px] shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 p-6 flex flex-col items-center justify-center text-center cursor-not-allowed opacity-75">
                <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4 bg-gray-100">
                  <Box className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Coming Soon
                </h3>
                <p className="text-sm text-[#777]">
                  Nieuwe functies worden hier toegevoegd
                </p>
              </div>
            </div>
          </div>
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
