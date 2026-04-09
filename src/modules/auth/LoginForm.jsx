import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { extractApiErrorMessage } from "@/lib/api-client";
import {
  adminSessionQueryKey,
  fetchCurrentUser,
  loginAdmin,
  logoutAdmin,
} from "@/lib/auth-api";
import { useAuthStore } from "@/stores/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Format email tidak valid."),
  password: z.string().min(1, "Password wajib diisi."),
});

export default function LoginForm({ redirectTo }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setAdminUser = useAuthStore((state) => state.setAdminUser);
  const clearAdminUser = useAuthStore((state) => state.clearAdminUser);
  const [submitError, setSubmitError] = useState("");

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const loginMutation = useMutation({
    mutationFn: loginAdmin,
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError("");

    try {
      await loginMutation.mutateAsync(values);
      const user = await fetchCurrentUser();

      if (user?.role !== "ADMIN") {
        await logoutAdmin().catch(() => {});
        queryClient.setQueryData(adminSessionQueryKey, null);
        queryClient.removeQueries({ queryKey: adminSessionQueryKey });
        clearAdminUser();
        setSubmitError("Akun ini tidak memiliki akses admin.");
        return;
      }

      setAdminUser(user);
      queryClient.setQueryData(adminSessionQueryKey, user);
      router.replace(redirectTo);
    } catch (error) {
      queryClient.setQueryData(adminSessionQueryKey, null);
      clearAdminUser();
      setSubmitError(
        extractApiErrorMessage(
          error,
          "Login gagal. Periksa email dan password.",
        ),
      );
    }
  });

  return (
    <form id="form-login" onSubmit={onSubmit} className="space-y-4">
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-email">Email</FieldLabel>
              <Input
                {...field}
                id="form-login-email"
                type="email"
                placeholder="Masukkan email Anda"
                autoComplete="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-login-password">Password</FieldLabel>
              <Input
                {...field}
                id="form-login-password"
                type="password"
                aria-invalid={fieldState.invalid}
                placeholder="Masukkan password Anda"
                autoComplete="current-password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Field>
          {submitError && <FieldError errors={[{ message: submitError }]} />}

          <Button
            type="submit"
            form="form-login"
            size="lg"
            className="w-full gap-2"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending && (
              <LoaderCircleIcon className="animate-spin" size={16} />
            )}
            Masuk Dashboard
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
