import React, { useState } from "react";
import { Menu, Bell, ChevronLeft, ChevronRight } from "lucide-react";
import { Sidebar } from "../../../component";

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: { name: string; email: string; role?: string } | null;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  user,
  onLogout,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-gray-800 flex-shrink-0 transition-all duration-300 sticky top-0 h-screen ${
          sidebarOpen ? "w-60" : "w-[68px]"
        }`}
      >
        <Sidebar
          sidebarOpen={sidebarOpen}
          setMobileOpen={setMobileOpen}
          user={user}
          onLogout={onLogout}
        />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-gray-800 transform transition-transform md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          sidebarOpen={true}
          setMobileOpen={setMobileOpen}
          user={user}
          onLogout={onLogout}
        />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-gray-800 p-1.5 hover:bg-amber-100/20 rounded-lg transition"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex text-gray-500 hover:text-gray-800 hover:bg-amber-100/20 p-1.5 rounded-lg transition"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>

          {/* Page title */}
          <div className="flex-1">
            <h1 className="text-base font-semibold text-gray-800">
              {user?.role === "admin" ? "Admin Dashboard" : "Dashboard"}
            </h1>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            <button
              className="p-2 hover:bg-amber-100/20 rounded-xl transition text-gray-500 relative"
              aria-label="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 bg-amber-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
