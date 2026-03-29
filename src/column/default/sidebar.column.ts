import { FileText, LayoutDashboard } from "lucide-react";

const userMenuItems = [
  { title: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
  { title: "Laporan Saya", path: "/user/dashboard/report", icon: FileText },
];

const adminMenuItems = [
  { title: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  {
    title: "Detail Pelaporan",
    path: "/admin/dashboard/report/:id",
    icon: FileText,
  },
];

export { userMenuItems, adminMenuItems };
