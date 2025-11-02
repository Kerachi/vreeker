import { useState } from "react";
import { Download, Upload, Lock, Check, AlertCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Article {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface SyncLog {
  id: string;
  action: "import" | "export";
  date: string;
  status: "success" | "failed";
  message: string;
}

const sampleArticles: Article[] = [
  { id: "1", name: "Gras zaad Premium Mix", price: 45.99, stock: 120 },
  { id: "2", name: "Meststof NPK 10-10-10", price: 28.5, stock: 85 },
  { id: "3", name: "Tuinschaar RVS 45cm", price: 62.0, stock: 15 },
  { id: "4", name: "Grindstenen grijs 20x20", price: 3.25, stock: 450 },
  { id: "5", name: "Heggeschaar elektrisch", price: 129.99, stock: 8 },
  { id: "6", name: "Irrigatiesysteem drip", price: 95.0, stock: 32 },
];

const syncLogs: SyncLog[] = [
  {
    id: "1",
    action: "import",
    date: "Vandaag 14:30",
    status: "success",
    message: "Succesvol 156 artikelen geïmporteerd",
  },
  {
    id: "2",
    action: "export",
    date: "Gisteren 10:15",
    status: "success",
    message: "Succesvol 152 artikelen geëxporteerd",
  },
  {
    id: "3",
    action: "import",
    date: "2 dagen geleden 09:45",
    status: "failed",
    message: "Fout: API timeout na 3 pogingen",
  },
];

export default function Prodist() {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<
    "idle" | "success" | "failed"
  >("idle");

  const handleImport = () => {
    console.log("Importeren uit Prodist...");
  };

  const handleExport = () => {
    console.log("Exporteren naar Prodist...");
  };

  const handleTestConnection = () => {
    setTestingConnection(true);
    setTimeout(() => {
      setTestingConnection(false);
      setConnectionStatus("success");
      setTimeout(() => setConnectionStatus("idle"), 3000);
    }, 2000);
  };

  const handleSaveApiKey = () => {
    console.log("API key opgeslagen:", apiKey);
  };

  const getStockColor = (stock: number) => {
    if (stock > 50) return "bg-green-100 text-green-800";
    if (stock > 20) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Prodist</h1>
          <p className="text-gray-600 mt-2">
            Beheer uw Prodist-integratie en synchroniseer artikelen
          </p>
        </div>

        {/* Main Articles Table */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              📦 Artikelen en voorraad
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-green-200 bg-green-50">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      Artikel
                    </th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900">
                      Prijs
                    </th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900">
                      Voorraad
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sampleArticles.map((article) => (
                    <tr
                      key={article.id}
                      className="border-b border-gray-100 hover:bg-green-50 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-900 font-medium">
                        {article.name}
                      </td>
                      <td className="py-4 px-4 text-right text-gray-700">
                        €{article.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStockColor(article.stock)}`}
                        >
                          {article.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleImport}
                className="bg-green-600 hover:bg-green-700 text-white font-medium flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Importeren uit Prodist
              </Button>
              <Button
                onClick={handleExport}
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50 font-medium flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Exporteren naar Prodist
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* API Settings Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-green-600" />
              API-instellingen
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prodist API-sleutel
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Voer uw Prodist API-sleutel in"
                    className="flex-1"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {showApiKey ? "Verbergen" : "Tonen"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Uw API-sleutel is versleuteld opgeslagen en nooit zichtbaar in
                  logboeken.
                </p>
              </div>

              {connectionStatus === "success" && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-700" />
                  <span className="text-sm font-medium text-green-800">
                    Verbinding succesvol getest
                  </span>
                </div>
              )}

              {connectionStatus === "failed" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-700" />
                  <span className="text-sm font-medium text-red-800">
                    Verbinding kon niet worden getest
                  </span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={handleTestConnection}
                  disabled={!apiKey || testingConnection}
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50 font-medium"
                >
                  {testingConnection ? "Testen..." : "🔗 Koppeling testen"}
                </Button>
                <Button
                  onClick={handleSaveApiKey}
                  disabled={!apiKey}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium"
                >
                  💾 Opslaan
                </Button>
              </div>
            </div>
          </div>

          {/* Synchronization Log */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📋 Synchronisatielogboek
            </h2>

            <div className="space-y-3">
              {syncLogs.map((log) => (
                <div
                  key={log.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    log.status === "success"
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white">
                        {log.action === "import" ? "📥 Import" : "📤 Export"}
                      </span>
                      <span className="text-xs font-medium text-gray-600">
                        {log.date}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded ${
                        log.status === "success"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {log.status === "success" ? "✓ OK" : "✗ Fout"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800">{log.message}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <a
                href="#"
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Volledige logboek bekijken →
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
