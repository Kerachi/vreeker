import { Bell } from "lucide-react";
import { useState } from "react";

export default function SettingsNotifications() {
  const [notifications, setNotifications] = useState({
    documents: true,
    planning: true,
    mentions: false,
  });

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          ��� Notificaties
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <label className="flex-1 cursor-pointer text-sm text-gray-900 font-medium">
            Ontvang melding bij nieuwe documenten
          </label>
          <button
            onClick={() => handleToggle("documents")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.documents ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.documents ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <label className="flex-1 cursor-pointer text-sm text-gray-900 font-medium">
            Dagelijks planningsoverzicht ontvangen
          </label>
          <button
            onClick={() => handleToggle("planning")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.planning ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.planning ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <label className="flex-1 cursor-pointer text-sm text-gray-900 font-medium">
            Melding bij vermelding in bericht
          </label>
          <button
            onClick={() => handleToggle("mentions")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.mentions ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.mentions ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
