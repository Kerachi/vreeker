import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HourEntry {
  id: string;
  name: string;
  project: string;
  hours: number;
  date: string;
}

const hoursData: HourEntry[] = [
  {
    id: "1",
    name: "Johan",
    project: "Hoflaan Renovatie",
    hours: 6,
    date: "1 nov",
  },
  {
    id: "2",
    name: "Mark",
    project: "Begraafplaats Hoorn",
    hours: 4,
    date: "1 nov",
  },
  {
    id: "3",
    name: "Fleur",
    project: "Administratie",
    hours: 7,
    date: "1 nov",
  },
];

export default function HoursRegistration() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        🕓 Urenregistratie per project
      </h2>

      <div className="flex-1 overflow-x-auto mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-sm font-semibold text-gray-700 pb-3 px-3">
                Naam medewerker
              </th>
              <th className="text-left text-sm font-semibold text-gray-700 pb-3 px-3">
                Project
              </th>
              <th className="text-left text-sm font-semibold text-gray-700 pb-3 px-3">
                Gewerkte uren
              </th>
              <th className="text-left text-sm font-semibold text-gray-700 pb-3 px-3">
                Datum
              </th>
            </tr>
          </thead>
          <tbody>
            {hoursData.map((entry) => (
              <tr
                key={entry.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="text-sm text-gray-900 py-3 px-3 font-medium">
                  {entry.name}
                </td>
                <td className="text-sm text-gray-700 py-3 px-3">{entry.project}</td>
                <td className="text-sm text-gray-700 py-3 px-3">{entry.hours} uur</td>
                <td className="text-sm text-gray-700 py-3 px-3">{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
        <Plus className="w-4 h-4 mr-2" />
        Nieuwe registratie toevoegen
      </Button>
    </div>
  );
}
