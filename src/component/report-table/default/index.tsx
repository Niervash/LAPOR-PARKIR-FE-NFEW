import React from "react";
import { Eye, Image, CheckCircle, XCircle, Trash2 } from "lucide-react";
import type { Report } from "../../../types/map.types.interface";

interface ReportTableProps {
  reports: Report[];
  isAdmin?: boolean;
  onView: (report: Report) => void;
  onViewPhoto?: (url: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const ReportTable: React.FC<ReportTableProps> = ({
  reports,
  isAdmin = false,
  onView,
  onViewPhoto,
  onApprove,
  onReject,
}) => {
  if (reports.length === 0) {
    return (
      <div
        className="rounded-2xl shadow-sm border p-12 text-center"
        style={{ backgroundColor: "#F7F8F0", borderColor: "#9CD5FF" }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "#9CD5FF" }}
        >
          <Eye className="h-7 w-7" style={{ color: "#355872" }} />
        </div>
        <p className="font-medium text-lg text-gray-900">Belum ada laporan</p>
        <p className="text-sm mt-1 text-gray-600">
          Data laporan akan muncul di sini.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl shadow-sm border overflow-hidden"
      style={{ backgroundColor: "#F7F8F0", borderColor: "#9CD5FF" }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: "#355872" }}>
              <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                No
              </th>
              {isAdmin && (
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                  ID Pengguna
                </th>
              )}
              <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                Petugas
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                Identitas
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                Tanggal
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                Hari
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                Lokasi
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                Akurasi
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                Status Liar
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                Status Post
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: "#9CD5FF" }}>
            {reports.map((report, index) => (
              <tr
                key={report.id}
                className="transition-colors"
                style={{
                  backgroundColor: index % 2 === 0 ? "#F7F8F0" : "#ffffff",
                }}
              >
                <td className="px-5 py-3.5 text-gray-600">{index + 1}</td>
                {isAdmin && (
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {report.userId}
                  </td>
                )}
                <td className="px-5 py-3.5 text-gray-900">
                  {report.namaPetugas}
                </td>
                <td className="px-5 py-3.5 text-gray-600">
                  {report.identitasPetugas}
                </td>
                <td className="px-5 py-3.5 text-gray-600">
                  {new Date(report.createdAt).toLocaleDateString("id-ID")}
                </td>
                <td className="px-5 py-3.5 text-gray-600">{report.hari}</td>
                <td className="px-5 py-3.5 max-w-50 truncate text-gray-900">
                  {report.location}
                </td>
                <td className="px-5 py-3.5 text-gray-600">{report.akurasi}</td>
                <td className="px-5 py-3.5 text-gray-900">
                  {report.statusLiar}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      report.statusPost === "approve"
                        ? "bg-green-100 text-green-700"
                        : report.statusPost === "reject"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        report.statusPost === "approve"
                          ? "bg-green-500"
                          : report.statusPost === "reject"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                      }`}
                    />
                    {report.statusPost.charAt(0).toUpperCase() +
                      report.statusPost.slice(1)}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-0.5">
                    {/* View details */}
                    <button
                      onClick={() => onView(report)}
                      className="p-2 rounded-lg transition-colors"
                      style={{ color: "#355872" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#9CD5FF")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                      title="Detail"
                    >
                      <Eye className="h-4 w-4" />
                    </button>

                    {/* View photo (if available) */}
                    {report.photoUrl && onViewPhoto && (
                      <button
                        onClick={() => onViewPhoto(report.photoUrl!)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: "#7AAACE" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#9CD5FF")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                        title="Lihat Foto"
                      >
                        <Image className="h-4 w-4" />
                      </button>
                    )}

                    {/* Admin actions for pending reports */}
                    {isAdmin &&
                      onApprove &&
                      onReject &&
                      report.statusPost === "pending" && (
                        <>
                          <button
                            onClick={() => onApprove(report.id)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: "#355872" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#9CD5FF")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "transparent")
                            }
                            title="Approve"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onReject(report.id)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: "#355872" }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "#9CD5FF")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "transparent")
                            }
                            title="Reject"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportTable;
