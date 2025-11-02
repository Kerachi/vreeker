import { AlertTriangle, TrendingDown } from "lucide-react";

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
  if (lowStockItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5">
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
  );
}
