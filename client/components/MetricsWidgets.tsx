import { Smile, FileStack, MessageCircle, TrendingUp } from "lucide-react";

interface Metric {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
  trend?: string;
}

const metrics: Metric[] = [
  {
    id: "satisfaction",
    label: "Gemiddelde tevredenheid",
    value: "4,3 / 5",
    icon: <Smile className="w-6 h-6" />,
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    trend: "+0,2 van vorige week",
  },
  {
    id: "documents",
    label: "Nieuwe documenten deze week",
    value: "12",
    icon: <FileStack className="w-6 h-6" />,
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    trend: "+3 meer dan vorige week",
  },
  {
    id: "feedback",
    label: "Nieuwe feedbackmeldingen",
    value: "3",
    icon: <MessageCircle className="w-6 h-6" />,
    bgColor: "bg-amber-50",
    textColor: "text-amber-600",
    trend: "Gemiddeld 2,4 per dag",
  },
  {
    id: "growth",
    label: "Projectvoortgang",
    value: "73%",
    icon: <TrendingUp className="w-6 h-6" />,
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    trend: "Alle projecten op schema",
  },
];

export default function MetricsWidgets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className={`rounded-lg p-6 ${metric.bgColor} border border-gray-200`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={metric.textColor}>{metric.icon}</div>
          </div>
          <p className="text-xs text-gray-600 font-medium mb-1">{metric.label}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
          {metric.trend && (
            <p className="text-xs text-gray-600">{metric.trend}</p>
          )}
        </div>
      ))}
    </div>
  );
}
