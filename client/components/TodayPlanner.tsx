import { Clock, MapPin } from "lucide-react";

interface TodayTask {
  id: string;
  time: string;
  title: string;
  location?: string;
  type: "meeting" | "task";
}

const todayTasks: TodayTask[] = [
  {
    id: "1",
    time: "09:00",
    title: "Ter plaatse inspectie Hoflaan",
    location: "Hoflaan 23, Utrecht",
    type: "task",
  },
  {
    id: "2",
    time: "14:00",
    title: "Bespreking klant De Jong",
    location: "Kantoor",
    type: "meeting",
  },
  {
    id: "3",
    time: "16:30",
    title: "Teamoverleg",
    location: "Vergaderzaal",
    type: "meeting",
  },
];

export default function TodayPlanner() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">📅 Vandaag</h2>

      <div className="space-y-3">
        {todayTasks.length === 0 ? (
          <p className="text-sm text-gray-600 text-center py-4">
            Geen taken gepland voor vandaag
          </p>
        ) : (
          todayTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                task.type === "meeting"
                  ? "border-blue-100 bg-blue-50"
                  : "border-green-100 bg-green-50"
              }`}
            >
              <div className="flex-shrink-0 pt-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    task.type === "meeting" ? "bg-blue-500" : "bg-green-500"
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-gray-900 bg-white px-2 py-1 rounded">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {task.time}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {task.title}
                </p>
                {task.location && (
                  <p className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {task.location}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <a
          href="/planning"
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          Volledige planning bekijken →
        </a>
      </div>
    </div>
  );
}
