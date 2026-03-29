import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Maximize2, Minimize2, Layers, X } from "lucide-react";
import toast from "react-hot-toast";
import type { Report } from "../../../types/map.types.interface";
import { GetAllData } from "../../../services/report.petugas.service";
import { ReportMap } from "../../report-map";

const MapPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const result = await GetAllData();
        // Sesuaikan path data dengan struktur response API
        const dataArray = result?.data?.petugas || [];
        console.log(dataArray);

        const transformed: Report[] = dataArray.map((item: any) => {
          // Tentukan warna marker berdasarkan status_post

          return {
            id: String(item.id || ""),
            userId: String(item.idPengguna || ""),
            namaPetugas: item.nama || "",
            identitasPetugas: item.identitas_petugas || "",
            akurasi: item.akurasi || "",
            hari: item.hari || "",
            statusLiar: item.status || "", // dari properti "status"
            statusPost: item.status_post || "pending",
            location: item.lokasi || "",
            latitude: parseFloat(item.latitude) || 0,
            longitude: parseFloat(item.longitude) || 0,
            photoUrl: item.bukti || "",
            createdAt:
              item.tanggaldanwaktu ||
              item.createdAt ||
              new Date().toISOString(),
            description: item.deskripsi_masalah || "",
            // Tambahkan field untuk warna marker (jika diperlukan oleh ReportMap)
          };
        });

        // Hanya tampilkan laporan dengan status "Liar"
        const filtered = transformed.filter((r) => r.statusLiar === "Liar");
        setReports(filtered);
      } catch (error) {
        toast.error("Gagal memuat data peta");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const toggleExpand = () => setExpanded(!expanded);

  return (
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
                Peta <span className="text-amber-600">Parkir Liar</span>
              </h1>
              <p className="text-gray-500 mt-2 max-w-2xl">
                Visualisasi lokasi juru parkir liar yang dilaporkan masyarakat.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Expand toggle button */}
              <button
                onClick={toggleExpand}
                className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-amber-300 text-gray-700 hover:text-amber-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm"
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
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-linear-to-r from-amber-50 to-yellow-50">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-amber-600" />
              <span className="font-medium text-gray-700">
                {reports.length} Titik Lokasi
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
                <div className=" animate-spin rounded-full h-12 w-12 border-4 border-amber-200 border-t-amber-600"></div>
              </div>
            ) : (
              <ReportMap
                reports={reports}
                onMarkerClick={setSelectedReport}
                height="100%"
              />
            )}
          </div>
        </motion.div>

        {/* Detail Panel (jika marker dipilih) */}
      </div>
    </main>
  );
};

export default MapPage;
