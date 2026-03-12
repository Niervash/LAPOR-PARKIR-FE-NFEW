import React from "react";
import {
  FileText,
  User,
  Calendar,
  MapPin,
  Car,
  Navigation,
  ImageIcon,
  ZoomIn,
} from "lucide-react";
import {
  statusConfig,
  type Report,
} from "../../../column/default/overview.column";

interface DetailReportProps {
  report: Report;
  onPhotoClick: () => void;
}

const DetailReport: React.FC<DetailReportProps> = ({
  report,
  onPhotoClick,
}) => {
  const status = statusConfig[report.status] || statusConfig["Tidak Liar"];
  const StatusIcon = status.icon;

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-200">
              <FileText className="h-4 w-4 text-blue-900" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-black">Detail Laporan</h1>
              <p className="text-xs text-gray-700 font-mono mt-0.5">
                ID: {report.id}
              </p>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${status.bg}`}
          >
            <StatusIcon className="h-3.5 w-3.5" />
            {status.label}
          </span>
        </div>

        <div className="p-6 space-y-5">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: User, label: "Pelapor", value: report.userName },
              { icon: Calendar, label: "Tanggal", value: report.createdAt },
              { icon: MapPin, label: "Lokasi", value: report.location },
              {
                icon: Car,
                label: "Kendaraan",
                value: report.vehicleType,
                capitalize: true,
              },
            ].map((item, i) => (
              <div key={i} className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <item.icon className="h-3 w-3 text-black" />
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-medium">
                    {item.label}
                  </span>
                </div>
                <p
                  className={`text-sm font-medium text-foreground ${item.capitalize ? "capitalize" : ""}`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <p className="text-[10px] text-gray-700 uppercase tracking-wider font-medium mb-2">
              Deskripsi
            </p>
            <p className="text-sm text-muted-foreground bg-gray-100 p-4 rounded-xl leading-relaxed border border-gray-100 ">
              {report.description}
            </p>
          </div>

          {/* Coordinates */}
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl border border-gray-100 ">
            <Navigation className="h-3.5 w-3.5 text-black" />
            <span className="text-xs text-muted-foreground font-mono">
              {report.latitude.toFixed(6)}, {report.longitude.toFixed(6)}
            </span>
          </div>
        </div>
      </div>

      {/* Photo Card */}
      {report.photoUrl && (
        <div className="bg-white rounded-2xl  border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-200">
              <ImageIcon className="h-3.5 w-3.5 text-blue-900" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">
              Foto Bukti
            </h2>
          </div>
          <div className="p-4">
            <div
              className="relative group cursor-pointer rounded-xl overflow-hidden"
              onClick={onPhotoClick}
            >
              <img
                src={report.photoUrl}
                alt="Bukti laporan"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-all flex items-center justify-center">
                <div className="bg-card/90 backdrop-blur-sm p-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <ZoomIn className="h-5 w-5 text-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailReport;
