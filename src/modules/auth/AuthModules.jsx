"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminSessionQuery } from "@/lib/auth-api";
import { useAuthStore } from "@/stores/auth-store";
import { LockKeyholeIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import LoginForm from "./LoginForm";

export default function AuthModules() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAdminUser = useAuthStore((state) => state.setAdminUser);

  const redirectTo = useMemo(() => {
    const redirect = searchParams.get("redirect");
    if (!redirect || !redirect.startsWith("/")) return "/dashboard";
    return redirect;
  }, [searchParams]);

  const { data: sessionUser, isLoading: sessionLoading } =
    useAdminSessionQuery();

  useEffect(() => {
    if (sessionLoading) return;
    if (sessionUser?.role === "ADMIN") {
      setAdminUser(sessionUser);
      router.replace(redirectTo);
    }
  }, [redirectTo, router, sessionLoading, sessionUser, setAdminUser]);

  return (
    <main className="fixed inset-0 z-10 min-h-screen flex items-center justify-center overflow-hidden p-6">
      <Image
        src="/images/cover_v1.webp"
        alt="cover"
        fill
        className="object-cover object-bottom sm:object-[center_80%] grayscale max-sm:scale-115"
        priority
      />
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-black/50" />

      <Card className="w-full max-w-md bg-card/10 backdrop-blur-sm border border-card/20 relative z-20">
        <CardHeader className="items-center text-center">
          <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-2">
            <LockKeyholeIcon size={22} />
          </div>
          <CardTitle className="text-2xl font-bold uppercase tracking-wider">
            Admin Login
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Masuk ke dashboard untuk mengelola guest book.
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm redirectTo={redirectTo} />
        </CardContent>
      </Card>
    </main>
  );
}
