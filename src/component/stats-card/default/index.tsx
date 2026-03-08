import React from "react";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import type { Report } from "../../../types/map.types.interface";

interface StatsCardProps {
  reports: Report[];
}

const StatsCard: React.FC<StatsCardProps> = ({ reports }) => {
  const total = reports.length;
  const pending = reports.filter((r) => r.statusPost === "pending").length;
  const approved = reports.filter((r) => r.statusPost === "approve").length;
  const rejected = reports.filter((r) => r.statusPost === "reject").length;

  const stats = [
    {
      label: "Total Laporan",
      value: total,
      icon: FileText,
      bg: "bg-white",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      borderColor: "border-gray-200",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock,
      bg: "bg-white",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
      borderColor: "border-gray-200",
    },
    {
      label: "Approved",
      value: approved,
      icon: CheckCircle,
      bg: "bg-white",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      borderColor: "border-gray-200",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      bg: "bg-white",
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      borderColor: "border-gray-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`${s.bg} rounded-2xl border ${s.borderColor} p-5 transition hover:shadow-md`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {s.label}
              </p>
              <p className="text-3xl font-bold mt-1 text-gray-900">{s.value}</p>
            </div>
            <div className={`p-2.5 rounded-xl ${s.iconBg} shadow-sm`}>
              <s.icon className={`h-5 w-5 ${s.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
