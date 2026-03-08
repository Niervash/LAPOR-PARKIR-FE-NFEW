import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Report } from "../../../types/map.types.interface";

// --- Fix default marker icons (run once) ---
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// --- Color mapping for report statuses (tetap) ---
const statusColors: Record<"pending" | "approve" | "reject", string> = {
  pending: "#EAB308", // yellow-500
  approve: "#22C55E", // green-500
  reject: "#EF4444", // red-500
};

// --- Custom marker untuk preview klik (warna biru tema) ---
const clickMarkerIcon = L.divIcon({
  className: "click-marker",
  html: `<div style="width:24px;height:24px;border-radius:50%;background:#2563eb;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);opacity:0.8;"></div>`, // blue-600
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// --- Membuat marker berwarna berdasarkan status ---
function createStatusIcon(status: "pending" | "approve" | "reject") {
  const color = statusColors[status];
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="width:24px;height:24px;border-radius:50%;background:${color};border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

// --- Komponen untuk menangani klik peta ---
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

// --- Komponen untuk mengontrol pergerakan peta dengan animasi flyTo ---
function MapController({
  center,
  zoom,
}: {
  center?: [number, number];
  zoom?: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || map.getZoom(), {
        duration: 1.5, // durasi animasi dalam detik
        easeLinearity: 0.25,
      });
    }
  }, [center, zoom, map]);
  return null;
}

interface ReportMapProps {
  reports: Report[];
  onMarkerClick?: (report: Report) => void;
  onClick?: (lat: number, lng: number) => void;
  clickMarker?: { lat: number; lng: number } | null;
  height?: string;
  center?: [number, number]; // tambahan: koordinat pusat yang akan dituju
  zoom?: number; // tambahan: level zoom (opsional)
}

export default function ReportMap({
  reports,
  onMarkerClick,
  onClick,
  clickMarker,
  height = "400px",
  center,
  zoom = 13,
}: ReportMapProps) {
  return (
    <div
      style={{ height }}
      className="overflow-hidden shadow-lg z-0 relative rounded-lg border border-gray-200"
    >
      <MapContainer
        className="z-0"
        center={[-6.2088, 106.8456]} // Jakarta default
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Handle map clicks */}
        {onClick && <ClickHandler onClick={onClick} />}

        {/* Kontrol animasi peta */}
        <MapController center={center} zoom={zoom} />

        {/* Render report markers */}
        {reports.map((report) => (
          <Marker
            key={report.id}
            position={[report.latitude, report.longitude]}
            icon={createStatusIcon(report.statusPost)}
            eventHandlers={{
              click: () => onMarkerClick?.(report),
            }}
          >
            <Popup>
              <div className="text-sm min-w-[150px]">
                <p className="font-semibold text-gray-900">
                  {report.namaPetugas || "Anonymous"}
                </p>
                <p className="text-gray-500 text-xs">
                  {new Date(report.createdAt).toLocaleDateString("id-ID")}
                </p>
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
                    ? "Disetujui"
                    : report.statusPost === "reject"
                      ? "Ditolak"
                      : "Pending"}
                </span>
                {onMarkerClick && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkerClick(report);
                    }}
                    className="block mt-2 text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline focus:outline-none transition-colors"
                  >
                    Lihat Detail
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Optional temporary marker for clicked location */}
        {clickMarker && (
          <Marker
            position={[clickMarker.lat, clickMarker.lng]}
            icon={clickMarkerIcon}
          />
        )}
      </MapContainer>
    </div>
  );
}
