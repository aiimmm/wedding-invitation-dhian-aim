import api from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const guestBooksQueryKey = ["guest-books"];

export async function fetchGuestBooks() {
  const response = await api.get("/guest-books");
  return response.data?.data?.guestBooks ?? [];
}

export async function createGuestBook(payload) {
  const response = await api.post("/guest-books", payload);
  return response.data?.data?.guestBook;
}

export async function deleteGuestBook(id) {
  const response = await api.delete(`/guest-books/${id}`);
  return response.data?.data;
}

export function useGuestBooksQuery() {
  return useQuery({
    queryKey: guestBooksQueryKey,
    queryFn: fetchGuestBooks,
  });
}

export function useCreateGuestBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGuestBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: guestBooksQueryKey });
    },
  });
}

export function useDeleteGuestBookMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGuestBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: guestBooksQueryKey });
    },
  });
}
