import React from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface TopNavProps {
  currentIndex: number;
  total: number;
  prevReportId: string | null;
  nextReportId: string | null;
  onNavigate: (id: string) => void;
  onBack: () => void;
}

const TopNav: React.FC<TopNavProps> = ({
  currentIndex,
  total,
  prevReportId,
  nextReportId,
  onNavigate,
  onBack,
}) => {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-black hover:text-gray-500 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali
      </button>

      <div className="flex items-center gap-2">
        <span className="text-xs text-black font-medium">
          {currentIndex + 1} / {total}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => prevReportId && onNavigate(prevReportId)}
            disabled={!prevReportId}
            className="p-2 rounded-xl border border-gray-100  bg-white text-blackhover:text-foreground hover:border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Sebelumnya"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => nextReportId && onNavigate(nextReportId)}
            disabled={!nextReportId}
            className="p-2 rounded-xl border border-gray-100 bg-white text-black hover:text-foreground hover:border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            title="Selanjutnya"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
