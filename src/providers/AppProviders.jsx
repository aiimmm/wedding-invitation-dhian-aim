"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createQueryClient } from "@/lib/query-client";

export default function AppProviders({ children }) {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
