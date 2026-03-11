import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { ReportAdmin } from "../../../types/admin.types.interface";

interface LokasiTerbanyakProps {
  reports: ReportAdmin[];
}

const LokasiTerbanyak: React.FC<LokasiTerbanyakProps> = ({ reports }) => {
  // Filter hanya laporan dengan status "Liar"
  const liarReports = reports.filter((r) => r.status === "Liar");

  // Hitung frekuensi setiap lokasi
  const locationCount: Record<string, number> = {};
  liarReports.forEach((report) => {
    const lokasi = report.lokasi?.trim();
    if (lokasi) {
      locationCount[lokasi] = (locationCount[lokasi] || 0) + 1;
    }
  });

  // Ubah ke array, urutkan descending, ambil 6 teratas
  const locationData = Object.entries(locationCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  // Jika tidak ada data pelanggaran liar
  if (locationData.length === 0) {
    return (
      <div className="bg-white h-55 flex items-center justify-center">
        <p className="text-gray-500">Tidak ada data pelanggaran liar</p>
      </div>
    );
  }

  // Custom tooltip (opsional, bisa diganti dengan Tooltip bawaan)
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white rounded-xl px-3 py-2 shadow-lg text-xs">
        <p className="font-medium text-black mb-1">{label}</p>
        <p>
          <span
            className="inline-block w-2 h-2 rounded-full mr-1.5"
            style={{ backgroundColor: payload[0].color }}
          />
          Jumlah:{" "}
          <span className="font-semibold text-black">{payload[0].value}</span>
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white h-55 flex items-center">
      <ResponsiveContainer width="90%" height="100%">
        <BarChart data={locationData} layout="vertical" barSize={14}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(204, 20%, 85%)"
            strokeOpacity={0.5}
            horizontal={false}
          />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fontSize: 11 }}
            stroke="hsl(204, 20%, 45%)"
          />
          <YAxis
            dataKey="name"
            type="category"
            width={100}
            tick={{ fontSize: 11 }}
            stroke="hsl(204, 20%, 45%)"
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="value"
            name="Laporan Liar"
            fill="#ef4444" // warna merah untuk status Liar
            radius={[0, 6, 6, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LokasiTerbanyak;
