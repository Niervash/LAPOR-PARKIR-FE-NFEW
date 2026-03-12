import { AlertTriangle } from "lucide-react";

// Interface Report didefinisikan di sini
export interface Report {
  id: string;
  userName: string;
  createdAt: string;
  location: string;
  vehicleType: string;
  description: string;
  latitude: number;
  longitude: number;
  photoUrl?: string;
  status: "Liar" | "Tidak Liar";
}

export const dummyReports: Report[] = [
  {
    id: "1",
    userName: "Budi Santoso",
    createdAt: "2025-03-10 14:30",
    location: "Universitas Indonesia, Depok",
    vehicleType: "Motor",
    description: "Parkir di trotoar depan gerbang UI",
    latitude: -6.3604,
    longitude: 106.8275,
    photoUrl: "https://via.placeholder.com/600x400?text=Parkir+Liar+1",
    status: "Liar",
  },
  {
    id: "2",
    userName: "Siti Aminah",
    createdAt: "2025-03-11 09:15",
    location: "Mall Kelapa Gading, Jakarta",
    vehicleType: "Mobil",
    description: "Parkir di area hijau",
    latitude: -6.1587,
    longitude: 106.9085,
    photoUrl: "https://via.placeholder.com/600x400?text=Parkir+Liar+2",
    status: "Tidak Liar",
  },
  {
    id: "3",
    userName: "Ahmad Fauzi",
    createdAt: "2025-03-09 18:45",
    location: "Stasiun Tugu, Yogyakarta",
    vehicleType: "Motor",
    description: "Parkir di jalur khusus difabel",
    latitude: -7.7893,
    longitude: 110.3632,
    photoUrl: "https://via.placeholder.com/600x400?text=Parkir+Liar+3",
    status: "Liar",
  },
  {
    id: "4",
    userName: "Dewi Lestari",
    createdAt: "2025-03-08 11:20",
    location: "Universitas Gadjah Mada",
    vehicleType: "Mobil",
    description: "Parkir di depan rektorat",
    latitude: -7.7712,
    longitude: 110.3775,
    photoUrl: "https://via.placeholder.com/600x400?text=Parkir+Liar+4",
    status: "Tidak Liar",
  },
  {
    id: "5",
    userName: "Rizki Pratama",
    createdAt: "2025-03-12 07:50",
    location: "Pasar Baru, Bandung",
    vehicleType: "Motor",
    description: "Parkir di bahu jalan",
    latitude: -6.9147,
    longitude: 107.6098,
    photoUrl: "https://via.placeholder.com/600x400?text=Parkir+Liar+5",
    status: "Liar",
  },
];

// Konfigurasi status bisa juga ditaruh sini atau di file terpisah
export const statusConfig = {
  Liar: {
    label: "Liar",
    bg: "bg-red-100 text-red-700",
    dot: "bg-red-500",
    icon: AlertTriangle,
  },
  "Tidak Liar": {
    label: "Tidak Liar",
    bg: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    icon: AlertTriangle,
  },
};