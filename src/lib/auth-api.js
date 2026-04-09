import { useQuery } from "@tanstack/react-query";
import api from "./api-client";

export const adminSessionQueryKey = ["auth", "me"];

export async function loginAdmin(payload) {
  const response = await api.post("/auth/login", payload);
  return response.data?.data;
}

export async function logoutAdmin() {
  const response = await api.post("/auth/logout");
  return response.data?.data;
}

export async function fetchCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data?.data?.user ?? null;
}

export function useAdminSessionQuery(options = {}) {
  return useQuery({
    queryKey: adminSessionQueryKey,
    queryFn: fetchCurrentUser,
    staleTime: 0,
    refetchOnMount: "always",
    retry: false,
    ...options,
  });
}
