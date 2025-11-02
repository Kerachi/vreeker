import { Briefcase, CheckCircle, ClipboardList, Clock } from "lucide-react";

interface MetricCard {
  id: string;
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: "green" | "blue" | "purple" | "orange";
}

const metricIcons = {
  green: "bg-green-100",
  blue: "bg-blue-100",
  purple: "bg-purple-100",
  orange: "bg-orange-100",
};

const metricTextColors = {
  green: "text-green-700",
  blue: "text-blue-700",
  purple: "text-purple-700",
  orange: "text-orange-700",
};

export default function DashboardMetrics() {
  const metrics: MetricCard[] = [
    {
      id: "active",
      label: "Actieve projecten",
      value: 2,
      icon: <Briefcase className="w-6 h-6" />,
      color: "green",
    },
    {
      id: "completed",
      label: "Afgeronde projecten",
      value: 1,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "blue",
    },
    {
      id: "tasks",
      label: "Openstaande taken",
      value: 12,
      icon: <ClipboardList className="w-6 h-6" />,
      color: "purple",
    },
    {
      id: "hours",
      label: "Totaal gewerkte uren deze week",
      value: "42.5h",
      icon: <Clock className="w-6 h-6" />,
      color: "orange",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                {metric.label}
              </p>
              <p className={`text-3xl font-bold mt-2 ${metricTextColors[metric.color]}`}>
                {metric.value}
              </p>
            </div>
            <div
              className={`flex-shrink-0 p-3 rounded-lg ${metricIcons[metric.color]}`}
            >
              <div className={metricTextColors[metric.color]}>
                {metric.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
