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
