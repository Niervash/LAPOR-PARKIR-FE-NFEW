import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import type { ReportAdmin } from "../../../types/admin.types.interface";

interface StatusDistribusiProps {
  reports: ReportAdmin[]; // data laporan dari dashboard
}

const StatusDistribusi: React.FC<StatusDistribusiProps> = ({ reports }) => {
  // Hitung jumlah berdasarkan status
  const countLiar = reports.filter((r) => r.status === "Liar").length;
  const countTidakLiar = reports.filter((r) => r.status === "Tidak Liar").length;

  // Data untuk pie chart
  const statusData = [
    { name: "Liar", value: countLiar, fill: "#ef4444" }, // merah
    { name: "Tidak Liar", value: countTidakLiar, fill: "#10b981" }, // hijau
  ].filter((item) => item.value > 0); // hanya tampilkan jika >0 (opsional)

  // Jika tidak ada data sama sekali
  if (reports.length === 0) {
    return (
      <div className="bg-white h-55 flex items-center justify-center">
        <p className="text-gray-500">Tidak ada data</p>
      </div>
    );
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const data = payload[0].payload;
    return (
      <div className="bg-white rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-medium text-black mb-1">{data.name}</p>
        <p>
          <span
            className="inline-block w-2 h-2 rounded-full mr-1.5"
            style={{ backgroundColor: data.fill }}
          />
          Jumlah: <span className="font-semibold text-black">{data.value}</span>
        </p>
      </div>
    );
  };

  return (
    <div>
      <div className="bg-white h-55 flex items-center">
        <ResponsiveContainer width="60%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {statusData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-3">
          {statusData.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.fill }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-black capitalize">
                  {item.name}
                </p>
                <p className="text-sm font-bold text-black">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusDistribusi;