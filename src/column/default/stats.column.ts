import React from "react";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react"; // adjust import based on your icon library

interface StatItem {
  label: string;
  value: number; // assuming values are numbers
  icon: React.ComponentType<{ className?: string }>; // type for icon components
  gradient: string;
  iconColor: string;
  borderColor: string;
}

const stats: StatItem[] = [
  {
    label: "Total Laporan",
    value: total,
    icon: FileText,
    gradient: "from-primary/10 to-accent/10",
    iconColor: "text-primary",
    borderColor: "border-primary/20",
  },
  {
    label: "Pending",
    value: pending,
    icon: Clock,
    gradient: "from-yellow-50 to-orange-50",
    iconColor: "text-yellow-600",
    borderColor: "border-yellow-200",
  },
  {
    label: "Approved",
    value: approved,
    icon: CheckCircle,
    gradient: "from-green-50 to-emerald-50",
    iconColor: "text-green-600",
    borderColor: "border-green-200",
  },
  {
    label: "Rejected",
    value: rejected,
    icon: XCircle,
    gradient: "from-red-50 to-rose-50",
    iconColor: "text-red-500",
    borderColor: "border-red-200",
  },
];

export { stats };
