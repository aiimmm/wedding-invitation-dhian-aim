"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { extractApiErrorMessage } from "@/lib/api-client";
import {
  useCreateInvitationGuestMutation,
  useDeleteInvitationGuestMutation,
  useInvitationGuestsQuery,
} from "@/lib/invitation-guests-api";
import { buildInvitationPath } from "@/lib/invitation-link";
import {
  CheckIcon,
  CopyIcon,
  LoaderCircleIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

function parseNameLines(value) {
  return value
    .split(/\r?\n/g)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function InvitationLinksModules() {
  const [nameInput, setNameInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState("");

  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useInvitationGuestsQuery();
  const createMutation = useCreateInvitationGuestMutation();
  const deleteMutation = useDeleteInvitationGuestMutation();

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const totalGuests = useMemo(() => items.length, [items]);

  const handleGenerateLinks = async () => {
    setErrorMessage("");

    const names = parseNameLines(nameInput);
    if (names.length === 0) {
      setErrorMessage("Isi minimal satu nama tamu (satu nama per baris).");
      return;
    }

    setIsGenerating(true);

    let createdCount = 0;
    let firstErrorMessage = "";

    for (const name of names) {
      try {
        await createMutation.mutateAsync({ name });
        createdCount += 1;
      } catch (createError) {
        if (!firstErrorMessage) {
          firstErrorMessage = extractApiErrorMessage(
            createError,
            "Gagal menyimpan data tamu undangan.",
          );
        }
      }
    }

    setIsGenerating(false);
    if (createdCount > 0) {
      setNameInput("");
    }
    if (createdCount === 0 && firstErrorMessage) {
      setErrorMessage(firstErrorMessage);
      return;
    }
    if (firstErrorMessage) {
      setErrorMessage(`Sebagian data gagal disimpan. ${firstErrorMessage}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      setErrorMessage("");
      await deleteMutation.mutateAsync(id);
    } catch (deleteError) {
      setErrorMessage(
        extractApiErrorMessage(
          deleteError,
          "Gagal menghapus data tamu undangan. Coba lagi.",
        ),
      );
    }
  };

  const handleCopyLink = async (id, link) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((current) => (current === id ? "" : current));
      }, 1500);
    } catch {
      setErrorMessage("Gagal menyalin link. Coba lagi.");
    }
  };

  return (
    <Card className="rounded-xl border border-border bg-card">
      <CardHeader className="border-b border-border">
        <CardTitle className="text-base md:text-lg">
          Link Undangan ({totalGuests})
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Tambah daftar tamu dan generate link personal otomatis.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field className="space-y-2">
          <FieldLabel htmlFor="guest-name-list">Daftar Nama Tamu</FieldLabel>
          <Textarea
            id="guest-name-list"
            rows={4}
            placeholder={
              "Satu nama per baris\nMuhammad Rahim, S.Kom.\nFtr. Nurul Dhian Al Islamiati"
            }
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            className="resize-y"
          />
          <p className="text-xs text-muted-foreground">
            Sistem akan membuat slug otomatis berdasarkan nama tamu.
          </p>
        </Field>

        {errorMessage && (
          <p className="text-sm text-destructive">{errorMessage}</p>
        )}

        <Button
          onClick={handleGenerateLinks}
          className="gap-2"
          disabled={isGenerating}
        >
          {isGenerating ? (
            <LoaderCircleIcon className="animate-spin" size={16} />
          ) : (
            <PlusIcon size={16} />
          )}
          {isGenerating ? "Menyimpan..." : "Generate Link"}
        </Button>

        <div className="space-y-2">
          <p className="text-sm font-medium">Daftar Link Tamu</p>

          <div className="space-y-3">
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <LoaderCircleIcon className="animate-spin" size={16} />
                <span>Memuat daftar tamu undangan...</span>
              </div>
            )}

            {isError && (
              <p className="text-sm text-destructive">
                {extractApiErrorMessage(
                  error,
                  "Gagal memuat daftar tamu undangan.",
                )}
              </p>
            )}

            {!isLoading && !isError && items.length === 0 && (
              <p className="rounded-xl border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground">
                Belum ada link tamu. Tambahkan nama lalu klik Generate Link.
              </p>
            )}

            {!isLoading && !isError && items.length > 0 && (
              <div className="overflow-hidden rounded-xl border border-border">
                <div className="hidden grid-cols-[1fr_1fr_170px] gap-3 border-b border-border bg-muted/40 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
                  <div>Nama Tamu</div>
                  <div>Link</div>
                  <div className="text-right">Aksi</div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {items.map((item) => {
                    const invitationPath = buildInvitationPath(item.slug);
                    const fullLink = origin
                      ? `${origin}${invitationPath}`
                      : invitationPath;
                    return (
                      <article
                        key={item.id}
                        className="grid gap-3 border-b border-border bg-background px-4 py-4 last:border-b-0 md:grid-cols-[1fr_1fr_170px]"
                      >
                        <div className="space-y-1">
                          <h4 className="font-medium leading-tight">
                            {item.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            slug: {item.slug}
                          </p>
                        </div>

                        <Link
                          href={invitationPath}
                          target="_blank"
                          className="break-all text-sm text-primary underline decoration-primary/60 underline-offset-4"
                        >
                          {fullLink}
                        </Link>

                        <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => handleCopyLink(item.id, fullLink)}
                          >
                            {copiedId === item.id ? (
                              <CheckIcon size={14} />
                            ) : (
                              <CopyIcon size={14} />
                            )}
                            {copiedId === item.id ? "Tersalin" : "Copy"}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="gap-2"
                            onClick={() => handleDelete(item.id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2Icon size={14} />
                            Hapus
                          </Button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
