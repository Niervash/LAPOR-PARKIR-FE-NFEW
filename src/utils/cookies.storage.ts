import type { LoginResponseData } from "../types/login.types.interface";

export function setLogin(data: LoginResponseData): void {
  sessionStorage.setItem("Tokens", data.token);
  sessionStorage.setItem("role", data.role);
  sessionStorage.setItem("Id_Pengguna", String(data.id));
}

export function setLogout(): void {
  sessionStorage.removeItem("Tokens");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("Id_Pengguna");
}

export function getAuth() {
  return {
    token: sessionStorage.getItem("Tokens"),
    role: sessionStorage.getItem("role"),
    id: sessionStorage.getItem("Id_Pengguna"),
  };
}

export function GetItem() {
  const Tokens = sessionStorage.getItem("Tokens");
  const role = sessionStorage.getItem("role");
  const Id_Pengguna = sessionStorage.getItem("Id_Pengguna");
  return { Tokens, role, Id_Pengguna };
}
