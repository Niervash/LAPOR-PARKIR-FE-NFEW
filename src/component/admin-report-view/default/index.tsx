import React, { useState } from "react";
import { Eye, Image, CheckCircle, XCircle, Trash2 } from "lucide-react";

// Tipe data untuk laporan (diperluas dengan status rejected)
interface Report {
  id: string;
  userName: string;
  location: string;
  timestamp: string;
  status: "approved" | "pending" | "rejected";
  plateNumber: string;
  vehicleType: string;
  description: string;
  photoUrl?: string;
}

// Data dummy dengan tambahan contoh rejected
const dummyReports: Report[] = [
  {
    id: "1",
    userName: "Budi Santoso",
    location: "Mall Grand Indonesia, Lantai 3",
    timestamp: "2025-02-15 14:30",
    status: "pending",
    plateNumber: "B 1234 XYZ",
    vehicleType: "Mobil",
    description: "Parkir sembarangan di area khusus difabel",
    photoUrl: "https://via.placeholder.com/300",
  },
  {
    id: "2",
    userName: "Siti Aminah",
    location: "Stasiun Kota, Parkir Timur",
    timestamp: "2025-02-16 09:15",
    status: "approved",
    plateNumber: "D 5678 ABC",
    vehicleType: "Motor",
    description: "Motor menghalangi jalur keluar",
    photoUrl: "https://via.placeholder.com/300",
  },
  {
    id: "3",
    userName: "Joko Widodo",
    location: "Pasar Baru, Pintu Selatan",
    timestamp: "2025-02-17 11:20",
    status: "rejected",
    plateNumber: "B 9999 CDE",
    vehicleType: "Mobil",
    description: "Parkir di trotoar",
    photoUrl: "https://via.placeholder.com/300",
  },
];

const AdminReport: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(dummyReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoModal, setPhotoModal] = useState({ isOpen: false, url: "" });

  // Handler untuk membuka detail laporan
  const handleViewDetail = (report: Report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  // Handler untuk melihat foto (modal terpisah)
  const handleViewPhoto = (url: string) => {
    setPhotoModal({ isOpen: true, url });
  };

  const handleClosePhotoModal = () => {
    setPhotoModal({ isOpen: false, url: "" });
  };

  // Handler untuk menyetujui laporan
  const handleApprove = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: "approved" } : r)),
    );
    if (selectedReport?.id === reportId) {
      setSelectedReport((prev) => prev && { ...prev, status: "approved" });
    }
  };

  // Handler untuk menolak laporan
  const handleReject = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: "rejected" } : r)),
    );
    if (selectedReport?.id === reportId) {
      setSelectedReport((prev) => prev && { ...prev, status: "rejected" });
    }
  };

  // Handler untuk menghapus laporan
  const handleDelete = (reportId: string) => {
    setReports((prev) => prev.filter((r) => r.id !== reportId));
    if (selectedReport?.id === reportId) {
      handleCloseModal();
    }
  };

  // Jika tidak ada laporan, tampilkan empty state
  if (reports.length === 0) {
    return (
      <div className="container mx-auto p-4">
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
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Daftar Laporan Parkir</h1>

      {/* Tabel dengan desain baru */}
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
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                  Nama Pelapor
                </th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                  Lokasi
                </th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                  Waktu
                </th>
                <th className="text-left px-5 py-3.5 font-semibold text-xs uppercase tracking-wider text-white">
                  Status
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
                  <td className="px-5 py-3.5 font-medium text-gray-900">
                    {report.userName}
                  </td>
                  <td className="px-5 py-3.5 max-w-64 truncate text-gray-900">
                    {report.location}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600">
                    {report.timestamp}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        report.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : report.status === "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          report.status === "approved"
                            ? "bg-green-500"
                            : report.status === "rejected"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                        }`}
                      />
                      {report.status === "approved"
                        ? "Disetujui"
                        : report.status === "rejected"
                          ? "Ditolak"
                          : "Menunggu"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-0.5">
                      {/* Detail */}
                      <button
                        onClick={() => handleViewDetail(report)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: "#355872" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#9CD5FF")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                        title="Detail"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      {/* Lihat foto (jika ada) */}
                      {report.photoUrl && (
                        <button
                          onClick={() => handleViewPhoto(report.photoUrl!)}
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

                      {/* Approve (hanya jika pending) */}
                      {report.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(report.id)}
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
                            title="Setujui"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleReject(report.id)}
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
                            title="Tolak"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}

                      {/* Hapus */}
                      <button
                        onClick={() => handleDelete(report.id)}
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: "#355872" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#9CD5FF")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Laporan (tetap seperti sebelumnya, bisa disesuaikan desainnya jika perlu) */}
      {isModalOpen && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Detail Laporan</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="font-semibold">ID Laporan:</span>{" "}
                  {selectedReport.id}
                </div>
                <div>
                  <span className="font-semibold">Nama Pelapor:</span>{" "}
                  {selectedReport.userName}
                </div>
                <div>
                  <span className="font-semibold">Lokasi:</span>{" "}
                  {selectedReport.location}
                </div>
                <div>
                  <span className="font-semibold">Waktu:</span>{" "}
                  {selectedReport.timestamp}
                </div>
                <div>
                  <span className="font-semibold">Nomor Plat:</span>{" "}
                  {selectedReport.plateNumber}
                </div>
                <div>
                  <span className="font-semibold">Jenis Kendaraan:</span>{" "}
                  {selectedReport.vehicleType}
                </div>
                <div>
                  <span className="font-semibold">Deskripsi:</span>
                  <p className="mt-1 text-gray-700">
                    {selectedReport.description}
                  </p>
                </div>
                {selectedReport.photoUrl && (
                  <div>
                    <span className="font-semibold">Foto:</span>
                    <div className="mt-2">
                      <img
                        src={selectedReport.photoUrl}
                        alt="Bukti parkir"
                        className="max-w-full h-auto rounded border"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                      selectedReport.status === "approved"
                        ? "bg-green-200 text-green-800"
                        : selectedReport.status === "rejected"
                          ? "bg-red-200 text-red-800"
                          : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {selectedReport.status === "approved"
                      ? "Disetujui"
                      : selectedReport.status === "rejected"
                        ? "Ditolak"
                        : "Menunggu"}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Tutup
                </button>
                {selectedReport.status === "pending" && (
                  <>
                    <button
                      onClick={() => {
                        handleApprove(selectedReport.id);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Setujui
                    </button>
                    <button
                      onClick={() => {
                        handleReject(selectedReport.id);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Tolak
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal khusus untuk melihat foto (opsional) */}
      {photoModal.isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleClosePhotoModal}
        >
          <div
            className="bg-white rounded-lg max-w-3xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                onClick={handleClosePhotoModal}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <img
              src={photoModal.url}
              alt="Bukti parkir"
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReport;
