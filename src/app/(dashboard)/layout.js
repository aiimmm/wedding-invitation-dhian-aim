import AdminGuard from "@/modules/auth/AdminGuard";

export default function DashboardLayout({ children }) {
  return <AdminGuard>{children}</AdminGuard>;
}
