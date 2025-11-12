interface OneDriveCardProps {
  title?: string;
  subtitle?: string;
  link?: string;
}

export default function OneDriveCard({
  title = "OneDrive – Roosters & Documenten",
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
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] font-bold text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-[13px] text-gray-600">{subtitle}</p>
        </div>

        <div className="flex-shrink-0 text-gray-400">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </a>
  );
}
