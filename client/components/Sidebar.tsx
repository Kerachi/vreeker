import { LayoutDashboard, Calendar, Briefcase, FileText, MessageSquare, Settings } from "lucide-react";
import { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, href: "/" },
  { id: "planning", label: "Planning", icon: <Calendar className="w-5 h-5" />, href: "/planning" },
  { id: "projecten", label: "Projecten", icon: <Briefcase className="w-5 h-5" />, href: "/projecten" },
  { id: "documenten", label: "Documenten", icon: <FileText className="w-5 h-5" />, href: "/documenten" },
  { id: "berichten", label: "Berichten", icon: <MessageSquare className="w-5 h-5" />, href: "/berichten" },
  { id: "instellingen", label: "Instellingen", icon: <Settings className="w-5 h-5" />, href: "/instellingen" },
];

export default function Sidebar() {
  const [activeId, setActiveId] = useState("dashboard");

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto pt-6">
      <nav className="px-3 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveId(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeId === item.id
                ? "bg-green-50 text-green-600 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
