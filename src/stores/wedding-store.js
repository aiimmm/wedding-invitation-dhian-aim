"use client";

import { create } from "zustand";

export const useWeddingStore = create((set) => ({
  // Cover state
  isOpened: false,
  setIsOpened: (value) => set({ isOpened: value }),

  // Music state
  isPlaying: false,
  setIsPlaying: (value) => set({ isPlaying: value }),
  toggleMusic: () => set((state) => ({ isPlaying: !state.isPlaying })),

  // Guest name from query param
  guestName: "",
  setGuestName: (name) => set({ guestName: name }),

  // Wishes/RSVP
  wishes: [
    {
      id: 1,
      name: "Budi Santoso",
      message:
        "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.",
      date: "2024-12-20",
    },
    {
      id: 2,
      name: "Sari Dewi",
      message:
        "Bahagia selalu untuk kalian berdua! Semoga cinta kalian abadi selamanya.",
      date: "2024-12-19",
    },
    {
      id: 3,
      name: "Ahmad Hidayat",
      message:
        "Congratulations! Wishing you both a lifetime of love and happiness together.",
      date: "2024-12-18",
    },
  ],
  addWish: (wish) =>
    set((state) => ({
      wishes: [
        {
          ...wish,
          id: Date.now(),
          date: new Date().toISOString().split("T")[0],
        },
        ...state.wishes,
      ],
    })),

  // Active section for navigation
  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
}));
