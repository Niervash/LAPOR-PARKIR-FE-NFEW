import { FileText, LayoutDashboard } from "lucide-react";

const userMenuItems = [
  { title: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
  {
    title: "Juru Parkir Liar",
    path: "/user/dashboard/reports/petugas-liar",
    icon: FileText,
  },
  {
    title: "Pelanggaran Parkir",
    path: "/user/dashboard/report",
    icon: FileText,
  },
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
