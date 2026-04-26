import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

interface SidebarProps {
  userRole: "admin" | "rh" | "teacher";
  userName?: string;
}

const getNavItems = (role: "admin" | "rh" | "teacher"): NavItem[] => {
  const baseItems: NavItem[] = [];

  if (role === "admin") {
    baseItems.push(
      { label: "Tableau de bord", href: "/admin", icon: <LayoutDashboard size={20} /> },
      { label: "Enseignants", href: "/admin/teachers", icon: <Users size={20} /> },
      { label: "Matières", href: "/admin/courses", icon: <BookOpen size={20} /> },
      { label: "Paramètres", href: "/admin/settings", icon: <Settings size={20} /> },
      { label: "Journal des actions", href: "/admin/logs", icon: <Menu size={20} /> }
    );
  } else if (role === "rh") {
    baseItems.push(
      { label: "Tableau de bord", href: "/rh", icon: <LayoutDashboard size={20} /> },
      { label: "Saisie des heures", href: "/rh/entry", icon: <Menu size={20} /> },
      { label: "Validation", href: "/rh/validation", icon: <Users size={20} /> },
      { label: "États de paiement", href: "/rh/payroll", icon: <BookOpen size={20} /> }
    );
  } else if (role === "teacher") {
    baseItems.push(
      { label: "Mon Tableau de bord", href: "/teacher", icon: <LayoutDashboard size={20} /> },
      { label: "Mon Récapitulatif", href: "/teacher/summary", icon: <BookOpen size={20} /> }
    );
  }

  return baseItems;
};

export default function Sidebar({ userRole, userName = "User" }: SidebarProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = getNavItems(userRole);

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="px-6 py-6 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center text-white font-bold text-lg">
            E
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">EduHeures</h1>
            <p className="text-xs text-neutral-500">Gestion des heures</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => setMobileOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all text-sm font-medium",
              isActive(item.href)
                ? "bg-primary-500 text-white"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* User Info */}
      <div className="px-4 py-6 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {userName}
            </p>
            <p className="text-xs text-neutral-500 capitalize">{userRole}</p>
          </div>
        </div>
        <button
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
            "text-sidebar-foreground hover:bg-sidebar-accent"
          )}
        >
          <LogOut size={18} />
          <span>Déconnexion</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 h-screen bg-sidebar-background fixed left-0 top-0 z-50">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar-background border-b border-sidebar-border flex items-center px-4 z-40">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 hover:bg-sidebar-accent rounded-lg"
        >
          {mobileOpen ? (
            <X size={24} className="text-sidebar-foreground" />
          ) : (
            <Menu size={24} className="text-sidebar-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar Slide-over */}
      {mobileOpen && (
        <aside className="md:hidden flex flex-col w-60 h-screen bg-sidebar-background fixed left-0 top-0 z-40 overflow-y-auto">
          <div className="h-16" />
          <SidebarContent />
        </aside>
      )}
    </>
  );
}
