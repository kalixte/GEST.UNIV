import { Bell, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface TopNavProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  showSearch?: boolean;
  userName?: string;
}

export default function TopNav({
  title,
  breadcrumbs,
  showSearch = true,
  userName = "User",
}: TopNavProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="hidden md:block bg-white border-b border-border sticky top-0 z-30">
      <div className="ml-60 px-8 py-4 flex items-center justify-between">
        {/* Left side: Breadcrumbs and Title */}
        <div className="flex-1">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-2 mb-2 text-sm text-neutral-500">
              {breadcrumbs.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  {item.href ? (
                    <a href={item.href} className="hover:text-primary-500">
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-neutral-700">{item.label}</span>
                  )}
                </div>
              ))}
            </nav>
          )}
          <h1 className="text-2xl font-semibold text-neutral-900">{title}</h1>
        </div>

        {/* Right side: Search, Notifications, Avatar */}
        <div className="flex items-center gap-6">
          {showSearch && (
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                placeholder="Rechercher..."
                className={cn(
                  "w-full pl-10 pr-4 py-2 rounded-lg border border-border",
                  "bg-neutral-50 text-neutral-900 text-sm",
                  "placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                )}
              />
            </div>
          )}

          {/* Notifications */}
          <button className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <Bell size={20} className="text-neutral-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full" />
          </button>

          {/* User Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 hover:bg-neutral-100 px-3 py-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-semibold">
                {userName.charAt(0).toUpperCase()}
              </div>
              <ChevronDown size={16} className="text-neutral-600" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-neutral-900">{userName}</p>
                  <p className="text-xs text-neutral-500">user@example.com</p>
                </div>
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  Profil
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                >
                  Paramètres
                </a>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-danger-500 hover:bg-danger-50"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
