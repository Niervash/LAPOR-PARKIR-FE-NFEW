import { FileText, LayoutDashboard, User } from "lucide-react";

const userMenuItems = [
  { title: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
  { title: "Laporan Saya", path: "/user/dashboard/report", icon: FileText },
  { title: "Profil", path: "/user/dashboard/profile", icon: User },
];

const adminMenuItems = [
  { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  {
    title: "Detail Pelaporan",
    path: "/admin/dashboard/report/44",
    icon: FileText,
  },
  { title: "Profil", path: "/admin/dashboard/profile", icon: User },
];

export { userMenuItems, adminMenuItems };
