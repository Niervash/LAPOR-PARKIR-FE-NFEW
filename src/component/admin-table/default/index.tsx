import React from "react";
import { Eye, ImageIcon, CheckCircle, XCircle, Trash2 } from "lucide-react";
import type { Report } from "../../../types/map.types.interface"; // adjust path as needed

// Status configuration aligned with ReportStatus ("pending" | "approve" | "reject")
const statusConfig = {
  pending: {
    label: "Pending",
    dot: "bg-yellow-500",
    bg: "bg-yellow-100 text-yellow-700",
  },
  approve: {
    label: "Approved",
    dot: "bg-green-500",
    bg: "bg-green-100 text-green-700",
  },
  reject: {
    label: "Rejected",
    dot: "bg-red-500",
    bg: "bg-red-100 text-red-700",
  },
};

interface AdminReportTableProps {
  reports: Report[];
  isAdmin?: boolean;
  onView: (report: Report) => void;
  onDelete: (id: string) => void;
  onViewPhoto?: (url: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const AdminReportTable: React.FC<AdminReportTableProps> = ({
  reports,
  isAdmin = false,
  onView,
  onDelete,
  onViewPhoto,
  onApprove,
  onReject,
}) => {
  if (reports.length === 0) {
    return (
      <div className="bg-white rounded-2xl  p-16 text-center">
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
              <th className="text-left px-5 py-3.5 font-medium text-muted-black/70 text-xs">
                No
              </th>
              {isAdmin && (
                <th className="text-left px-5 py-3.5 font-medium text-muted-black/70 text-xs">
                  Pelapor
                </th>
              )}
              <th className="text-left px-5 py-3.5 font-medium text-muted-black/70 text-xs">
                Tanggal
              </th>
              <th className="text-left px-5 py-3.5 font-medium text-muted-black/70 text-xs">
                Lokasi
              </th>
              <th className="text-left px-5 py-3.5 font-medium text-muted-black/70 text-xs">
                Status
              </th>
              <th className="text-left px-5 py-3.5 font-medium text-muted-black/70 text-xs">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => {
              // Use statusPost field (always present in Report)
              const status =
                statusConfig[report.statusPost] || statusConfig.pending;

              return (
                <tr
                  key={report.id}
                  className="border-b border-gray-200 last:border-0 hover:bg-sky-50 transition-colors duration-150 group"
                >
                  <td className="px-5 py-4 text-black text-xs font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  {isAdmin && (
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-linear-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center text-[10px] font-bold text-primary">
                          {report.namaPetugas?.charAt(0).toUpperCase() || "?"}
                        </div>
                        <span className="font-medium text-foreground text-[13px]">
                          {report.namaPetugas || "Tidak diketahui"}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="px-5 py-4 text-muted-foreground text-[13px]">
                    {report.createdAt}
                  </td>
                  <td className="px-5 py-4 max-w-45 truncate text-foreground text-[13px]">
                    {report.location}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold ${status.bg}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                      />
                      {status.label}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onView(report)}
                        className="p-1.5 rounded-lg hover:bg-gray-300 text-black transition"
                        title="Detail"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      {report.photoUrl && onViewPhoto && (
                        <button
                          onClick={() => onViewPhoto(report.photoUrl!)}
                          className="p-1.5 rounded-lg hover:bg-blue-200 text-black transition"
                          title="Lihat Foto"
                        >
                          <ImageIcon className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {isAdmin &&
                        onApprove &&
                        report.statusPost === "pending" && (
                          <>
                            <button
                              onClick={() => onApprove(report.id)}
                              className="p-1.5 rounded-lg hover:bg-green-200 text-green-900 font-bold transition"
                              title="Approve"
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => onReject?.(report.id)}
                              className="p-1.5 rounded-lg hover:bg-red-200 text-red-900  transition"
                              title="Reject"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      <button
                        onClick={() => onDelete(report.id)}
                        className="p-1.5 rounded-lg hover:bg-red-200 text-red-900 hover:text-red-900 transition"
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
