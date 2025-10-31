import { Settings } from "lucide-react";

export default function AdminTopBar() {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-6 shadow-sm">
      <div className="flex-1 flex items-center gap-3">
        <div className="text-2xl font-bold text-green-600">Vreeker BV</div>
        <div className="h-6 w-px bg-gray-300"></div>
        <div className="text-sm text-gray-600">
          <p className="font-medium text-gray-900">Beheeromgeving – Overzicht organisatie</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">Antoon</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
