import React, { useState } from "react";
import {
  X,
  User,
  Calendar,
  MapPin,
  ImageIcon,
  ZoomIn,
  Navigation,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  IdCard, // tambahan untuk identitas
} from "lucide-react";
import type { Report, ReportStatus } from "../../../types/map.types.interface";

interface ReportDetailModalProps {
  report: Report | null;
  onClose: () => void;
  isAdmin?: boolean;
  onUpdateStatus?: (id: string, status: ReportStatus) => void;
}

// Konfigurasi tampilan status sesuai dengan ReportStatus (pending, approve, reject)
const statusConfig: Record<
  ReportStatus,
  { label: string; bg: string; dot: string }
> = {
  pending: {
    label: "Pending",
    bg: "bg-yellow-100 text-yellow-700",
    dot: "bg-yellow-500",
  },
  approve: {
    label: "Approved",
    bg: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
  reject: {
    label: "Rejected",
    bg: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
};

// Status yang dapat diubah dari status tertentu
const statusActions: Record<ReportStatus, ReportStatus[]> = {
  pending: ["approve", "reject"],
  approve: ["pending", "reject"],
  reject: ["pending", "approve"],
};

// Style tombol aksi
const buttonStyles: Record<ReportStatus, string> = {
  approve: "bg-green-100 text-green-700 hover:bg-green-200 border-green-300",
  reject: "bg-red-100 text-red-700 hover:bg-red-200 border-red-300",
  pending:
    "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300",
};

// Ikon untuk setiap status
const buttonIcons: Record<ReportStatus, React.ElementType> = {
  approve: CheckCircle2,
  reject: XCircle,
  pending: Clock,
};

const DetailModal: React.FC<ReportDetailModalProps> = ({
  report,
  onClose,
  isAdmin = false,
  onUpdateStatus,
}) => {
  const [confirmTarget, setConfirmTarget] = useState<ReportStatus | null>(null);
  const [showPhoto, setShowPhoto] = useState(false);

  if (!report) return null;

  // Gunakan statusPost dari report
  const currentStatus = report.statusPost;
  const status = statusConfig[currentStatus];
  const targets = statusActions[currentStatus] || [];

  const handleConfirm = () => {
    if (!confirmTarget || !onUpdateStatus) return;
    onUpdateStatus(report.id, confirmTarget);
    setConfirmTarget(null);
    onClose();
  };

  const handleCancel = () => {
    setConfirmTarget(null);
  };

  // Data untuk info grid (sesuai dengan field yang tersedia di Report)
  const infoItems = [
    { icon: User, label: "Pelapor", value: report.namaPetugas },
    { icon: Calendar, label: "Tanggal", value: report.createdAt },
    { icon: MapPin, label: "Lokasi", value: report.location },
    {
      icon: IdCard,
      label: "Identitas Petugas",
      value: report.identitasPetugas,
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-gray-20 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl  overflow-hidden"
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
          {/* Status */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${status.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {infoItems.map((item, i) => (
              <div key={i} className="bg-gray-100 rounded-xl p-3.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <item.icon className="h-3 w-3 text-black" />
                  <span className="text-[10px] text-black uppercase tracking-wider font-medium">
                    {item.label}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 wrap-break-words">
                  {item.value || "-"}
                </p>
              </div>
            ))}
          </div>

          {/* Description (opsional) */}
          {report.description && (
            <div>
              <p className="text-[10px] text-black uppercase tracking-wider font-medium mb-2">
                Deskripsi
              </p>
              <p className="text-sm text-muted-foreground bg-gray-100 p-4 rounded-xl leading-relaxed  ">
                {report.description}
              </p>
            </div>
          )}

          {/* Photo */}
          {report.photoUrl && (
            <div>
              <p className="text-[10px] text-black uppercase tracking-wider font-medium mb-2 flex items-center gap-1">
                <ImageIcon className="h-3 w-3" /> Foto Bukti
              </p>
              <div
                className="relative group cursor-pointer bg-white"
                onClick={() => setShowPhoto(true)}
              >
                <img
                  src={report.photoUrl}
                  alt="Bukti"
                  className="w-full h-48 object-cover rounded-xl "
                />
                <div className="absolute inset-0 bg-white group-hover:bg-white rounded-xl transition-all flex items-center justify-center">
                  <ZoomIn className="h-6 w-6 text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          )}

          {/* Coordinates */}
          <div className="flex items-center gap-2 bg-gray-100 px-3.5 py-2.5 rounded-xl ">
            <Navigation className="h-3 w-3 text-black" />
            <span className="text-[11px] text-black font-mono">
              {report.latitude.toFixed(6)}, {report.longitude.toFixed(6)}
            </span>
          </div>

          {/* Admin: Change Status Buttons */}
          {isAdmin && !confirmTarget && targets.length > 0 && (
            <div className="bg-gray-100 rounded-xl p-4 space-y-3">
              <p className="text-[10px] text-black uppercase tracking-wider font-medium">
                Ubah Status
              </p>
              <div className="flex gap-3">
                {targets.map((target) => {
                  const Icon = buttonIcons[target];
                  return (
                    <button
                      key={target}
                      onClick={() => setConfirmTarget(target)}
                      className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${buttonStyles[target]}`}
                    >
                      <Icon className="h-4 w-4" /> {statusConfig[target].label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Admin: Confirmation with Reason */}
          {isAdmin && confirmTarget && (
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <p className="text-sm font-semibold text-foreground">
                  Konfirmasi Perubahan
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Apakah Anda yakin ingin mengubah status dari{" "}
                <span className="font-semibold">
                  {statusConfig[currentStatus].label}
                </span>{" "}
                ke{" "}
                <span
                  className={`font-semibold ${
                    confirmTarget === "approve"
                      ? "text-green-600"
                      : confirmTarget === "reject"
                        ? "text-red-600"
                        : "text-yellow-600"
                  }`}
                >
                  {statusConfig[confirmTarget].label}
                </span>
                ?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-black/70 hover:text-black hover:border-gray-400 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={handleConfirm}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${buttonStyles[confirmTarget]}`}
                >
                  Ya, Ubah
                </button>
              </div>
            </div>
          )}
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
      {showPhoto && report.photoUrl && (
        <div
          className="fixed inset-0 bg-gray-400/50 backdrop-blur-lg z-60 flex items-center justify-center p-4"
          onClick={() => setShowPhoto(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-3xl w-full overflow-hidden "
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
                src={report.photoUrl}
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
