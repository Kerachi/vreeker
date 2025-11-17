import { AlertTriangle, TrendingDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        {/* Help Badge - Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-green-100 rounded-full border border-green-300">
            <span className="text-xs font-medium text-green-800">Hover hier voor de huidige knelpunt oplossing</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-semibold text-amber-900">
                ⚠️ Voorraadwaarschuwing
              </h3>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-green-50 rounded-full border border-green-200">
                <span className="text-xs font-medium text-green-700">Blueprint - Visueel voorbeeld voltooid (live)</span>
              </div>
            </div>

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
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 p-6 w-[28rem] pointer-events-none">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fe1fa1463634b42c9a84ff3fd4e4382b1%2F3a11e9466e614a07998ccbdeaddedaaa?format=webp&width=800"
              alt="Voorraadwaarschuwing oplossing preview"
              className="w-full h-80 rounded-lg object-cover mb-4"
            />
            <p className="text-sm text-gray-700 text-center leading-relaxed font-medium">
              Echte oplossing: automatische e-mail bij 'Geen voorraad ❌'.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
