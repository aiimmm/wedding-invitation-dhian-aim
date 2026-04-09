"use client";

import { useGuestBooksQuery } from "@/lib/guest-books-api";
import { useInvitationGuestsQuery } from "@/lib/invitation-guests-api";
import { Link2Icon, MessageSquareIcon, ShieldCheckIcon } from "lucide-react";
import AccountInfo from "./AccountInfo";
import GuestBooksModules from "./GuestBooksModules";
import InvitationLinksModules from "./InvitationLinksModules";

function formatDate(value) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function StatCard({ icon: Icon, label, value, helper }) {
  return (
    <article className="rounded-xl border border-border bg-card px-4 py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="text-xl font-semibold">{value}</p>
          <p className="text-[11px] text-muted-foreground">{helper}</p>
        </div>
        <div className="rounded-lg border border-border bg-background p-2">
          <Icon size={18} className="text-muted-foreground" />
        </div>
      </div>
    </article>
  );
}

export default function DashboardModules() {
  const { data: guestBooks = [] } = useGuestBooksQuery();
  const { data: invitationGuests = [] } = useInvitationGuestsQuery();

  const latestGuestBookDate = guestBooks[0]?.createdAt;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-360 px-4 py-6 md:px-8 md:py-8">
        <div className="space-y-5">
          <AccountInfo />

          <section className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <StatCard
              icon={MessageSquareIcon}
              label="Total Guest Book"
              value={guestBooks.length}
              helper={`Terbaru: ${formatDate(latestGuestBookDate)}`}
            />
            <StatCard
              icon={Link2Icon}
              label="Link Undangan"
              value={invitationGuests.length}
              helper="Siap dibagikan ke tamu"
            />
            <StatCard
              icon={ShieldCheckIcon}
              label="Status Admin"
              value="Aktif"
              helper="Sesi login sedang berjalan"
            />
          </section>

          <section className="space-y-5">
            <InvitationLinksModules />
            <GuestBooksModules />
          </section>
        </div>
      </div>
    </main>
  );
}
