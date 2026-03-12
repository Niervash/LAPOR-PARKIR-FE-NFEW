import React from "react";
import { Eye, SquareMenu, Trash2 } from "lucide-react";
import type { ReportAdmin } from "../../../types/admin.types.interface";

const statusLiarConfig = {
  Liar: { bg: "bg-red-100 text-red-700", label: "Liar" },
  "Tidak Liar": { bg: "bg-green-100 text-green-700", label: "Tidak Liar" },
} as const;

interface AdminReportTableProps {
  reports: ReportAdmin[];
  onView: (report: ReportAdmin) => void;
  onDelete: (id: string) => void;
  onNavigateDetail?: (id: string) => void; // untuk navigasi ke halaman detail
}

const AdminReportTable: React.FC<AdminReportTableProps> = ({
  reports,
  onView,
  onDelete,
  onNavigateDetail,
}) => {
  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-16 text-center">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Eye className="h-6 w-6 text-black" />
        </div>
        <p className="text-black font-semibold text-base">Belum ada laporan</p>
        <p className="text-gray-700 text-sm mt-1">
          Data laporan akan muncul di sini.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left px-5 py-3.5 font-medium text-gray-600 text-xs whitespace-nowrap">
                No
              </th>
              <th className="text-left px-5 py-3.5 font-medium text-gray-600 text-xs whitespace-nowrap">
                Tanggal dan Waktu
              </th>
              <th className="text-left px-5 py-3.5 font-medium text-gray-600 text-xs whitespace-nowrap">
                Hari
              </th>
              <th className="text-left px-5 py-3.5 font-medium text-gray-600 text-xs whitespace-nowrap">
                Latitude
              </th>
              <th className="text-left px-5 py-3.5 font-medium text-gray-600 text-xs whitespace-nowrap">
                Longitude
              </th>
              <th className="text-left px-5 py-3.5 font-medium text-gray-600 text-xs whitespace-nowrap">
                Lokasi
              </th>
              <th className="text-left px-5 py-3.5 font-medium text-gray-600 text-xs whitespace-nowrap">
                Identitas Petugas
              </th>
              <th className="text-left px-5 py-3.5 font-medium text-gray-600 text-xs whitespace-nowrap">
                Prediction
              </th>
              <th className="text-left px-5 py-3.5 font-medium text-gray-600 text-xs whitespace-nowrap">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => {
              const statusLiarKey =
                report.status as keyof typeof statusLiarConfig;
              const statusLiar =
                statusLiarConfig[statusLiarKey] ||
                statusLiarConfig["Tidak Liar"];

              return (
                <tr
                  key={report.id}
                  className="border-b border-gray-200 last:border-0 hover:bg-sky-50 transition-colors duration-150 group"
                >
                  <td className="px-5 py-4 text-black text-xs font-mono whitespace-nowrap">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-[13px] whitespace-nowrap">
                    {new Date(report.tanggaldanwaktu).toLocaleString("id-ID")}
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-[13px] whitespace-nowrap">
                    {report.hari}
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-[13px] whitespace-nowrap">
                    {report.latitude}
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-[13px] whitespace-nowrap">
                    {report.longitude}
                  </td>
                  <td className="px-5 py-4 max-w-45 truncate text-gray-800 text-[13px]">
                    {report.lokasi}
                  </td>
                  <td className="px-5 py-4 text-gray-600 text-[13px] whitespace-nowrap">
                    {report.identitas_petugas}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold ${statusLiar.bg}`}
                    >
                      {statusLiar.label}
                    </span>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      {/* Tombol SquareMenu untuk navigasi ke halaman detail */}
                      <button
                        onClick={() => onNavigateDetail?.(report.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-300 text-black transition"
                        title="Lihat Detail Halaman"
                      >
                        <SquareMenu className="h-3.5 w-3.5" />
                      </button>
                      {/* Tombol Eye untuk modal detail */}
                      <button
                        onClick={() => onView(report)}
                        className="p-1.5 rounded-lg hover:bg-sky-300 text-blue-700 transition"
                        title="Detail Modal"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => onDelete(report.id)}
                        className="p-1.5 rounded-lg hover:bg-red-200 text-red-800 transition"
                        title="Hapus"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReportTable;
