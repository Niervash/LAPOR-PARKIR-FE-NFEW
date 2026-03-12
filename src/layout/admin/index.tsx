import React, { useState, useEffect } from "react";
import { Menu, ChevronLeft, ChevronRight, Bell, User2 } from "lucide-react";
import { AdminSidebar } from "../../component";
import { GetDataPetugas } from "../../services/admin.service";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasNewData, setHasNewData] = useState(false);
  const [lastDataCount, setLastDataCount] = useState(0);

  // Fungsi untuk mengecek data baru
  const checkNewData = async () => {
    try {
      const res = await GetDataPetugas();
      let currentCount = 0;
      if (Array.isArray(res)) {
        currentCount = res.length;
      } else if (res?.data && Array.isArray(res.data)) {
        currentCount = res.data.length;
      } else if (res?.data?.data && Array.isArray(res.data.data)) {
        currentCount = res.data.data.length;
      }

      if (currentCount > lastDataCount) {
        setHasNewData(true);
      }
      // Update lastDataCount dengan nilai terbaru (opsional)
      setLastDataCount(currentCount);
    } catch (error) {
      console.error("Gagal mengecek data baru:", error);
    }
  };

  // Polling setiap 30 detik
  useEffect(() => {
    checkNewData(); // cek saat pertama
    const interval = setInterval(checkNewData, 30000);
    return () => clearInterval(interval);
  }, [lastDataCount]);

  // Fungsi sinkronisasi: trigger event ke halaman anak
  const handleSync = () => {
    window.dispatchEvent(new CustomEvent("sync-data"));
    setHasNewData(false);
    // Update lastDataCount setelah sinkron
    checkNewData();
  };

  return (
    <div className="min-h-screen flex w-full bg-[#F7F8F0]">
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-[#355872] shrink-0 transition-all duration-300 sticky top-0 h-screen z-40 ${
          sidebarOpen ? "w-60" : "w-20"
        }`}
      >
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setMobileOpen={setMobileOpen}
          hasNewData={hasNewData}
          onSync={handleSync}
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
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#355872] transform transition-transform md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar
          sidebarOpen={true}
          setMobileOpen={setMobileOpen}
          hasNewData={hasNewData}
          onSync={handleSync}
        />
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-gray-800 p-1.5 hover:bg-[#9CD5FF]/20 rounded-lg transition"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
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
          <div className="flex-1">
            <h1 className="text-base font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {" "}
            <Bell />
            <User2 />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
