import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, LayoutDashboard, FileText, User } from "lucide-react";
import { adminMenuItems } from "../../../column/default/sidebar.column";

interface SidebarProps {
  sidebarOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setMobileOpen,
}) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 ">
      {/* Logo Section */}
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
          <Shield className="h-5 w-5 text-blue-600" />
        </div>
        {sidebarOpen && (
          <Link to="/">
            <span className="text-gray-900 font-bold text-lg tracking-tight">
              Lapor Parkir
            </span>
          </Link>
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
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              {sidebarOpen && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bagian user & logout dihapus sementara */}
    </div>
  );
};

export default AdminSidebar;
