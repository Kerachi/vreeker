import { Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  name: string;
  price: number;
  stock: number;
}

const sampleArticles: Article[] = [
  {
    id: "1",
    name: "Gras zaad Premium Mix",
    price: 45.99,
    stock: 120,
  },
  {
    id: "2",
    name: "Meststof NPK 10-10-10",
    price: 28.50,
    stock: 85,
  },
  {
    id: "3",
    name: "Tuinschaar RVS 45cm",
    price: 62.00,
    stock: 15,
  },
  {
    id: "4",
    name: "Grindstenen grijs 20x20",
    price: 3.25,
    stock: 450,
  },
  {
    id: "5",
    name: "Heggeschaar elektrisch",
    price: 129.99,
    stock: 8,
  },
  {
    id: "6",
    name: "Irrigatiesysteem drip",
    price: 95.00,
    stock: 32,
  },
];

export default function ProdistIntegration() {
  const handleImport = () => {
    console.log("Importeren uit Prodist...");
  };

  const handleExport = () => {
    console.log("Exporteren naar Prodist...");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Prodist – Artikelen en voorraad
      </h2>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-green-50">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">
                Artikel
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">
                Prijs
              </th>
              <th className="text-right py-3 px-4 font-semibold text-gray-900">
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
                <td className="py-3 px-4 text-gray-900 font-medium">
                  {article.name}
                </td>
                <td className="py-3 px-4 text-right text-gray-700">
                  €{article.price.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      article.stock > 50
                        ? "bg-green-100 text-green-800"
                        : article.stock > 20
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
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
  );
}
