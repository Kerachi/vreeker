import { Calendar, Clock } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  title: string;
  time?: string;
  description?: string;
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

export default function UpcomingAppointments({
  appointments,
}: UpcomingAppointmentsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-900">Volgende afspraken</h2>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-600 text-sm">Geen geplande afspraken.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex gap-4 p-4 bg-green-50 rounded-lg border border-green-100"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">
                  {appointment.date}
                </p>
                <p className="text-sm text-gray-700 font-medium mt-1">
                  {appointment.title}
                </p>
                {appointment.time && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-600">
                    <Clock className="w-3 h-3" />
                    {appointment.time}
                  </div>
                )}
                {appointment.description && (
                  <p className="text-xs text-gray-600 mt-2">
                    {appointment.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
