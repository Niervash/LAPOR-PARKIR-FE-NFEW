import React, { useState, useRef, useEffect } from "react";
import { X, Upload, MapPin } from "lucide-react";
import { ReportMap } from "../../report-map";
import { Input, Select } from "antd";

const { Option } = Select;

// Opsi lokasi
const LOCATIONS = [
  "Pusat Perbelanjaan",
  "Gedung Perkantoran",
  "Rumah Sakit",
  "Universitas",
  "Other",
];

// Fungsi untuk mengisi waktu otomatis (format PostgreSQL)
const Waktuset = (): string => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Fungsi untuk mengisi hari otomatis
const Hariset = (): string => {
  const now = new Date();
  return now.toLocaleDateString("id-ID", {
    weekday: "long",
    timeZone: "Asia/Makassar",
  });
};

interface ModalReportProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const ModalReport: React.FC<ModalReportProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [location, setLocation] = useState("");
  const [detectedStreet, setDetectedStreet] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [nama, setNama] = useState("");
  const [identitasPetugas, setIdentitasPetugas] = useState("");

  const [tanggaldanwaktu, setTanggaldanwaktu] = useState(Waktuset());
  const [hari, setHari] = useState(Hariset());

  // State untuk menggerakkan peta ke koordinat tertentu
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

  // Reset semua state setiap modal dibuka
  useEffect(() => {
    if (visible) {
      setTanggaldanwaktu(Waktuset());
      setHari(Hariset());
      setCoords(null);
      setLocation("");
      setDetectedStreet("");
      setPhotoPreview(null);
      setNama("");
      setIdentitasPetugas("");
      setMapCenter(null);
    }
  }, [visible]);

  // Saat koordinat berubah, arahkan peta ke titik tersebut
  useEffect(() => {
    if (coords) {
      setMapCenter([coords.lat, coords.lng]);
    }
  }, [coords]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=${lng},${lat}&f=json`,
      );
      const data = await response.json();
      if (data && data.address) {
        const street = data.address.Address || data.address.ShortLabel || "";
        setDetectedStreet(street || "Jalan tidak dikenal");
      } else {
        setDetectedStreet("Jalan tidak dikenal");
      }
    } catch (error) {
      console.error("Gagal reverse geocoding Esri:", error);
      setDetectedStreet("Gagal mengambil nama jalan");
    }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation tidak didukung oleh browser ini.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        // Peta akan bergerak melalui useEffect
        await reverseGeocode(latitude, longitude);
      },
      (error) => {
        alert("Gagal mendapatkan lokasi: " + error.message);
      },
      { enableHighAccuracy: true },
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coords) {
      alert("Silakan pilih lokasi pada peta");
      return;
    }
    if (!location) {
      alert("Silakan pilih area");
      return;
    }
    if (!identitasPetugas) {
      alert("Silakan pilih identitas petugas");
      return;
    }

    onSubmit({
      nama,
      location,
      coords,
      identitas_petugas: identitasPetugas,
      tanggaldanwaktu,
      hari,
      bukti: photoPreview,
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl max-h-[90vh] overflow-y-auto border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Tambah Laporan
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Nama Pelapor - Ant Design Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Pelapor{" "}
              <span className="text-gray-400 text-xs">(opsional)</span>
            </label>
            <Input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama lengkap"
              size="large"
              className="w-full"
              style={{ borderRadius: "0.5rem" }}
            />
          </div>

          {/* Identitas Petugas - Ant Design Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Identitas Petugas <span className="text-red-500">*</span>
            </label>
            <Select
              value={identitasPetugas || undefined}
              onChange={(value) => setIdentitasPetugas(value)}
              placeholder="Pilih Identitas"
              className="w-full"
              size="large"
              style={{ borderRadius: "0.5rem" }}
            >
              <Option value="Ada">Ada</Option>
              <Option value="Tidak Ada">Tidak Ada</Option>
            </Select>
          </div>

          {/* Map dengan tombol GPS */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Lokasi pada Peta <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                className="inline-flex items-center gap-1.5 text-sm bg-white border border-gray-200 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition shadow-sm"
              >
                <MapPin className="h-4 w-4" />
                Gunakan Lokasi Saya
              </button>
            </div>
            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
              <ReportMap
                reports={[]}
                onClick={async (lat, lng) => {
                  setCoords({ lat, lng });
                  await reverseGeocode(lat, lng);
                }}
                clickMarker={coords}
                height="250px"
                // Prop center untuk menggerakkan peta
                center={mapCenter || undefined}
              />
            </div>
            {coords && (
              <p className="text-xs text-gray-500 mt-2 bg-gray-50 px-3 py-1.5 rounded-md inline-block">
                📍 {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
              </p>
            )}
          </div>

          {/* Nama jalan hasil deteksi */}
          {detectedStreet && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jalan
              </label>
              <input
                type="text"
                value={detectedStreet}
                readOnly
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none cursor-not-allowed"
              />
            </div>
          )}

          {/* Lokasi (Area) - Ant Design Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lokasi (Area) <span className="text-red-500">*</span>
            </label>
            <Select
              value={location || undefined}
              onChange={(value) => setLocation(value)}
              placeholder="Pilih Lokasi"
              className="w-full"
              size="large"
              style={{ borderRadius: "0.5rem" }}
            >
              {LOCATIONS.map((l) => (
                <Option key={l} value={l}>
                  {l}
                </Option>
              ))}
            </Select>
          </div>

          {/* Waktu (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Waktu
            </label>
            <input
              type="text"
              value={tanggaldanwaktu}
              readOnly
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none cursor-not-allowed"
            />
          </div>

          {/* Hari (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hari
            </label>
            <input
              type="text"
              value={hari}
              readOnly
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 outline-none cursor-not-allowed"
            />
          </div>

          {/* Upload Foto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto Bukti
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            {photoPreview ? (
              <div className="relative group">
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoPreview(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-md hover:bg-red-500 hover:text-white transition shadow-sm"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg py-8 text-center transition group bg-gray-50 hover:bg-blue-50"
              >
                <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2 group-hover:text-blue-500" />
                <p className="text-sm text-gray-500 group-hover:text-blue-600">
                  Klik untuk upload foto
                </p>
                <p className="text-xs text-gray-400 mt-1">Maks. 5MB</p>
              </button>
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition shadow-sm"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              Kirim Laporan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalReport;
