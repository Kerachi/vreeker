import { Settings, Upload } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SettingsSystem() {
  const [systemSettings, setSystemSettings] = useState({
    startPage: "dashboard",
    backupFrequency: "wekelijks",
    contactInfo: "info@vreeker.nl | +31 30 123 4567",
  });

  const handleStartPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSystemSettings((prev) => ({
      ...prev,
      startPage: e.target.value,
    }));
  };

  const handleBackupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSystemSettings((prev) => ({
      ...prev,
      backupFrequency: e.target.value,
    }));
  };

  const handleContactInfoChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setSystemSettings((prev) => ({
      ...prev,
      contactInfo: e.target.value,
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          ⚙️ Systeeminstellingen
        </h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Startpagina bij openen
          </label>
          <select
            value={systemSettings.startPage}
            onChange={handleStartPageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          >
            <option value="dashboard">Dashboard</option>
            <option value="planning">Planning</option>
            <option value="projecten">Projecten</option>
            <option value="documenten">Documenten</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Back-up frequentie
          </label>
          <select
            value={systemSettings.backupFrequency}
            onChange={handleBackupChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          >
            <option value="dagelijks">Dagelijks</option>
            <option value="wekelijks">Wekelijks</option>
            <option value="maandelijks">Maandelijks</option>
          </select>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm font-medium text-gray-900 mb-3">
              Bedrijfslogo toevoegen
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Sleep een afbeelding hier of klik om te selecteren
              </p>
              <input type="file" className="hidden" accept="image/*" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Contactinformatie aanpassen
          </label>
          <textarea
            value={systemSettings.contactInfo}
            onChange={handleContactInfoChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-20"
            placeholder="E-mail en telefoonnummer"
          />
        </div>

        <div className="pt-6 border-t border-gray-200">
          <Button className="bg-green-600 hover:bg-green-700 text-white font-medium">
            Instellingen opslaan
          </Button>
        </div>
      </div>
    </div>
  );
}
