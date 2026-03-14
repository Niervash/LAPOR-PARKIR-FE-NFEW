import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Shield } from "lucide-react";
import { userMenuItems } from "../../../column";
import { ILoveparkir } from "../../../assets";

interface SidebarProps {
  sidebarOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebarOpen,
  setMobileOpen,
  user,
  onLogout,
}) => {
  const location = useLocation();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Logo Section */}
      <div className="p-5 flex items-center gap-3">
        <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
          <img src={ILoveparkir} alt="logo" className="w-5 h-5" />
        </div>
        {sidebarOpen && (
          <Link to={"/"}>
            <span className="text-gray-900 font-bold text-lg tracking-tight">
              Lapor Parkir
            </span>
          </Link>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 mt-2 space-y-1">
        {userMenuItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-sm font-medium ${
                active
                  ? "bg-amber-50 text-amber-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
              {sidebarOpen && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-3 border-t border-gray-100">
        {sidebarOpen && user && (
          <div className="px-3 py-2.5 mb-2">
            <p className="text-gray-900 text-sm font-semibold truncate">
              {user.name}
            </p>
            <p className="text-gray-500 text-xs truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition text-sm w-full"
        >
          <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
          {sidebarOpen && <span>Keluar</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
