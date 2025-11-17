import { AlertTriangle, TrendingDown, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface StockItem {
  id: string;
  name: string;
  stock: number;
  threshold: number;
}

const lowStockItems: StockItem[] = [
  {
    id: "3",
    name: "Tuinschaar RVS 45cm",
    stock: 15,
    threshold: 20,
  },
  {
    id: "5",
    name: "Heggeschaar elektrisch",
    stock: 8,
    threshold: 20,
  },
];

const criticalStockItems: StockItem[] = lowStockItems.filter(
  (item) => item.stock <= 10,
);
const warningStockItems: StockItem[] = lowStockItems.filter(
  (item) => item.stock > 10 && item.stock <= 20,
);

export default function ProdistAlerts() {
  const [isHovered, setIsHovered] = useState(false);

  if (lowStockItems.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div 
        className="bg-white rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Blueprint Badge - Top Left */}
        <div className="absolute top-3 left-3 z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50 rounded-full border border-blue-200">
            <span className="text-xs font-medium text-blue-700">Blueprint – Visueel voorbeeld</span>
          </div>
        </div>

        {/* Status Badge - Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-green-50 rounded-full border border-green-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
            <span className="text-xs font-medium text-green-700">Voltooid (Live)</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-amber-900 mb-3">
              ⚠️ Voorraadwaarschuwing
            </h3>

            {criticalStockItems.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium text-red-700 mb-2">
                  Kritieke voorraad (≤10 stuks):
                </p>
                <div className="space-y-2">
                  {criticalStockItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-red-50 px-3 py-2 rounded border border-red-100"
                    >
                      <span className="text-xs font-medium text-red-900">
                        {item.name}
                      </span>
                      <span className="text-xs font-bold text-red-600 bg-white px-2 py-0.5 rounded">
                        {item.stock}x
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {warningStockItems.length > 0 && (
              <div>
                <p className="text-xs font-medium text-amber-700 mb-2">
                  Lage voorraad (11-20 stuks):
                </p>
                <div className="space-y-2">
                  {warningStockItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-amber-50 px-3 py-2 rounded border border-amber-100"
                    >
                      <span className="text-xs font-medium text-amber-900">
                        {item.name}
                      </span>
                      <span className="text-xs font-bold text-amber-600 bg-white px-2 py-0.5 rounded">
                        {item.stock}x
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-amber-200">
              <a
                href="/admin/projecten"
                className="text-xs text-amber-700 hover:text-amber-800 font-medium flex items-center gap-1"
              >
                <TrendingDown className="w-3 h-3" />
                Bekijk Prodist details
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hover Preview - Desktop Only */}
      {isHovered && (
        <div className="hidden md:block absolute top-0 left-full ml-4 z-20">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64 pointer-events-none">
            <div className="w-full h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-3">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500">Placeholder afbeelding</div>
                <div className="text-xs text-gray-400 mt-1">Sleep hier uw screenshot</div>
              </div>
            </div>
            <p className="text-xs text-gray-700 text-center leading-relaxed">
              Echte oplossing: automatische e-mail bij 'Geen voorraad ❌'.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
