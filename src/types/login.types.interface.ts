// ==========================
// Login Request
// ==========================
export interface LoginPayload {
  email: string;
  password: string;
}

// ==========================
// Login Response dari backend
// ==========================
export interface LoginResponseData {
  token: string;
  role: string;
  id: string | number;
}

// ==========================
// Result function login
// ==========================
export interface AuthLoginResult {
  error: string | null;
  data: LoginResponseData | null;
}
