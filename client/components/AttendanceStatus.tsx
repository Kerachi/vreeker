interface StaffMember {
  id: string;
  name: string;
  role: string;
  status: "present" | "working-from-home" | "absent";
  note?: string;
}

const statusConfig = {
  present: {
    icon: "🟢",
    label: "Aanwezig",
  },
  "working-from-home": {
    icon: "🟡",
    label: "Thuiswerk",
  },
  absent: {
    icon: "🔴",
    label: "Afwezig",
  },
};

const staffData: StaffMember[] = [
  {
    id: "1",
    name: "Johan",
    role: "Projectmanager",
    status: "present",
  },
  {
    id: "2",
    name: "Mark",
    role: "Tuinman",
    status: "present",
  },
  {
    id: "3",
    name: "Fleur",
    role: "Administratie",
    status: "working-from-home",
  },
  {
    id: "4",
    name: "Antoon",
    role: "Tuinman",
    status: "absent",
    note: "vergadering",
  },
];

export default function AttendanceStatus() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 h-full flex flex-col">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        👷‍♂️ Aanwezigheid
      </h2>

      <div className="grid grid-cols-1 gap-3 flex-1">
        {staffData.map((staff) => {
          const config = statusConfig[staff.status];
          return (
            <div
              key={staff.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg">{config.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{staff.name}</p>
                <p className="text-xs text-gray-600">{staff.role}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-medium text-gray-700">{config.label}</p>
                {staff.note && (
                  <p className="text-xs text-gray-500">({staff.note})</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
