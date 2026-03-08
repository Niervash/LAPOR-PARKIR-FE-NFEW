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

// Sample data – replace with your actual data
const locationData = [
  { name: "Jakarta", value: 120 },
  { name: "Bandung", value: 98 },
  { name: "Surabaya", value: 86 },
  { name: "Medan", value: 72 },
  { name: "Semarang", value: 55 },
  { name: "Yogyakarta", value: 42 },
];

// Optional custom tooltip (you can remove this and use <Tooltip /> only)
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl px-3 py-2 shadow-lg text-xs">
      {label && <p className="font-medium text-black mb-1">{label}</p>}
      {payload.map((p: any, i: number) => (
        <p key={i} className="text-muted-foreground">
          <span
            className="inline-block w-2 h-2 rounded-full mr-1.5"
            style={{ backgroundColor: p.color }}
          />
          {p.name}: <span className="font-semibold text-black">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

const LokasiTerbanyak: React.FC = () => {
  return (
    <div className="bg-white h-55 flex items-center ">
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
            name="Laporan"
            fill="hsl(207, 42%, 63%)"
            radius={[0, 6, 6, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LokasiTerbanyak;
