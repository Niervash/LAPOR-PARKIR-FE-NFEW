import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

// Example data – replace with your actual data
const statusData = [
  { name: "aprove", value: 400, fill: "#355872" },
  { name: "pending", value: 300, fill: "#7AAACE" },
  { name: "reject", value: 200, fill: "#9CD5FF" },
];

// Custom tooltip component (optional)
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

const StatusDistribusi: React.FC = () => {
  return (
    <div>
      <div className="bg-white h-55 flex items-center ">
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
                <p className="text-xs text-muted-black">{item.name}</p>
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
