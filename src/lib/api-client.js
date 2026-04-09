import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787",
  withCredentials: true,
  timeout: 15000,
});

export function extractApiErrorMessage(error, fallback = "Terjadi kesalahan.") {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error?.message ?? fallback;
  }
  return fallback;
}

export default api;
