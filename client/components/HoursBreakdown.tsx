interface HourEntry {
  id: string;
  medewerker: string;
  project: string;
  datum: string;
  gewerkte_uren: number;
  omschrijving: string;
}

const hoursData: HourEntry[] = [
  {
    id: "1",
    medewerker: "Mark",
    project: "Hoflaan Renovatie",
    datum: "28 okt 2025",
    gewerkte_uren: 6.5,
    omschrijving: "Werkvoorbereiding + overleg klant",
  },
  {
    id: "2",
    medewerker: "Johan",
    project: "Aanleg Herdenkingstuin",
    datum: "29 okt 2025",
    gewerkte_uren: 7.0,
    omschrijving: "Grondwerk + materiaalcontrole",
  },
  {
    id: "3",
    medewerker: "Peter",
    project: "Tuinonderhoud Crematorium West",
    datum: "30 okt 2025",
    gewerkte_uren: 8.0,
    omschrijving: "Snoeiwerk + rapportage",
  },
  {
    id: "4",
    medewerker: "Daan",
    project: "Oprit Bestrating",
    datum: "30 okt 2025",
    gewerkte_uren: 6.0,
    omschrijving: "Steenvervanging en afronding",
  },
  {
    id: "5",
    medewerker: "Fleur",
    project: "Administratie HR",
    datum: "31 okt 2025",
    gewerkte_uren: 7.0,
    omschrijving: "Documentbeheer + personeelsplanning",
  },
  {
    id: "6",
    medewerker: "Mark",
    project: "Hoflaan Renovatie",
    datum: "31 okt 2025",
    gewerkte_uren: 8.0,
    omschrijving: "Eindcontrole + evaluatie klant",
  },
];

const totalHours = hoursData.reduce((sum, entry) => sum + entry.gewerkte_uren, 0);

export default function HoursBreakdown() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
        🕓 Urenoverzicht – detail van deze week ({totalHours.toFixed(1)} uur)
      </h2>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-green-200 bg-green-50">
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Medewerker
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Project
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Datum
              </th>
              <th className="text-right py-4 px-4 font-semibold text-gray-900">
                Gewerkte uren
              </th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">
                Omschrijving
              </th>
            </tr>
          </thead>
          <tbody>
            {hoursData.map((entry, index) => (
              <tr
                key={entry.id}
                className={`border-b border-gray-100 hover:bg-green-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="py-4 px-4 text-gray-900 font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-xs font-semibold text-green-700">
                      {entry.medewerker.charAt(0)}
                    </div>
                    <span>{entry.medewerker}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-700">{entry.project}</td>
                <td className="py-4 px-4 text-gray-700">{entry.datum}</td>
                <td className="py-4 px-4 text-right">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 min-w-24">
                    {entry.gewerkte_uren.toFixed(1)} uur
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-700 text-xs sm:text-sm">
                  {entry.omschrijving}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-6 border-t border-gray-200 bg-green-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            Totaal gewerkte uren deze week:
          </span>
          <span className="text-2xl font-bold text-green-700">
            {totalHours.toFixed(1)} uur
          </span>
        </div>
      </div>
    </div>
  );
}
