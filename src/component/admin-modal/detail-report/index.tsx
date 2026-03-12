// DetailReport.tsx
import React from "react";
import { FileText, User, Calendar, MapPin, Navigation } from "lucide-react";
import type { ReportItem } from "../../../types/admin.types.interface";

interface DetailReportProps {
  report: ReportItem;
}

const statusConfig = {
  Liar: { label: "Liar", bg: "bg-red-100 text-red-700", dot: "bg-red-500" },
  "Tidak Liar": {
    label: "Tidak Liar",
    bg: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
};

const DetailReport: React.FC<DetailReportProps> = ({ report }) => {
  const status = statusConfig[report.status] || statusConfig["Tidak Liar"];

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-200">
              <FileText className="h-4 w-4 text-blue-900" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-black">Detail Laporan</h1>
              <p className="text-xs text-gray-700 font-mono mt-0.5">
                ID: {report.identitas_petugas}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${status.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                <User className="h-3 w-3 text-black" />
                <span className="text-[10px] text-gray-700 uppercase tracking-wider font-medium">
                  Pelapor
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600">{report.nama}</p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Calendar className="h-3 w-3 text-black" />
                <span className="text-[10px] text-gray-700 uppercase tracking-wider font-medium">
                  Tanggal & Waktu
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {new Date(report.tanggaldanwaktu).toLocaleString("id-ID")}
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                <MapPin className="h-3 w-3 text-black" />
                <span className="text-[10px] text-gray-700 uppercase tracking-wider font-medium">
                  Lokasi
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600">
                {report.lokasi}
              </p>
            </div>
            <div className="bg-gray-100 rounded-xl p-4">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Calendar className="h-3 w-3 text-black" />
                <span className="text-[10px] text-gray-700 uppercase tracking-wider font-medium">
                  Hari
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600">{report.hari}</p>
            </div>
          </div>

          {report.akurasi !== undefined && (
            <div>
              <p className="text-[10px] text-gray-700 uppercase tracking-wider font-medium mb-2">
                Akurasi
              </p>
              <p className="text-sm text-gray-600 bg-gray-100 p-4 rounded-xl border border-gray-100">
                {report.akurasi} meter
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl border border-gray-100">
            <Navigation className="h-3.5 w-3.5 text-black" />
            <span className="text-xs text-gray-600 font-mono">
              {Number(report.latitude).toFixed(6)},{" "}
              {Number(report.longitude).toFixed(6)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailReport;
