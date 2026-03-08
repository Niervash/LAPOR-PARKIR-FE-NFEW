import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Report, ReportStatus } from "../../../types/map.types.interface";

// Perbaiki ikon default Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Warna untuk setiap status
const statusColors: Record<ReportStatus, string> = {
  pending: "#EAB308",
  approve: "#22C55E",
  reject: "#EF4444",
};

// Buat ikon marker berbentuk lingkaran dengan warna status
function createIcon(status: ReportStatus) {
  const color = statusColors[status];
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="width:24px;height:24px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

interface ReportMapProps {
  reports: Report[];
  onMarkerClick?: (report: Report) => void;
  onClick?: (lat: number, lng: number) => void;
  clickMarker?: { lat: number; lng: number } | null;
  height?: string;
}

// Komponen internal untuk menangani klik pada peta
function ClickHandler({
  onClick,
}: {
  onClick?: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onClick?.(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function AdminReportMap({
  reports,
  onMarkerClick,
  onClick,
  clickMarker,
  height = "400px",
}: ReportMapProps): React.ReactElement {
  return (
    <div
      style={{ height }}
      className="verflow-hidden shadow-lg z-0 relative rounded-lg border border-gray-200" // z-0 memastikan peta di belakang elemen dengan z-index lebih tinggi
    >
      <MapContainer
        center={[-6.2088, 106.8456]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />
        {onClick && <ClickHandler onClick={onClick} />}
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={createIcon(report.statusPost)}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{report.namaPetugas}</p>
                <p>{report.createdAt}</p>
                <span
                  className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    report.statusPost === "approve"
                      ? "bg-green-100 text-green-700"
                      : report.statusPost === "reject"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {report.statusPost === "approve"
                    ? "Approved"
                    : report.statusPost === "reject"
                      ? "Rejected"
                      : "Pending"}
                </span>
                {onMarkerClick && (
                  <button
                    onClick={() => onMarkerClick(report)}
                    className="block mt-2 text-xs font-medium hover:underline"
                    style={{ color: "#355872" }}
                  >
                    Lihat Detail
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        {clickMarker && (
          <Marker position={[clickMarker.lat, clickMarker.lng]} />
        )}
      </MapContainer>
    </div>
  );
}
