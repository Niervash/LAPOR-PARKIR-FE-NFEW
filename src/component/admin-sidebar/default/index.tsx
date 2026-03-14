// AdminSidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, LogOut } from "lucide-react";
import { adminMenuItems } from "../../../column/default/sidebar.column";

interface SidebarProps {
  sidebarOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  user?: { name: string; role?: string } | null;
  onLogout?: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setMobileOpen,
  user,
  onLogout,
}) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white">
      {/* Header dengan logo */}
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
          <Shield className="h-5 w-5 text-amber-600" />
        </div>
        {sidebarOpen && (
          <Link to="/">
            <span className="text-white font-bold text-lg tracking-tight">
              Lapor Parkir
            </span>
          </Link>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 mt-2 space-y-1 overflow-y-auto">
        {adminMenuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-sm font-medium ${
                active
                  ? "bg-amber-600 text-white"
                  : "text-gray-200 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              {sidebarOpen && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-3 border-t border-gray-700">
        {sidebarOpen && user && (
          <div className="px-3 py-2.5 mb-2">
            <p className="text-white text-sm font-semibold truncate">
              {user.name} {user.role === "admin" && "(Admin)"}
            </p>
            <p className="text-gray-400 text-xs truncate">{user.role}</p>
          </div>
        )}
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-200 hover:bg-gray-700 hover:text-white transition text-sm w-full"
          >
            <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
            {sidebarOpen && <span>Keluar</span>}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminSidebar;
