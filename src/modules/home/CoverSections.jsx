"use client";

import { WEDDING_DATA } from "@/commons/constants/wedding-data";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { useInvitationGuestBySlugQuery } from "@/lib/invitation-guests-api";
import { formatGuestNameFromToParam } from "@/lib/invitation-link";
import { MailOpenIcon } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function CoverSections({ onClick }) {
  const searchParams = useSearchParams();
  const toParam = searchParams.get("to");
  const slug = toParam?.trim() ?? "";

  const { data: invitationGuest } = useInvitationGuestBySlugQuery(slug, {
    enabled: Boolean(slug),
  });

  const guestName =
    typeof invitationGuest?.name === "string" && invitationGuest.name.length > 0
      ? invitationGuest.name
      : formatGuestNameFromToParam(slug);

  return (
    <section className="fixed inset-0 z-10 min-h-screen flex items-center justify-center overflow-hidden px-6">
      <Image
        src={WEDDING_DATA.backgroundImage}
        alt="cover"
        fill
        className="object-cover object-bottom sm:object-[center_80%] grayscale max-sm:scale-115"
        priority
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-20 flex flex-col items-center justify-center text-center">
        <BlurFade delay={0.1} inView direction="up">
          <p className="text-muted-foreground text-base md:text-lg tracking-widest uppercase mb-12">
            The Wedding of
          </p>
        </BlurFade>
        <div className="space-y-2 mb-6">
          <BlurFade delay={0.2} inView direction="up">
            <h1 className="text-5xl md:text-6xl font-black font-caligraphy">
              {WEDDING_DATA.bride.name}
            </h1>
          </BlurFade>
          <BlurFade delay={0.3} inView direction="up">
            <div className="text-5xl md:text-6xl font-black font-caligraphy">
              &
            </div>
          </BlurFade>
          <BlurFade delay={0.4} inView direction="up">
            <h1 className="text-5xl md:text-6xl font-black font-caligraphy">
              {WEDDING_DATA.groom.name}
            </h1>
          </BlurFade>
        </div>
        <BlurFade delay={0.5} inView direction="up">
          <p className="text-muted-foreground text-lg md:text-xl mb-12">
            {WEDDING_DATA.weddingEvent.date} {WEDDING_DATA.weddingEvent.month}{" "}
            {WEDDING_DATA.weddingEvent.year}
          </p>
        </BlurFade>
        <div className="flex flex-col items-center space-y-2 mb-12">
          <BlurFade delay={0.6} inView direction="up">
            <span className="text-muted-foreground text-base md:text-lg">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </span>
          </BlurFade>
          <BlurFade delay={0.7} inView direction="up">
            <h4 className="text-xl md:text-2xl max-w-2xl">{guestName}</h4>
          </BlurFade>
        </div>
        <BlurFade delay={0.8} inView direction="up">
          <Button variant="default" size="lg" onClick={onClick}>
            <MailOpenIcon className="mr-2" />
            Open Invitation
          </Button>
        </BlurFade>
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-black/50" />
    </section>
  );
}
