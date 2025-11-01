import { Palette } from "lucide-react";
import { useState } from "react";

export default function SettingsPersonal() {
  const [preferences, setPreferences] = useState({
    darkMode: false,
    fontSize: "normaal",
    sections: {
      planning: true,
      projecten: true,
      documenten: true,
      berichten: true,
    },
  });

  const handleDarkModeToggle = () => {
    setPreferences((prev) => ({
      ...prev,
      darkMode: !prev.darkMode,
    }));
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPreferences((prev) => ({
      ...prev,
      fontSize: e.target.value,
    }));
  };

  const handleSectionToggle = (section: keyof typeof preferences.sections) => {
    setPreferences((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: !prev.sections[section],
      },
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Palette className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          🎨 Persoonlijke voorkeuren
        </h2>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <label className="text-sm font-medium text-gray-900">
            Donkere modus
          </label>
          <button
            onClick={handleDarkModeToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences.darkMode ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences.darkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Lettergrootte aanpassen
          </label>
          <select
            value={preferences.fontSize}
            onChange={handleFontSizeChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
          >
            <option value="normaal">Normaal</option>
            <option value="groot">Groot</option>
            <option value="extra-groot">Extra groot</option>
          </select>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-900 mb-3">
            Zichtbare onderdelen aanpassen
          </p>
          <div className="space-y-3">
            {[
              { key: "planning", label: "Planning" },
              { key: "projecten", label: "Projecten" },
              { key: "documenten", label: "Documenten" },
              { key: "berichten", label: "Berichten" },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <input
                  type="checkbox"
                  id={`section-${item.key}`}
                  checked={
                    preferences.sections[
                      item.key as keyof typeof preferences.sections
                    ]
                  }
                  onChange={() =>
                    handleSectionToggle(
                      item.key as keyof typeof preferences.sections,
                    )
                  }
                  className="w-4 h-4 cursor-pointer accent-green-600 rounded"
                />
                <label
                  htmlFor={`section-${item.key}`}
                  className="text-sm text-gray-900 cursor-pointer"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
