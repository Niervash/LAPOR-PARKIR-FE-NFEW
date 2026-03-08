import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Filter, Maximize2, Minimize2, Layers, X } from "lucide-react";

import toast from "react-hot-toast";
import type { Report } from "../../../types/map.types.interface";
import { GetDataPetugas } from "../../../services/report.service";
import { ReportMap } from "../../report-map";

const MapPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        // Jika endpoint publik tersedia, gunakan; jika tidak, kita perlu idPengguna?
        // Untuk sementara kita ambil semua data (mungkin butuh endpoint khusus)
        // Asumsikan ada endpoint GetSemuaLaporan atau kita gunakan GetDataPetugas dengan id admin?
        // Di sini kita panggil dengan id dummy atau tanpa id? Sesuaikan dengan service.
        // Contoh: panggil dengan parameter kosong atau id = 'all'
        const result = await GetDataPetugas(""); // perlu disesuaikan
        const dataArray = result?.data?.rows || result?.data || [];

        const transformed: Report[] = dataArray.map((item: any) => ({
          id: String(item.id || ""),
          userId: String(item.idPengguna || ""),
          namaPetugas: item.nama || "",
          identitasPetugas: item.identitas_petugas || "",
          akurasi: item.akurasi || "",
          hari: item.hari || "",
          statusLiar: item.status || "",
          statusPost: item.status_post || "pending",
          location: item.lokasi || "",
          latitude: parseFloat(item.latitude) || 0,
          longitude: parseFloat(item.longitude) || 0,
          photoUrl: item.bukti || "",
          createdAt:
            item.tanggaldanwaktu || item.createdAt || new Date().toISOString(),
          description: item.deskripsi_masalah || "",
        }));
        setReports(transformed);
      } catch (error) {
        toast.error("Gagal memuat data peta");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filteredReports =
    filterStatus === "all"
      ? reports
      : reports.filter((r) => r.statusPost === filterStatus);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <>
      <main className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  Peta <span className="text-blue-600">Pelanggaran</span>
                </h1>
                <p className="text-gray-500 mt-2 max-w-2xl">
                  Visualisasi lokasi juru parkir liar.
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* Filter dropdown */}
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 text-gray-700 text-sm rounded-lg pl-10 pr-8 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  >
                    <option value="all">Semua Status</option>
                    <option value="pending">Pending</option>
                    <option value="approve">Disetujui</option>
                    <option value="reject">Ditolak</option>
                  </select>
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {/* Expand toggle button */}
                <button
                  onClick={toggleExpand}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm"
                >
                  {expanded ? (
                    <>
                      <Minimize2 className="h-4 w-4" />
                      Kecilkan Peta
                    </>
                  ) : (
                    <>
                      <Maximize2 className="h-4 w-4" />
                      Perbesar Peta
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Map Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
              expanded ? "mb-4" : "mb-8"
            }`}
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-700">
                  {filteredReports.length} Titik Lokasi
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin className="h-3 w-3" />
                <span>Klik marker untuk detail</span>
              </div>
            </div>
            <div
              className={`transition-all duration-300 ${
                expanded ? "h-[70vh]" : "h-[50vh]"
              }`}
            >
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
                </div>
              ) : (
                <ReportMap
                  reports={filteredReports}
                  onMarkerClick={setSelectedReport}
                  height="100%"
                />
              )}
            </div>
          </motion.div>

          {/* Detail Panel (jika marker dipilih) */}
          <AnimatePresence>
            {selectedReport && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Detail Laporan
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedReport.location}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <p className="text-xs text-gray-400">Petugas</p>
                    <p className="font-medium">
                      {selectedReport.namaPetugas || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Identitas</p>
                    <p className="font-medium">
                      {selectedReport.identitasPetugas || "-"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Hari</p>
                    <p className="font-medium">{selectedReport.hari}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Status</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        selectedReport.statusPost === "approve"
                          ? "bg-green-100 text-green-700"
                          : selectedReport.statusPost === "reject"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {selectedReport.statusPost === "approve"
                        ? "Disetujui"
                        : selectedReport.statusPost === "reject"
                          ? "Ditolak"
                          : "Pending"}
                    </span>
                  </div>
                  {selectedReport.photoUrl && (
                    <div className="md:col-span-2">
                      <p className="text-xs text-gray-400 mb-1">Foto Bukti</p>
                      <img
                        src={selectedReport.photoUrl}
                        alt="Bukti"
                        className="h-32 w-auto rounded-lg border border-gray-200 object-cover"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Statistik kecil (opsional) */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Laporan", value: reports.length, color: "blue" },
              {
                label: "Pending",
                value: reports.filter((r) => r.statusPost === "pending").length,
                color: "yellow",
              },
              {
                label: "Disetujui",
                value: reports.filter((r) => r.statusPost === "approve").length,
                color: "green",
              },
              {
                label: "Ditolak",
                value: reports.filter((r) => r.statusPost === "reject").length,
                color: "red",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
              >
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className={`text-2xl font-bold text-${stat.color}-600`}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default MapPage;
