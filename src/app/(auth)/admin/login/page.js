import { Suspense } from "react";
import AuthModules from "@/modules/auth/AuthModules";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthModules />
    </Suspense>
  );
}
