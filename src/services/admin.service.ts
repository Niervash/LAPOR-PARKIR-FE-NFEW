import { cookieApiClient } from "../hooks";
import { getAuth } from "../utils/cookies.storage";

const BASE_URL = "https://parkir-production-b2ec.up.railway.app";

// Helper untuk mendapatkan token dan melakukan pengecekan
const getToken = async (): Promise<string> => {
  const { token } = await getAuth();
  if (!token) throw new Error("No authentication token found");
  return token;
};

// Mendapatkan data petugas
const GetDataPetugas = async (): Promise<any> => {
  try {
    const token = await getToken();
    console.log(token);
    const response = await cookieApiClient.get(`${BASE_URL}/adminpetugas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching petugas data:", error.message);
    } else {
      console.error("Error fetching petugas data:", error);
    }
    throw error;
  }
};

// Menghapus laporan petugas
const DeleteLaporanPetugas = async (id: string): Promise<any> => {
  try {
    const token = await getToken();
    const response = await cookieApiClient.delete(
      `${BASE_URL}/adminpetugas/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting petugas data:", error.message);
    } else {
      console.error("Error deleting petugas data:", error);
    }
    throw error;
  }
};

// Proses aksi (Approve/Reject) untuk petugas
const processPetugasAction = async (
  id: string,
  action: "approve" | "reject",
): Promise<any> => {
  try {
    const token = await getToken();
    const response = await cookieApiClient.post(
      `${BASE_URL}/adminpetugas/${id}`,
      { action },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error ${action.toLowerCase()}ing petugas:`, error.message);
      // Jika error memiliki response data (axios), bisa ditambahkan detail
      if ((error as any).response?.data) {
        console.error("Response data:", (error as any).response.data);
      }
    } else {
      console.error(`Error ${action.toLowerCase()}ing petugas:`, error);
    }
    throw error;
  }
};

// Fungsi khusus Approve
const ApprovePetugas = async (id: string): Promise<any> => {
  return processPetugasAction(id, "approve");
};

// Fungsi khusus Reject
const RejectPetugas = async (id: string): Promise<any> => {
  return processPetugasAction(id, "reject");
};

export { GetDataPetugas, DeleteLaporanPetugas, ApprovePetugas, RejectPetugas };
