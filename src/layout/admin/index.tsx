import React, { useState } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { AdminSidebar } from "../../component";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-[#F7F8F0]">
      {/* Desktop sidebar - tambahkan z-40 agar di atas konten utama */}
      <aside
        className={`hidden md:flex flex-col bg-[#355872] shrink-0 transition-all duration-300 sticky top-0 h-screen z-40 ${
          sidebarOpen ? "w-60" : "w-68"
        }`}
      >
        <AdminSidebar sidebarOpen={sidebarOpen} setMobileOpen={setMobileOpen} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar - z-50 lebih tinggi dari konten */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#355872] transform transition-transform md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar sidebarOpen={true} setMobileOpen={setMobileOpen} />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-gray-800 p-1.5 hover:bg-[#9CD5FF]/20 rounded-lg transition"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Desktop sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex text-gray-500 hover:text-gray-800 hover:bg-[#9CD5FF]/20 p-1.5 rounded-lg transition"
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
              Admin Dashboard
            </h1>
          </div>

          {/* Right side icons - kosong */}
          <div className="flex items-center gap-3"></div>
        </header>

        {/* Main content area - tidak perlu z-index, konten di dalamnya akan relatif */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
