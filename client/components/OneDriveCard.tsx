import { Cloud, ChevronRight } from "lucide-react";

interface OneDriveCardProps {
  title?: string;
  subtitle?: string;
  link?: string;
}

export default function OneDriveCard({
  title = "OneDrive – Roosters",
  subtitle = "Klik om de gedeelde OneDrive-map te openen.",
  link = "https://onedrive.live.com/?id=%2Fpersonal%2Fb8f7e8256a931a93%2FDocuments%2FRoosters&viewid=f4dd0e38%2D4fa8%2D452c%2D8a08%2Dd620f6f84613&view=0",
}: OneDriveCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-[20px] shadow-md hover:shadow-lg hover:-translate-y-[3px] transition-all duration-200 p-6 cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0078D4] flex items-center justify-center">
          <Cloud className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] font-bold text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-[13px] text-gray-600">{subtitle}</p>
        </div>

        <div className="flex-shrink-0 text-gray-400">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </a>
  );
}
