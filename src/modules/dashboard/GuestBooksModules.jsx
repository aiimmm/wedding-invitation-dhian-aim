"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { extractApiErrorMessage } from "@/lib/api-client";
import {
  useDeleteGuestBookMutation,
  useGuestBooksQuery,
} from "@/lib/guest-books-api";
import { LoaderCircleIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";

function formatDate(value) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function GuestBooksModules() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: guestBooks = [],
    isLoading,
    isError,
    error,
  } = useGuestBooksQuery();
  const deleteMutation = useDeleteGuestBookMutation();

  const handleDelete = async (id) => {
    try {
      setErrorMessage("");
      await deleteMutation.mutateAsync(id);
    } catch (deleteError) {
      setErrorMessage(
        extractApiErrorMessage(
          deleteError,
          "Gagal menghapus ucapan. Coba lagi.",
        ),
      );
    }
  };

  return (
    <Card className="rounded-xl border border-border bg-card">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-base md:text-lg">
          Guest Book ({guestBooks.length})
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Daftar ucapan yang masuk dari halaman undangan.
        </p>
      </CardHeader>
      <CardContent className="">
        <div className="space-y-3">
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <LoaderCircleIcon className="animate-spin" size={16} />
              <span>Memuat data guest book...</span>
            </div>
          )}

          {isError && (
            <p className="text-sm text-destructive">
              {extractApiErrorMessage(error, "Gagal memuat data guest book.")}
            </p>
          )}

          {errorMessage && (
            <p className="text-sm text-destructive">{errorMessage}</p>
          )}

          {!isLoading && !isError && guestBooks.length === 0 && (
            <div className="rounded-xl border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground">
              Belum ada ucapan yang masuk.
            </div>
          )}

          {!isLoading && !isError && guestBooks.length > 0 && (
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="hidden grid-cols-[220px_1fr_110px] gap-4 border-b border-border bg-muted/40 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
                <div>Pengirim</div>
                <div>Ucapan</div>
                <div className="text-right">Aksi</div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {guestBooks.map((item) => (
                  <article
                    key={item.id}
                    className="grid gap-3 border-b border-border bg-background px-4 py-4 last:border-b-0 md:grid-cols-[220px_1fr_110px] md:gap-4"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium leading-tight">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed text-foreground/90">
                      {item.message}
                    </p>

                    <div className="flex items-start justify-start md:justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                        disabled={deleteMutation.isPending}
                        className="gap-2"
                      >
                        <Trash2Icon size={14} />
                        Hapus
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
