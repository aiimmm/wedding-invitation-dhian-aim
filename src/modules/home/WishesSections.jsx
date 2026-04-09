"use client";

import EmptyState from "@/components/elements/EmptyState";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { extractApiErrorMessage } from "@/lib/api-client";
import {
  useCreateGuestBookMutation,
  useGuestBooksQuery,
} from "@/lib/guest-books-api";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCheckIcon,
  CircleAlertIcon,
  LoaderCircleIcon,
  MessageCircleHeartIcon,
  MessageSquareMoreIcon,
  SendIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Nama harus terdiri dari minimal 2 karakter.")
    .max(100, "Nama harus terdiri dari maksimal 100 karakter."),
  message: z
    .string()
    .min(3, "Pesan harus terdiri dari minimal 3 karakter.")
    .max(1000, "Pesan harus terdiri dari maksimal 1000 karakter."),
});

function getInitials(name) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "GM";
}

function formatDate(value) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function WishesSections() {
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const {
    data: guestBooks = [],
    isLoading,
    isError,
    error,
  } = useGuestBooksQuery();
  const createMutation = useCreateGuestBookMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitMessage("");
    setSubmitError("");

    try {
      await createMutation.mutateAsync(values);
      form.reset();
      setSubmitMessage("Terima kasih, ucapan Anda sudah kami terima.");
    } catch (createError) {
      setSubmitError(
        extractApiErrorMessage(
          createError,
          "Gagal mengirim ucapan. Coba beberapa saat lagi.",
        ),
      );
    }
  });

  // ✅ AUTO HIDE SUCCESS
  useEffect(() => {
    if (!submitMessage) return;

    const timer = setTimeout(() => {
      setSubmitMessage("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [submitMessage]);

  // ✅ AUTO HIDE ERROR
  useEffect(() => {
    if (!submitError) return;

    const timer = setTimeout(() => {
      setSubmitError("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [submitError]);

  return (
    <section
      id="wishes"
      className="relative px-6 py-20 flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full flex flex-col items-center justify-center text-center">
        <BlurFade delay={0.1} inView direction="up">
          <p className="text-muted-foreground text-base md:text-lg tracking-widest uppercase">
            Wedding
          </p>
        </BlurFade>
        <BlurFade delay={0.2} inView direction="up">
          <h2 className="text-5xl md:text-6xl font-semibold font-caligraphy mb-6">
            Wishes
          </h2>
        </BlurFade>
        <BlurFade delay={0.3} inView direction="up">
          <p className="max-w-xl text-base md:text-lg text-muted-foreground">
            Beri ucapan dan doa restu untuk kedua mempelai. Kehadiran dan doa
            dari Bapak/Ibu/Saudara/i adalah kebahagiaan bagi kami.
          </p>
        </BlurFade>

        <div className="w-full max-w-5xl flex flex-col lg:flex-row justify-center gap-4 mt-6">
          <BlurFade delay={0.4} inView direction="up" className="w-full h-full">
            <Card className="w-full h-full">
              <CardHeader className="flex items-center gap-3 text-left">
                <MessageSquareMoreIcon size={24} />
                <CardTitle className="text-lg font-semibold">
                  Leave a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form id="form-wishes" onSubmit={onSubmit}>
                  <FieldGroup>
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-wishes-name">
                            Nama
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-wishes-name"
                            aria-invalid={fieldState.invalid}
                            placeholder="Masukkan nama Anda"
                            autoComplete="off"
                          />
                          {fieldState.invalid && (
                            <FieldError
                              className="text-left"
                              errors={[fieldState.error]}
                            />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="message"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-wishes-message">
                            Ucapan & Doa Restu
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupTextarea
                              {...field}
                              id="form-wishes-message"
                              placeholder="Tulis ucapan terbaik Anda untuk kami."
                              rows={6}
                              aria-invalid={fieldState.invalid}
                            />
                            <InputGroupAddon align="block-end">
                              <InputGroupText className="tabular-nums">
                                {field.value?.length ?? 0}/1000
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                          {fieldState.invalid && (
                            <FieldError
                              className="text-left"
                              errors={[fieldState.error]}
                            />
                          )}
                        </Field>
                      )}
                    />

                    <AnimatePresence>
                      {submitMessage && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 text-sm px-4 py-4 rounded-2xl bg-input/50 text-emerald-400"
                        >
                          <CheckCheckIcon />
                          {submitMessage}
                        </motion.div>
                      )}

                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2 text-sm px-4 py-4 rounded-2xl bg-input/50 text-red-400"
                        >
                          <CircleAlertIcon />
                          <p>{submitError}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </FieldGroup>
                </form>
              </CardContent>
              <CardFooter>
                <Field orientation="horizontal">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                    className="flex items-center gap-2"
                  >
                    <XIcon />
                    Reset
                  </Button>
                  <Button
                    type="submit"
                    form="form-wishes"
                    disabled={createMutation.isPending}
                    className="flex items-center gap-2"
                  >
                    {createMutation.isLoading ? (
                      <>
                        <LoaderCircleIcon className="animate-spin" size={16} />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <SendIcon />
                        Kirim
                      </>
                    )}
                  </Button>
                </Field>
              </CardFooter>
            </Card>
          </BlurFade>

          <BlurFade delay={0.5} inView direction="up" className="w-full">
            <Card className="w-full text-left">
              <CardHeader className="flex items-center gap-3">
                <MessageCircleHeartIcon size={26} />
                <CardTitle className="text-lg font-semibold">
                  Total Comments ({guestBooks.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea
                  className={cn("h-92", {
                    "pr-4": !isLoading && !isError && guestBooks.length > 0,
                  })}
                >
                  {isLoading && (
                    <div className="h-80 flex items-center justify-center gap-2 text-muted-foreground">
                      <LoaderCircleIcon className="animate-spin" size={16} />
                      <span>Memuat ucapan...</span>
                    </div>
                  )}

                  {isError && (
                    <div className="h-80 flex items-center justify-center">
                      <EmptyState
                        title="Gagal memuat data"
                        description="Coba refresh halaman ini beberapa saat lagi."
                      />
                    </div>
                  )}

                  {!isLoading && !isError && guestBooks.length === 0 && (
                    <div className="h-80 flex items-center justify-center">
                      <EmptyState
                        title="Belum ada ucapan"
                        description="Jadilah yang pertama mengirim doa restu."
                      />
                    </div>
                  )}

                  {!isLoading &&
                    !isError &&
                    guestBooks.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-2 mb-4"
                      >
                        <Avatar>
                          <AvatarFallback>
                            {getInitials(item.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-base font-semibold">
                            {item.name}
                          </h4>
                          <p className="text-sm leading-tight bg-muted px-3 py-2 rounded-lg rounded-tl-xs">
                            {item.message}
                          </p>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
