import React, { useState, useEffect } from "react";
import {
  X,
  User,
  Calendar,
  MapPin,
  ImageIcon,
  ZoomIn,
  Navigation,
  IdCard,
} from "lucide-react";
import type {
  ReportAdmin,
  WildStatus,
} from "../../../types/admin.types.interface";

interface ReportDetailModalProps {
  report: ReportAdmin | null;
  onClose: () => void;
  isAdmin?: boolean;
  onUpdateStatus?: never;
}

const wildStatusConfig: Record<
  WildStatus,
  { label: string; bg: string; dot: string }
> = {
  Liar: {
    label: "Liar",
    bg: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  "Tidak Liar": {
    label: "Tidak Liar",
    bg: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
};

const DetailModal: React.FC<ReportDetailModalProps> = ({
  report,
  onClose,
  isAdmin = false,
}) => {
  const [showPhoto, setShowPhoto] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [loadingAddress, setLoadingAddress] = useState(false);

  useEffect(() => {
    if (!report) return;

    const fetchAddress = async () => {
      // Cek ketersediaan koordinat
      if (
        report.latitude === undefined ||
        report.longitude === undefined ||
        report.latitude === null ||
        report.longitude === null
      ) {
        setAddress(null);
        return;
      }

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

          // Hanya ambil komponen yang tidak kosong
          const parts = [road, city, state].filter(
            (part) => part.trim() !== "",
          );

          if (parts.length > 0) {
            setAddress(parts.join(", "));
          } else {
            // Fallback ke alamat lengkap jika tidak ada komponen yang dikenali
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
  }, [report?.latitude, report?.longitude]);

  if (!report) return null;

  const currentStatus = report.status;
  const status = wildStatusConfig[currentStatus];

  const infoItems = [
    { icon: User, label: "Petugas", value: report.identitas_petugas },
    {
      icon: Calendar,
      label: "Tanggal & Waktu",
      value: new Date(report.tanggaldanwaktu).toLocaleString("id-ID"),
    },
    { icon: MapPin, label: "Lokasi", value: report.lokasi },
    { icon: IdCard, label: "Hari", value: report.hari },
  ];

  return (
    <div
      className="fixed inset-0 bg-gray-20 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
          <h2 className="text-base font-bold text-black">Detail Laporan</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-xl transition text-black"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Status Liar / Tidak Liar */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${status.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            {infoItems.map((item, i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <item.icon className="h-3 w-3 text-black" />
                  <span className="text-[10px] text-black uppercase tracking-wider font-medium">
                    {item.label}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 break-words">
                  {item.value || "-"}
                </p>
              </div>
            ))}
          </div>

          {/* Foto Bukti */}
          {report.bukti && (
            <div>
              <p className="text-[10px] text-black uppercase tracking-wider font-medium mb-2 flex items-center gap-1">
                <ImageIcon className="h-3 w-3" /> Foto Bukti
              </p>
              <div
                className="relative group cursor-pointer bg-white"
                onClick={() => setShowPhoto(true)}
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

          {/* Alamat hasil reverse geocoding */}
          {/* Only the corrdinate */}
          <div className="flex items-center gap-2 bg-gray-100 px-3.5 py-2.5 rounded-xl">
            <Navigation className="h-3 w-3 text-black" />
            <span className="text-[11px] text-black font-mono">
              {Number(report.latitude).toFixed(6)},{" "}
              {Number(report.longitude).toFixed(6)}
            </span>
          </div>
          {/* with the name of the street */}
          <div className="flex items-center gap-2 bg-gray-100 px-3.5 py-2.5 rounded-xl">
            <Navigation className="h-3 w-3 text-black" />
            {loadingAddress ? (
              <span className="text-[11px] text-black">Memuat alamat...</span>
            ) : address ? (
              <span className="text-[11px] text-black">{address}</span>
            ) : (
              <span className="text-[11px] text-black font-mono">
                {Number(report.latitude).toFixed(6)},{" "}
                {Number(report.longitude).toFixed(6)}
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-300 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-sky-700 text-white text-sm font-semibold hover:bg-sky-600 transition-all shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* Full Photo Modal */}
      {showPhoto && report.bukti && (
        <div
          className="fixed inset-0 bg-gray-400/50 backdrop-blur-lg z-60 flex items-center justify-center p-4"
          onClick={() => setShowPhoto(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-300">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-200/50">
                  <ImageIcon className="h-3.5 w-3.5 text-black" />
                </div>
                <h3 className="font-semibold text-sm text-black">Foto Bukti</h3>
              </div>
              <button
                onClick={() => setShowPhoto(false)}
                className="p-1.5 hover:bg-gray-200 rounded-xl transition text-black"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4">
              <img
                src={report.bukti}
                alt="Bukti laporan"
                className="w-full rounded-xl object-contain max-h-[75vh]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailModal;
