import React, { useState, useEffect } from "react";
import {
  FileText,
  User,
  Calendar,
  MapPin,
  Navigation,
  ImageIcon,
  ZoomIn,
} from "lucide-react";
import type { ReportItem } from "../../../types/admin.types.interface";

interface DetailReportProps {
  report: ReportItem;
  onPhotoClick?: (photoUrl: string) => void; // tambahkan prop
}

const statusConfig = {
  Liar: { label: "Liar", bg: "bg-red-100 text-red-700", dot: "bg-red-500" },
  "Tidak Liar": {
    label: "Tidak Liar",
    bg: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
};

const DetailReport: React.FC<DetailReportProps> = ({
  report,
  onPhotoClick,
}) => {
  const status = statusConfig[report.status] || statusConfig["Tidak Liar"];
  const [address, setAddress] = useState<string | null>(null);
  const [loadingAddress, setLoadingAddress] = useState(false);

  // Reverse geocoding saat koordinat berubah
  useEffect(() => {
    if (!report.latitude || !report.longitude) {
      setAddress(null);
      return;
    }

    const fetchAddress = async () => {
      setLoadingAddress(true);
      try {
        const { latitude, longitude } = report;
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          {
            headers: {
              "User-Agent": "MyAdminApp/1.0", // Ganti dengan nama aplikasi Anda
            },
          },
        );
        const data = await response.json();

        if (data.address) {
          const addr = data.address;
          // Ambil komponen jalan, kota, provinsi
          const road =
            addr.road || addr.path || addr.street || addr.pedestrian || "";
          const city =
            addr.city ||
            addr.town ||
            addr.village ||
            addr.municipality ||
            addr.county ||
            "";
          const state = addr.state || addr.province || "";

          // Hanya ambil yang tidak kosong
          const parts = [road, city, state].filter(
            (part) => part.trim() !== "",
          );

          if (parts.length > 0) {
            setAddress(parts.join(", "));
          } else {
            // Fallback ke alamat lengkap
            setAddress(data.display_name || null);
          }
        } else {
          setAddress(data.display_name || null);
        }
      } catch (error) {
        console.error("Reverse geocoding error:", error);
        setAddress(null);
      } finally {
        setLoadingAddress(false);
      }
    };

    fetchAddress();
  }, [report.latitude, report.longitude]);

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
                Identitas Petugas : {report.identitas_petugas}
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
                {report.akurasi} %
              </p>
            </div>
          )}

          {/* Bagian Foto Bukti */}
          {report.bukti && (
            <div>
              <p className="text-[10px] text-gray-700 uppercase tracking-wider font-medium mb-2 flex items-center gap-1">
                <ImageIcon className="h-3 w-3" /> Foto Bukti
              </p>
              <div
                className="relative group cursor-pointer bg-white"
                onClick={() => onPhotoClick?.(report.bukti)}
              >
                <img
                  src={report.bukti}
                  alt="Bukti"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 rounded-xl transition-all flex items-center justify-center">
                  <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          )}

          {/* Bagian Koordinat dengan Reverse Geocoding */}
          <p className="text-[10px] text-gray-700 uppercase tracking-wider font-medium mb-2">
            Lokasi Daerah
          </p>
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl border border-gray-100">
            <Navigation className="h-3.5 w-3.5 text-black" />
            {loadingAddress ? (
              <span className="text-xs text-gray-500">Memuat alamat...</span>
            ) : address ? (
              <span className="text-xs text-gray-600">{address}</span>
            ) : (
              <span className="text-xs text-gray-600 font-mono">
                {Number(report.latitude).toFixed(6)},{" "}
                {Number(report.longitude).toFixed(6)}
              </span>
            )}
          </div>

          <p className="text-[10px] text-gray-700 uppercase tracking-wider font-medium mb-2">
            Lokasi Coordinate
          </p>
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
