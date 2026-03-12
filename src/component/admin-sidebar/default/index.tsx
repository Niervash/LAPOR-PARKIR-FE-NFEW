import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Bell } from "lucide-react";
import { adminMenuItems } from "../../../column/default/sidebar.column";

interface SidebarProps {
  sidebarOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  hasNewData?: boolean;
  onSync?: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setMobileOpen,
  hasNewData = false,
  onSync,
}) => {
  const location = useLocation();
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const handleNotificationClick = () => {
    setShowNotificationModal(true);
  };

  const handleSync = () => {
    if (onSync) onSync();
    setShowNotificationModal(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#355872] text-white">
      {/* Header dengan logo dan notifikasi */}
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          {sidebarOpen && (
            <Link to="/">
              <span className="text-white font-bold text-lg tracking-tight">
                Lapor Parkir
              </span>
            </Link>
          )}
        </div>
        {/* Ikon Notifikasi (hanya tampil jika sidebar terbuka) */}
        {sidebarOpen && (
          <button
            onClick={handleNotificationClick}
            className="relative p-2 rounded-lg hover:bg-[#4a6b8a] transition"
            title="Notifikasi"
          >
            <Bell className="h-5 w-5 text-white" />
            {hasNewData && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 mt-2 space-y-1">
        {adminMenuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-sm font-medium ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-200 hover:bg-[#4a6b8a] hover:text-white"
              }`}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              {sidebarOpen && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Modal Notifikasi */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
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
                onClick={() => setShowNotificationModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Tutup
              </button>
              {hasNewData && (
                <button
                  onClick={handleSync}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  Sinkron
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
