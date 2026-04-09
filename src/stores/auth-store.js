"use client";

import { create } from "zustand";

export const useAuthStore = create((set) => ({
  adminUser: null,
  isAuthenticated: false,
  setAdminUser: (adminUser) => set({ adminUser, isAuthenticated: !!adminUser }),
  clearAdminUser: () => set({ adminUser: null, isAuthenticated: false }),
}));
