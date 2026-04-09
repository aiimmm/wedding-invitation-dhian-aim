"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { adminSessionQueryKey, logoutAdmin } from "@/lib/auth-api";
import { useAuthStore } from "@/stores/auth-store";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderCircleIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AccountInfo() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAdminUser = useAuthStore((state) => state.clearAdminUser);
  const adminUser = useAuthStore((state) => state.adminUser);

  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await logoutAdmin();
    } catch {
      // Ignore backend logout failure and clear local session state anyway.
    } finally {
      queryClient.setQueryData(adminSessionQueryKey, null);
      queryClient.removeQueries({ queryKey: adminSessionQueryKey });
      clearAdminUser();
      router.replace("/admin/login");
      setLogoutLoading(false);
    }
  };

  return (
    <Card className="rounded-xl border border-border bg-card py-0">
      <CardContent className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-lg font-semibold md:text-xl">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Kelola data undangan dan ucapan tamu.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Login sebagai{" "}
            <span className="font-medium text-foreground">
              {adminUser?.email}
            </span>
          </p>
        </div>

        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={logoutLoading}
          className="gap-2 md:self-start"
        >
          {logoutLoading ? (
            <LoaderCircleIcon className="animate-spin" size={16} />
          ) : (
            <LogOutIcon size={16} />
          )}
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
