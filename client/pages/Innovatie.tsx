import DashboardLayout from "@/components/DashboardLayout";
import { Link } from "react-router-dom";
import { Zap, Database } from "lucide-react";

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
      className="w-[280px] h-[280px] bg-white rounded-[12px] shadow-md hover:shadow-lg transition-all duration-200 p-6 flex flex-col items-center justify-center text-center group cursor-pointer"
      style={{
        transform: "translateZ(0)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
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
      <div className="p-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Innovatie – Automatisering & Data Integratie
          </h1>
          <p className="text-gray-600 text-lg">
            Hier zie je welke technologieën het Vreeker dashboard slim en actueel houden.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 justify-center md:justify-start">
          <InnovatieCard
            title="Zapier Automatiseringen"
            subtitle="Bekijk alle workflows die het dashboard ondersteunen"
            icon={<Zap className="w-10 h-10 text-white" />}
            iconColor="bg-orange-500"
            href="/automatiseringen"
          />

          <InnovatieCard
            title="Airtable Databronnen"
            subtitle="Bekijk de tabellen die voor het dashboard gebruikt worden"
            icon={<Database className="w-10 h-10 text-white" />}
            iconColor="bg-blue-600"
            href="/documenten"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
