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
  bukti: string;
  hari: string;
  identitas_petugas: string;
  latitude: number;
  lokasi: string;
  longitude: number;
  status: WildStatus;
  tanggaldanwaktu: string;
}

export interface ReportItem {
  id: string; // ID unik laporan
  identitas_petugas: string; // identitas petugas
  nama: string; // nama pelapor/petugas
  tanggaldanwaktu: string; // format ISO atau string tanggal
  latitude: number;
  longitude: number;
  lokasi: string;
  akurasi?: number; // opsional
  status: WildStatus; // "Liar" | "Tidak Liar"
  status_post: ReportStatus; // "pending" | "approve" | "reject"
  hari: string; // hari dalam bahasa Indonesia
  // field opsional lain jika diperlukan
  bukti: any;
  deskripsi?: string;
}
