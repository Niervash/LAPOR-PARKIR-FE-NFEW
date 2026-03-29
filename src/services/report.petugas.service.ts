import { cookieApiClient } from "../hooks";
import { getAuth, GetItem } from "../utils/cookies.storage";
import axios from "axios"; // Import axios for type guard

const BASE_URL = "https://parkir-production-b2ec.up.railway.app";

/**
 * Mengambil seluruh data parkir berdasarkan ID pengguna
 * @param idPengguna - ID pengguna
 * @returns Promise berisi data parkir
 */
const GetDataPetugas = async (idPengguna: string) => {
  try {
    const { Tokens } = await GetItem();
    if (!Tokens) {
      throw new Error("Token tidak ditemukan");
    }
    // console.log(
    //   `[GetDataParkir] Mengirim request ke: ${BASE_URL}/petugas/${idPengguna}`,
    // );
    const response = await cookieApiClient.get(
      `${BASE_URL}/petugas/${idPengguna}`,
      {
        headers: {
          Authorization: `Bearer ${Tokens}`,
        },
      },
    );
    console.log("[GetDataParkir] Respons sukses:", response.data);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("[GetDataParkir] Error fetching parkir data:", errorMessage);
    throw error;
  }
};

/**
 * Menambahkan data parkir baru
 * @param data - Objek data parkir yang akan dikirim
 * @returns Promise berisi respons dari server
 */
const AddDataPetugas = async (data: any) => {
  try {
    const { token } = await getAuth();
    if (!token) {
      throw new Error("Token tidak ditemukan");
    }

    console.log("[AddDataPetugas] Payload:", data);
    const response = await cookieApiClient.post(`${BASE_URL}/petugas`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("[AddDataPetugas] Respons sukses:", response.data);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("[AddDataPetugas] Gagal menambahkan data:", errorMessage);
    throw error;
  }
};

const GetAllData = async () => {
  try {
    const response = await cookieApiClient.get(`${BASE_URL}/alldata`);
    console.log(response.data);
    return response;
  } catch (error) {
    console.error("Error fetching parkir data:", error);
    throw error;
  }
};

export { GetDataPetugas, AddDataPetugas, GetAllData };
