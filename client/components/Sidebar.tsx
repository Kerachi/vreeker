import { LayoutDashboard, Calendar, Briefcase, FileText, Users, MessageSquare, Package, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
  { id: "personeel", label: "Personeel", icon: <Users className="w-5 h-5" />, href: "/personeel" },
  { id: "berichten", label: "Berichten", icon: <MessageSquare className="w-5 h-5" />, href: "/berichten" },
  { id: "prodist", label: "Prodist", icon: <Package className="w-5 h-5" />, href: "/prodist" },
  { id: "instellingen", label: "Instellingen", icon: <Settings className="w-5 h-5" />, href: "/instellingen" },
];

export default function Sidebar() {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto pt-6">
      <nav className="px-3 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive(item.href)
                ? "bg-green-50 text-green-600 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
