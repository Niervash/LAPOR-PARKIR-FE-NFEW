export type UserRole = "admin" | "user";

export type ReportStatus = "pending" | "approve" | "reject";

export type WildStatus = "Liar" | "Tidak Liar";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface ReportAdmin {
  id: string;
  bukti: string; // photoUrl
  hari: string; // hari
  identitas_petugas: string; // identitasPetugas (underscore sesuai aslinya)
  latitude: any;
  lokasi: string; // lokasi
  longitude: any;
  status: WildStatus; // statusPost
  tanggaldanwaktu: string; // tanggaldanwaktu
}

export interface ReportItem {
  id_pl?: string; // mungkin tidak digunakan
  identitas_petugas: string; // ini id
  nama: string;
  tanggaldanwaktu: string; // atau Date
  latitude: number;
  longitude: number;
  lokasi: string;
  akurasi?: number;
  status: "Liar" | "Tidak Liar";
  status_post?: string;
  hari: string;
}
