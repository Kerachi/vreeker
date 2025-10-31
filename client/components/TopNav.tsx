import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function TopNav() {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center px-6 gap-6 shadow-sm">
      <div className="flex-1 flex items-center gap-4">
        <div className="text-2xl font-bold text-green-600">
          Vreeker BV
        </div>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Zoeken..."
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-900">Jan Pieters</p>
            <p className="text-xs text-gray-500">Beheerder</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
