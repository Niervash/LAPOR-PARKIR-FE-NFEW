import React from "react";
import {
  statusConfig,
  type Report,
} from "../../../column/default/overview.column";

interface QuickNavProps {
  reports: Report[];
  currentReportId: string;
  onSelect: (id: string) => void;
}

const QuickNav: React.FC<QuickNavProps> = ({
  reports,
  currentReportId,
  onSelect,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-foreground">
          Navigasi Cepat
        </h2>
      </div>
      <div className="p-3 space-y-1 max-h-70 overflow-y-auto">
        {reports.map((r, i) => {
          const s = statusConfig[r.status] || statusConfig["Tidak Liar"];
          const isActive = r.id === currentReportId;
          return (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition-all text-xs ${
                isActive
                  ? "bg-gray-100 border border-gray-100"
                  : "hover:bg-gray-100/50 border border-gray-100"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`font-semibold ${isActive ? "text-black" : "text-black"}`}
                >
                  #{String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-semibold ${s.bg}`}
                >
                  <span className={`w-1 h-1 rounded-full ${s.dot}`} />
                  {s.label}
                </span>
              </div>
              <p className="text-muted-foreground truncate">{r.location}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickNav;
