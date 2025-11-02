import { Briefcase, CheckCircle, ClipboardList, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MetricCard {
  id: string;
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: "green" | "blue" | "purple" | "orange";
  clickable?: boolean;
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
  const navigate = useNavigate();

  const handleActiveClick = () => {
    navigate("/projecten?filter=active");
  };

  const handleCompletedClick = () => {
    navigate("/projecten?filter=completed");
  };

  const handleTasksClick = () => {
    navigate("/projecten?filter=pending");
  };

  const metrics: MetricCard[] = [
    {
      id: "active",
      label: "Actieve projecten",
      value: 2,
      icon: <Briefcase className="w-6 h-6" />,
      color: "green",
      clickable: true,
    },
    {
      id: "completed",
      label: "Afgeronde projecten",
      value: 1,
      icon: <CheckCircle className="w-6 h-6" />,
      color: "blue",
      clickable: true,
    },
    {
      id: "tasks",
      label: "Openstaande taken",
      value: 12,
      icon: <ClipboardList className="w-6 h-6" />,
      color: "purple",
      clickable: true,
    },
    {
      id: "hours",
      label: "Totaal gewerkte uren deze week",
      value: "42.5h",
      icon: <Clock className="w-6 h-6" />,
      color: "orange",
    },
  ];

  const handleMetricClick = (id: string) => {
    if (id === "active") {
      handleActiveClick();
    } else if (id === "completed") {
      handleCompletedClick();
    } else if (id === "tasks") {
      handleTasksClick();
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          onClick={metric.clickable ? () => handleMetricClick(metric.id) : undefined}
          className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all ${
            metric.clickable ? "cursor-pointer hover:border-green-300" : ""
          }`}
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
