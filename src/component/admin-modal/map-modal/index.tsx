import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Maximize2, Minimize2 } from "lucide-react"; // ikon fullscreen

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Marker icon default (biru)
const defaultMarkerIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="width:24px;height:24px;border-radius:50%;background:#2563eb;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Komponen untuk mengontrol pergerakan peta dengan animasi flyTo
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
        duration: 1.5,
        easeLinearity: 0.25,
      });
    }
  }, [center, zoom, map]);
  return null;
}

// Komponen untuk mengupdate ukuran peta saat fullscreen berubah
function MapResizer({ isFullscreen }: { isFullscreen: boolean }) {
  const map = useMap();
  useEffect(() => {
    // Beri sedikit waktu agar transisi CSS selesai
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [isFullscreen, map]);
  return null;
}

export interface MapReport {
  id: string;
  latitude: number;
  longitude: number;
}

interface ModalMapProps {
  report?: MapReport | null;
  height?: string;
  zoom?: number;
}

export default function ModalMap({
  report,
  height = "400px",
  zoom = 13,
}: ModalMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const defaultCenter: [number, number] = [-6.2088, 106.8456]; // Jakarta
  const center = report
    ? ([report.latitude, report.longitude] as [number, number])
    : undefined;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`relative overflow-hidden shadow-lg z-0 rounded-lg border border-gray-200 transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
      }`}
      style={{ height: isFullscreen ? "100vh" : height }}
    >
      <MapContainer
        className="z-0"
        center={defaultCenter}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
        dragging={true} // peta bisa digerakkan
        doubleClickZoom={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <MapController center={center} zoom={zoom} />
        <MapResizer isFullscreen={isFullscreen} />

        {report && (
          <Marker
            position={[report.latitude, report.longitude]}
            icon={defaultMarkerIcon}
          />
        )}
      </MapContainer>

      {/* Tombol Fullscreen */}
      <button
        onClick={toggleFullscreen}
        className="absolute top-3 right-3 z-10 bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors border border-gray-200"
        title={isFullscreen ? "Keluar fullscreen" : "Fullscreen"}
      >
        {isFullscreen ? (
          <Minimize2 className="h-4 w-4 text-gray-700" />
        ) : (
          <Maximize2 className="h-4 w-4 text-gray-700" />
        )}
      </button>
    </div>
  );
}
