import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  FileText,
  Users,
  MessageSquare,
  Package,
  Settings,
  Zap,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/",
  },
  {
    id: "planning",
    label: "Planning",
    icon: <Calendar className="w-5 h-5" />,
    href: "/planning",
  },
  {
    id: "projecten",
    label: "Projecten",
    icon: <Briefcase className="w-5 h-5" />,
    href: "/projecten",
  },
  {
    id: "documenten",
    label: "Documenten",
    icon: <FileText className="w-5 h-5" />,
    href: "/documenten",
  },
  {
    id: "personeel",
    label: "Personeel",
    icon: <Users className="w-5 h-5" />,
    href: "/personeel",
  },
  {
    id: "berichten",
    label: "Berichten",
    icon: <MessageSquare className="w-5 h-5" />,
    href: "/berichten",
  },
  {
    id: "prodist",
    label: "Prodist",
    icon: <Package className="w-5 h-5" />,
    href: "/prodist",
  },
  {
    id: "automatiseringen",
    label: "Automatiseringen (Zapier AI)",
    icon: <Zap className="w-5 h-5" />,
    href: "/automatiseringen",
  },
  {
    id: "instellingen",
    label: "Instellingen",
    icon: <Settings className="w-5 h-5" />,
    href: "/instellingen",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [badgeVisible, setBadgeVisible] = useState<boolean>(() => {
    const savedState = localStorage.getItem("zapier-badge-seen");
    return !savedState;
  });

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const handleZapierClick = () => {
    if (badgeVisible) {
      setBadgeVisible(false);
      localStorage.setItem("zapier-badge-seen", "true");
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto pt-6">
      <nav className="px-3 space-y-2">
        {navItems.map((item) => {
          const showBadge =
            badgeVisible && item.id === "automatiseringen";

          return (
            <Link
              key={item.id}
              to={item.href}
              onClick={handleZapierClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.href)
                  ? "bg-green-50 text-green-600 font-medium"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              <span className="flex items-center gap-2">
                {item.label}
                {showBadge && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="badge-new">NEW</span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="right"
                      className="bg-orange-900 text-white border-orange-800"
                    >
                      Nieuwe AI-functie beschikbaar — automatisering met Zapier
                      AI!
                    </TooltipContent>
                  </Tooltip>
                )}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
