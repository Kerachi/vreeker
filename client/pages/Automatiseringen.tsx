import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface Automation {
  id: string;
  name: string;
  description: string;
  status: "actief" | "inactief";
  lastExecution: string;
  icon: string;
}

const automations: Automation[] = [
  {
    id: "1",
    name: "ProjectSync",
    description: "Synchroniseert nieuwe projecten uit Prodist",
    status: "actief",
    lastExecution: "2024-01-15 14:30",
    icon: "⚙️",
  },
  {
    id: "2",
    name: "DocumentOpslag",
    description: "Slaat inkomende e-mails op per project",
    status: "actief",
    lastExecution: "2024-01-15 16:45",
    icon: "📁",
  },
  {
    id: "3",
    name: "UrenFlow",
    description: "Stuurt uren automatisch naar Excel-overzicht",
    status: "actief",
    lastExecution: "2024-01-15 09:15",
    icon: "🕒",
  },
  {
    id: "4",
    name: "PlanningAlert",
    description: "Stuurt melding bij wijziging in planning",
    status: "actief",
    lastExecution: "2024-01-15 11:00",
    icon: "📋",
  },
];

function AutomationCard({ automation }: { automation: Automation }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{automation.icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {automation.name}
            </h3>
            <p className="text-sm text-gray-600">{automation.description}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          {automation.status === "actief" ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-gray-400" />
          )}
          <span
            className={`text-sm font-medium ${
              automation.status === "actief"
                ? "text-green-600"
                : "text-gray-600"
            }`}
          >
            {automation.status === "actief" ? "Actief" : "Inactief"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>Laatste uitvoering: {automation.lastExecution}</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full border-green-300 text-green-600 hover:bg-green-50 hover:text-green-700"
      >
        Bekijk details
      </Button>
    </div>
  );
}

export default function Automatiseringen() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Automatiseringen
            </h1>
            <p className="text-gray-600 mt-2">
              Beheer en monitor uw Zapier AI automatiseringen
            </p>
          </div>
          <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
            <Plus className="w-5 h-5" />
            Nieuwe automatisering toevoegen
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {automations.map((automation) => (
            <AutomationCard key={automation.id} automation={automation} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
