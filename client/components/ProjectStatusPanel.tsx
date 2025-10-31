import { Clock, CheckCircle, Calendar } from "lucide-react";

interface ProjectStat {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const stats: ProjectStat[] = [
  {
    label: "Actief",
    value: 8,
    icon: <Clock className="w-6 h-6" />,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    label: "Afgerond",
    value: 5,
    icon: <CheckCircle className="w-6 h-6" />,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: "Gepland",
    value: 3,
    icon: <Calendar className="w-6 h-6" />,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];

export default function ProjectStatusPanel() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Projectstatus</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`rounded-lg p-6 ${stat.bgColor} border border-gray-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <span className={stat.color}>{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
