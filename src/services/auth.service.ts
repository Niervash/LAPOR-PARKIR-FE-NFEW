import { cookieApiClient } from "../hooks";
import { setLogin, GetItem } from "../utils/cookies.storage"; // added GetItem
import type { LoginResponseData } from "../types/login.types.interface";

// Use environment variable for base URL (fallback for development)
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://parkir-production-b2ec.up.railway.app";

interface LoginCredentials {
  email: string;
  password: string;
}

// Reusable result types
interface SuccessResult<T> {
  error: null;
  data: T;
}

interface FailureResult {
  error: string;
  data: null;
}

type LoginResult = SuccessResult<LoginResponseData> | FailureResult;

// Define Register payload type (adjust as needed based on your API)
interface RegisterCredentials {
  nama: string;
  email: string;
  jenis_kelamin: string; // or specific enum if available
  username: string;
  password: string;
  foto_profil?: string; // optional, based on your usage
}

type RegisterResponseData = any; // Replace with actual type if available
type RegisterResult = SuccessResult<RegisterResponseData> | FailureResult;

// Type for the logged-in user data – replace with actual type if available
type UserData = any; // e.g., import { User } from "../types/user.types";
type GetUserResult = SuccessResult<UserData> | FailureResult;

/**
 * Authenticates a user with email and password.
 * Returns a discriminated union indicating success or failure.
 */
async function AuthLogin({
  email,
  password,
}: LoginCredentials): Promise<LoginResult> {
  // Input validation
  if (!email?.trim() || !password?.trim()) {
    return { error: "Email and password are required.", data: null };
  }

  try {
    const payload = { email, password };
    const response = await cookieApiClient.post<LoginResponseData>(
      `${BASE_URL}/login`,
      payload,
    );

    // Ensure response contains a token
    if (!response.data?.token) {
      return { error: "Invalid server response: missing token.", data: null };
    }

    // Persist login data
    setLogin(response.data);

    return { error: null, data: response.data };
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Login failed. Please try again.";
    // In production, you may want to log errors to an external service
    console.error("Login error:", message);
    return { error: message, data: null };
  }
}

/**
 * Registers a new user.
 * Returns a discriminated union indicating success or failure.
 */
async function AuthRegister(
  credentials: RegisterCredentials,
): Promise<RegisterResult> {
  // Validate required fields
  const requiredFields: (keyof RegisterCredentials)[] = [
    "nama",
    "email",
    "jenis_kelamin",
    "username",
    "password",
  ];
  for (const field of requiredFields) {
    if (!credentials[field]?.trim()) {
      return { error: `${field} is required.`, data: null };
    }
  }

  // Optional: add email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(credentials.email)) {
    return { error: "Invalid email format.", data: null };
  }

  try {
    const payload = { ...credentials }; // foto_profil is optional
    const response = await cookieApiClient.post<RegisterResponseData>(
      `${BASE_URL}/user`,
      payload,
    );

    return { error: null, data: response.data };
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Registration failed. Please try again.";
    console.error("Registration error:", message);
    return { error: message, data: null };
  }
}

/**
 * Retrieves the currently logged-in user's data.
 * Uses the stored token to authenticate the request.
 * Returns a discriminated union indicating success or failure.
 */
async function AuthGetUser(): Promise<GetUserResult> {
  try {
    // Retrieve token from storage
    const { Tokens } = await GetItem(); // adjust if the property name differs (e.g., token)
    if (!Tokens) {
      return { error: "No authentication token found. Please log in again.", data: null };
    }

    // Make authenticated request to /me
    const response = await cookieApiClient.get<UserData>(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${Tokens}`,
      },
    });

    return { error: null, data: response.data };
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch user data. Please try again.";
    console.error("Get user error:", message);
    return { error: message, data: null };
  }
}

export { AuthLogin, AuthRegister, AuthGetUser };