import { CheckCircle2, Clock, Calendar } from "lucide-react";

interface ScheduleItem {
  id: string;
  day: string;
  activity: string;
  employee: string;
  location: string;
  status: "completed" | "in-progress" | "planned";
}

const statusConfig = {
  completed: {
    label: "✅ Afgerond",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  "in-progress": {
    label: "🟡 Bezig",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
    icon: <Clock className="w-4 h-4" />,
  },
  planned: {
    label: "🔵 Gepland",
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    icon: <Calendar className="w-4 h-4" />,
  },
};

const scheduleData: ScheduleItem[] = [
  {
    id: "1",
    day: "Maandag",
    activity: "Grondwerk Hoflaan",
    employee: "Peter van Dijk",
    location: "Hoflaan 23, Utrecht",
    status: "completed",
  },
  {
    id: "2",
    day: "Maandag",
    activity: "Planten plaatsen De Jong",
    employee: "Maria Garcia",
    location: "Kerkstraat 42, Utrecht",
    status: "in-progress",
  },
  {
    id: "3",
    day: "Dinsdag",
    activity: "Gazonwerk Hoorn",
    employee: "Jan Pieterse",
    location: "Begraafplaats Hoorn",
    status: "planned",
  },
  {
    id: "4",
    day: "Dinsdag",
    activity: "Afwerking Hoflaan",
    employee: "Anna Kowalski",
    location: "Hoflaan 23, Utrecht",
    status: "planned",
  },
  {
    id: "5",
    day: "Woensdag",
    activity: "Onderhoud groenblijvers",
    employee: "Marco Rossi",
    location: "Diverse locaties",
    status: "planned",
  },
  {
    id: "6",
    day: "Woensdag",
    activity: "Inspectie project De Jong",
    employee: "Peter van Dijk",
    location: "Kerkstraat 42, Utrecht",
    status: "planned",
  },
  {
    id: "7",
    day: "Donderdag",
    activity: "Straatwerk voorbereiding",
    employee: "Jan Pieterse",
    location: "Begraafplaats Hoorn",
    status: "planned",
  },
  {
    id: "8",
    day: "Donderdag",
    activity: "Afwerking De Jong",
    employee: "Maria Garcia",
    location: "Kerkstraat 42, Utrecht",
    status: "in-progress",
  },
  {
    id: "9",
    day: "Vrijdag",
    activity: "Opruimen werkterreinen",
    employee: "Anna Kowalski",
    location: "Diverse locaties",
    status: "planned",
  },
  {
    id: "10",
    day: "Vrijdag",
    activity: "Fotodocumentatie Hoflaan",
    employee: "Peter van Dijk",
    location: "Hoflaan 23, Utrecht",
    status: "planned",
  },
];

export default function WeeklySchedule() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          📅 Weekplanning
        </h2>
        <p className="text-gray-600 mt-2">
          Overzicht van alle werkzaamheden deze week
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-200 bg-green-50">
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Dag
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Activiteit
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Medewerker
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Locatie
              </th>
              <th className="text-center py-4 px-4 font-semibold text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((item, index) => {
              const config = statusConfig[item.status];
              return (
                <tr
                  key={item.id}
                  className={`border-b border-gray-100 hover:bg-green-50 transition-colors ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="py-4 px-4 text-gray-900 font-medium">
                    {item.day}
                  </td>
                  <td className="py-4 px-4 text-gray-900">{item.activity}</td>
                  <td className="py-4 px-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700">
                        {item.employee.charAt(0)}
                      </div>
                      <span>{item.employee}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-xs sm:text-sm">
                    {item.location}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor}`}
                    >
                      {config.label}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
          <p className="text-xs text-gray-600 font-medium mb-1">Afgerond</p>
          <p className="text-2xl font-bold text-green-700">
            {scheduleData.filter((item) => item.status === "completed").length}
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
          <p className="text-xs text-gray-600 font-medium mb-1">Bezig</p>
          <p className="text-2xl font-bold text-yellow-700">
            {scheduleData.filter((item) => item.status === "in-progress").length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <p className="text-xs text-gray-600 font-medium mb-1">Gepland</p>
          <p className="text-2xl font-bold text-blue-700">
            {scheduleData.filter((item) => item.status === "planned").length}
          </p>
        </div>
      </div>
    </div>
  );
}
