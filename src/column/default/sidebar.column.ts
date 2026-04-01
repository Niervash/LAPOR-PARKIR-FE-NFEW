import {
  FileText,
  FlagTriangleLeft,
  FlagTriangleRightIcon,
  LayoutDashboard,
} from "lucide-react";

const userMenuItems = [
  { title: "Dashboard", path: "/user/dashboard", icon: LayoutDashboard },
  {
    title: "Juru Parkir Liar",
    path: "/user/dashboard/reports/petugas-liar",
    icon: FlagTriangleLeft,
  },
  {
    title: "Pelanggaran Parkir",
    path: "/user/dashboard/report",
    icon: FlagTriangleRightIcon,
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
