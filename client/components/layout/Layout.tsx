import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import { ReactNode } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface LayoutProps {
  children: ReactNode;
  userRole: "admin" | "rh" | "teacher";
  userName?: string;
  pageTitle: string;
  breadcrumbs?: BreadcrumbItem[];
  showSearch?: boolean;
}

export default function Layout({
  children,
  userRole,
  userName = "User",
  pageTitle,
  breadcrumbs,
  showSearch = true,
}: LayoutProps) {
  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar userRole={userRole} userName={userName} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:ml-60 md:pt-0 pt-16">
        {/* TopNav */}
        <TopNav
          title={pageTitle}
          breadcrumbs={breadcrumbs}
          showSearch={showSearch}
          userName={userName}
        />

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
