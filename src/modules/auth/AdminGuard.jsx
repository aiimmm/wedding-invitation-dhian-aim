"use client";

import { useAdminSessionQuery } from "@/lib/auth-api";
import { useAuthStore } from "@/stores/auth-store";
import { LoaderCircleIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const setAdminUser = useAuthStore((state) => state.setAdminUser);
  const clearAdminUser = useAuthStore((state) => state.clearAdminUser);

  const { data: user, isLoading } = useAdminSessionQuery();
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    if (isLoading) return;

    if (isAdmin) {
      setAdminUser(user);
      return;
    }

    clearAdminUser();
    const redirect = encodeURIComponent(pathname || "/dashboard");
    router.replace(`/admin/login?redirect=${redirect}`);
  }, [
    clearAdminUser,
    isAdmin,
    isLoading,
    pathname,
    router,
    setAdminUser,
    user,
  ]);

  if (isLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-2 text-muted-foreground">
        <LoaderCircleIcon className="animate-spin" size={18} />
        <span>Memeriksa sesi admin...</span>
      </div>
    );
  }

  return children;
}
