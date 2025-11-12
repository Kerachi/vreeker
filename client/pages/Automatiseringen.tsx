import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Folder, Clock, Settings } from "lucide-react";

interface Automation {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  lastExecution: string;
  icon: React.ReactNode;
}

const automations: Automation[] = [
  {
    id: "1",
    name: "ProjectSync",
    description: "Synchroniseert nieuwe projecten uit Prodist",
    status: "active",
    lastExecution: "Vandaag 10:30",
    icon: <Package className="w-6 h-6 text-blue-500" />,
  },
  {
    id: "2",
    name: "DocumentOpslag",
    description: "Slaat inkomende e-mails op per project",
    status: "active",
    lastExecution: "Gisteren 15:00",
    icon: <Folder className="w-6 h-6 text-green-500" />,
  },
  {
    id: "3",
    name: "UrenFlow",
    description: "Stuurt uren automatisch naar Excel-overzicht",
    status: "inactive",
    lastExecution: "3 dagen geleden",
    icon: <Clock className="w-6 h-6 text-orange-500" />,
  },
  {
    id: "4",
    name: "PlanningAlert",
    description: "Stuurt melding bij wijziging in planning",
    status: "active",
    lastExecution: "Vandaag 09:00",
    icon: <Clock className="w-6 h-6 text-orange-500" />,
  },
];

export default function Automatiseringen() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Settings className="w-7 h-7 text-green-600" />
            Automatiseringen (Zapier AI)
          </h1>
          <p className="text-gray-600 mt-2">
            Beheer en monitor uw geautomatiseerde workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automations.map((automation) => (
            <Card
              key={automation.id}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  {automation.icon}
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {automation.name}
                  </CardTitle>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    automation.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {automation.status === "active" ? "Actief" : "Inactief"}
                </span>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600 mb-4">{automation.description}</p>
                <div className="text-xs text-gray-500 mb-2">
                  Laatste uitvoering: {automation.lastExecution}
                </div>
                <Button
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50 w-full"
                >
                  Bekijk details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2">
            <Settings className="w-5 h-5" />
            + Nieuwe automatisering toevoegen
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
