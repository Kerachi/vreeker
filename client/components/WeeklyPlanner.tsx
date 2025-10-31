import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ScheduleItem {
  day: string;
  date: number;
  events: { time: string; title: string; color: string }[];
}

const DAYS_NL = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

export default function WeeklyPlanner() {
  const [weekOffset, setWeekOffset] = useState(0);

  const getWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = today.getDate() - (currentDay === 0 ? 6 : currentDay - 1);
    const weekStart = new Date(today.setDate(diff + weekOffset * 7));

    const dates: ScheduleItem[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      dates.push({
        day: DAYS_NL[i],
        date: date.getDate(),
        events:
          i < 5
            ? [
                {
                  time: "09:00",
                  title: "Ter plaatse inspectie",
                  color: "bg-green-100 text-green-700",
                },
                {
                  time: "14:00",
                  title: "Bespreking klant",
                  color: "bg-blue-100 text-blue-700",
                },
              ]
            : [],
      });
    }
    return dates;
  };

  const weekDates = getWeekDates();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Weekplanning</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset(weekOffset - 1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm text-gray-600 font-medium min-w-24 text-center">
            Week {Math.ceil(weekDates[0].date / 7)}
          </span>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {weekDates.map((day, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-4 min-h-40 ${
              idx < 5 ? "bg-gray-50" : "bg-gray-100"
            }`}
          >
            <div className="mb-3">
              <p className="text-sm font-semibold text-gray-900">{day.day}</p>
              <p className="text-lg font-bold text-green-600">{day.date}</p>
            </div>
            <div className="space-y-2">
              {day.events.map((event, i) => (
                <div
                  key={i}
                  className={`rounded px-2 py-1 text-xs ${event.color}`}
                >
                  <p className="font-medium">{event.time}</p>
                  <p className="text-xs opacity-90">{event.title}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
