// AdminLayout.tsx
import React, { useState, useEffect } from "react";
import { Menu, ChevronLeft, ChevronRight, Bell, LogOut } from "lucide-react";
import { AdminSidebar } from "../../component";
import { GetDataPetugas } from "../../services/admin.service";

interface AdminLayoutProps {
  children: React.ReactNode;
  user: { name: string; role?: string } | null;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  user,
  onLogout,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasNewData, setHasNewData] = useState(false);
  const [lastDataCount, setLastDataCount] = useState(0);
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncing, setSyncing] = useState(false);

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
      setLastDataCount(currentCount);
    } catch (error) {
      console.error("Gagal mengecek data baru:", error);
    }
  };

  useEffect(() => {
    checkNewData();
    const interval = setInterval(checkNewData, 30000);
    return () => clearInterval(interval);
  }, [lastDataCount]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      await checkNewData();
      window.dispatchEvent(new CustomEvent("sync-data"));
      setHasNewData(false);
      setShowSyncModal(false);
    } catch (error) {
      console.error("Sinkronisasi gagal", error);
    } finally {
      setSyncing(false);
    }
  };

  const openSyncModal = () => {
    setShowSyncModal(true);
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-gray-800 shrink-0 transition-all duration-300 sticky top-0 h-screen ${
          sidebarOpen ? "w-60" : "w-20"
        }`}
      >
        <AdminSidebar
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
        <AdminSidebar
          sidebarOpen={true}
          setMobileOpen={setMobileOpen}
          user={user}
          onLogout={onLogout}
        />
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-6 gap-3 sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-gray-800 p-1.5 hover:bg-amber-100/20 rounded-lg transition"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
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
          <div className="flex-1">
            <h1 className="text-base font-semibold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={openSyncModal}
              className="p-2 hover:bg-amber-100/20 rounded-xl transition text-gray-500 relative"
              aria-label="Notifikasi"
            >
              <Bell className="h-[18px] w-[18px]" />
              {hasNewData && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>
            <div className="w-8 h-8 bg-amber-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>
            <button
              onClick={onLogout}
              className="p-2 hover:bg-amber-100/20 rounded-xl transition text-gray-500"
              title="Keluar"
            >
              <LogOut className="h-[18px] w-[18px]" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>

      {/* Modal Sinkronisasi */}
      {showSyncModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Notifikasi
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {hasNewData
                ? "Ada data laporan baru. Sinkronkan untuk melihat data terbaru."
                : "Tidak ada data baru."}
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSyncModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Tutup
              </button>
              {hasNewData && (
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {syncing ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Menyinkron...
                    </>
                  ) : (
                    "Sinkron"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
