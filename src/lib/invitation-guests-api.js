import api from "@/lib/api-client";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const invitationGuestsQueryKey = ["invitation-guests"];

export async function fetchInvitationGuests() {
  const response = await api.get("/invitation-guests");
  return response.data?.data?.invitationGuests ?? [];
}

export async function createInvitationGuest(payload) {
  const response = await api.post("/invitation-guests", payload);
  return response.data?.data?.invitationGuest;
}

export async function deleteInvitationGuest(id) {
  const response = await api.delete(`/invitation-guests/${id}`);
  return response.data?.data;
}

export async function fetchInvitationGuestBySlug(slug) {
  if (!slug) return null;

  try {
    const response = await api.get(
      `/invitation-guests/by-slug/${encodeURIComponent(slug)}`,
    );
    return response.data?.data?.invitationGuest ?? null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export function useInvitationGuestsQuery() {
  return useQuery({
    queryKey: invitationGuestsQueryKey,
    queryFn: fetchInvitationGuests,
  });
}

export function useCreateInvitationGuestMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvitationGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invitationGuestsQueryKey });
    },
  });
}

export function useDeleteInvitationGuestMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInvitationGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invitationGuestsQueryKey });
    },
  });
}

export function useInvitationGuestBySlugQuery(slug, options = {}) {
  return useQuery({
    queryKey: [...invitationGuestsQueryKey, "slug", slug],
    queryFn: () => fetchInvitationGuestBySlug(slug),
    enabled: Boolean(slug),
    retry: false,
    ...options,
  });
}
