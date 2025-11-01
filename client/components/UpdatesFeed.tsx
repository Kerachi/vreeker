import { Plus, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  date: string;
  department: string;
  message: string;
  color: string;
}

const departmentColors = {
  Verkoop: "bg-blue-50 border-blue-200",
  Administratie: "bg-purple-50 border-purple-200",
  Uitvoering: "bg-green-50 border-green-200",
  "Werkvoorbereiding": "bg-amber-50 border-amber-200",
  HR: "bg-red-50 border-red-200",
};

const departmentBadgeColors = {
  Verkoop: "bg-blue-100 text-blue-800",
  Administratie: "bg-purple-100 text-purple-800",
  Uitvoering: "bg-green-100 text-green-800",
  "Werkvoorbereiding": "bg-amber-100 text-amber-800",
  HR: "bg-red-100 text-red-800",
};

const messagesData: Message[] = [
  {
    id: "1",
    date: "Vandaag 16:45",
    department: "Verkoop",
    message:
      "Nieuwe aanvraag ontvangen van klant Smit voor tuinontwerp. Budget goedgekeurd door management.",
    color: departmentColors.Verkoop,
  },
  {
    id: "2",
    date: "Vandaag 14:20",
    department: "Uitvoering",
    message:
      "Hoflaan project: grondwerk voltooid. Volgende fase plantenplaatsing start maandag.",
    color: departmentColors.Uitvoering,
  },
  {
    id: "3",
    date: "Vandaag 10:30",
    department: "Administratie",
    message:
      "Alle facturen voor oktober verwerkt. Betalingsherinnering verstuurd naar 3 openstaande klanten.",
    color: departmentColors.Administratie,
  },
  {
    id: "4",
    date: "Gisteren 17:15",
    department: "Werkvoorbereiding",
    message:
      "Planning week 47 finaal goedgekeurd. Alle projecten hebben benodigde middelen gereserveerd.",
    color: departmentColors["Werkvoorbereiding"],
  },
  {
    id: "5",
    date: "Gisteren 13:45",
    department: "HR",
    message:
      "Werf veiligheidsscholingsdag gepland voor 15 november. Alle medewerkers verwacht.",
    color: departmentColors.HR,
  },
  {
    id: "6",
    date: "2 dagen geleden 09:00",
    department: "Verkoop",
    message:
      "Offerte De Jong project goedgekeurd. Contract gereed voor ondertekening.",
    color: departmentColors.Verkoop,
  },
];

export default function UpdatesFeed() {
  const [messages, setMessages] = useState<Message[]>(messagesData);
  const [showForm, setShowForm] = useState(false);

  const getDepartmentColor = (dept: string) => {
    return (
      departmentBadgeColors[dept as keyof typeof departmentBadgeColors] ||
      "bg-gray-100 text-gray-800"
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          💬 Interne updates
        </h2>
        <p className="text-gray-600 mt-2">
          Bekijk en deel updates van alle afdelingen
        </p>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-lg border p-5 transition-all hover:shadow-md ${msg.color}`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Mail className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getDepartmentColor(
                        msg.department
                      )}`}
                    >
                      {msg.department}
                    </span>
                    <span className="text-xs text-gray-600">{msg.date}</span>
                  </div>
                  <p className="text-sm text-gray-900 mt-2">{msg.message}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Nieuw bericht toevoegen
          </h3>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Afdeling
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                <option>Selecteer afdeling</option>
                <option>Verkoop</option>
                <option>Administratie</option>
                <option>Uitvoering</option>
                <option>Werkvoorbereiding</option>
                <option>HR</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Bericht
              </label>
              <textarea
                placeholder="Typ uw bericht hier..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none h-24"
              ></textarea>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => setShowForm(false)}
            >
              Verzenden
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => setShowForm(false)}
            >
              Annuleren
            </Button>
          </div>
        </div>
      )}

      <Button
        onClick={() => setShowForm(!showForm)}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Nieuw bericht toevoegen
      </Button>
    </div>
  );
}
