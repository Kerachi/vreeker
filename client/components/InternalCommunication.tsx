import { Plus, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Update {
  id: string;
  department: string;
  message: string;
  timestamp: string;
  icon: string;
}

const initialUpdates: Update[] = [
  {
    id: "1",
    department: "Verkoop",
    message: "Offerte voor klant De Jong is goedgekeurd.",
    timestamp: "Vandaag 14:30",
    icon: "💬",
  },
  {
    id: "2",
    department: "Werkvoorbereiding",
    message: "Planning voor project Hoflaan is bijgewerkt.",
    timestamp: "Vandaag 11:15",
    icon: "📅",
  },
  {
    id: "3",
    department: "Administratie",
    message: "Factuur voor project 231 afgerond.",
    timestamp: "Vandaag 09:45",
    icon: "🧾",
  },
];

export default function InternalCommunication() {
  const [updates, setUpdates] = useState<Update[]>(initialUpdates);
  const [showForm, setShowForm] = useState(false);

  const handleAddUpdate = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Interne Communicatie
        </h2>
        <MessageCircle className="w-5 h-5 text-green-600" />
      </div>

      <div className="space-y-3 mb-6">
        {updates.map((update) => (
          <div
            key={update.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-green-200 transition-colors"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{update.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {update.department}
                  </span>
                  <span className="text-xs text-gray-500">
                    {update.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-900">{update.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={handleAddUpdate}
        variant="outline"
        className="w-full border-green-300 text-green-700 hover:bg-green-50 font-medium flex items-center justify-center gap-2"
      >
        <Plus className="w-4 h-4" />
        Nieuwe update toevoegen
      </Button>

      {showForm && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-gray-600 mb-3">
            Voeg een nieuwe update toe (placeholder voor verdere ontwikkeling)
          </p>
          <Button
            onClick={() => setShowForm(false)}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Sluiten
          </Button>
        </div>
      )}
    </div>
  );
}
