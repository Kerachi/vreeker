import { FolderOpen } from "lucide-react";
import { useState } from "react";

export default function SettingsDocuments() {
  const [settings, setSettings] = useState({
    versions: true,
    uploadRestrict: false,
    encryption: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <FolderOpen className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          📁 Documentbeheer
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <input
            type="checkbox"
            id="versions"
            checked={settings.versions}
            onChange={() => handleToggle("versions")}
            className="w-4 h-4 mt-1 cursor-pointer accent-green-600 rounded"
          />
          <label htmlFor="versions" className="flex-1 cursor-pointer">
            <p className="text-sm font-medium text-gray-900">
              Bewaar vorige versies van documenten
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Maak het mogelijk om eerdere versies in te zien en te herstellen
            </p>
          </label>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <input
            type="checkbox"
            id="upload"
            checked={settings.uploadRestrict}
            onChange={() => handleToggle("uploadRestrict")}
            className="w-4 h-4 mt-1 cursor-pointer accent-green-600 rounded"
          />
          <label htmlFor="upload" className="flex-1 cursor-pointer">
            <p className="text-sm font-medium text-gray-900">
              Alleen verantwoordelijke mag uploaden
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Beperkt uploads tot de projectverantwoordelijke
            </p>
          </label>
        </div>

        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <input
            type="checkbox"
            id="encryption"
            checked={settings.encryption}
            onChange={() => handleToggle("encryption")}
            className="w-4 h-4 mt-1 cursor-pointer accent-green-600 rounded"
          />
          <label htmlFor="encryption" className="flex-1 cursor-pointer">
            <p className="text-sm font-medium text-gray-900">
              Versleutelde opslag inschakelen (veilig voor HR-bestanden)
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Beveiligde opslag helpt fouten en datalekken te voorkomen
            </p>
          </label>
        </div>
      </div>
    </div>
  );
}
