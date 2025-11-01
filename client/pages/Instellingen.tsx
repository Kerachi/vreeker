import DashboardLayout from "@/components/DashboardLayout";
import SettingsUserAccess from "@/components/SettingsUserAccess";
import SettingsNotifications from "@/components/SettingsNotifications";
import SettingsDocuments from "@/components/SettingsDocuments";
import SettingsPersonal from "@/components/SettingsPersonal";
import SettingsSecurity from "@/components/SettingsSecurity";
import SettingsSystem from "@/components/SettingsSystem";

export default function Instellingen() {
  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            ⚙️ Instellingen – Beheer en Voorkeuren
          </h1>
          <p className="text-gray-600 mt-2">
            Configureer uw persoonlijke instellingen, beveiliging en systeemparameters.
          </p>
        </div>

        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SettingsPersonal />
            <SettingsNotifications />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SettingsDocuments />
            <SettingsSecurity />
          </div>

          <SettingsUserAccess />

          <SettingsSystem />
        </div>
      </div>
    </DashboardLayout>
  );
}
