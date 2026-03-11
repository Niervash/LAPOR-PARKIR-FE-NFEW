export type UserRole = "admin" | "user";

export type ReportStatus = "pending" | "approve" | "reject";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Report {
  id: string;
  userId: string; // idPengguna
  namaPetugas: string; // nama
  identitasPetugas: string; // identitas_petugas
  akurasi: string; // akurasi
  hari: string; // hari
  identitas_petugas: string;
  lokasi: string;
  tanggaldanwaktu: string;
  statusLiar: string; // status (Tidak Liar / Liar)
  statusPost: "pending" | "approve" | "reject"; // status_post
  location: string; // lokasi
  latitude: number;
  longitude: number;
  photoUrl: string; // bukti
  createdAt: string; // tanggaldanwaktu / createdAt
  description?: string; // opsional jika ada deskripsi masalah
  zoom: any;
}
