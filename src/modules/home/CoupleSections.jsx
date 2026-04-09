import { WEDDING_DATA } from "@/commons/constants/wedding-data";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LuInstagram as InstagramIcon } from "react-icons/lu";

export default function CoupleSections() {
  return (
    <section
      id="couple"
      className="relative px-6 py-20 flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full flex flex-col items-center justify-center text-center">
        <div className="space-y-6 mb-6">
          <BlurFade delay={0.1} inView direction="up">
            <h2 className="text-3xl md:text-4xl text-muted-foreground">
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </h2>
          </BlurFade>
          <BlurFade delay={0.15} inView direction="up">
            <h3 className="text-3xl md:text-4xl font-semibold text-muted-foreground font-caligraphy">
              Assalamualaikum Wr. Wb
            </h3>
          </BlurFade>
        </div>
        <BlurFade delay={0.2} inView direction="up">
          <p className="max-w-lg text-base md:text-lg text-muted-foreground">
            Tanpa mengurangi rasa hormat, kami bermaksud mengundang
            Bapak/Ibu/Saudara/I untuk menghadiri acara Pernikahan kami
          </p>
        </BlurFade>
        <div className="flex flex-col gap-6 mt-12 w-full max-w-4xl justify-center items-center">
          <BlurFade delay={0.3} inView direction="left">
            <div className="flex items-center flex-col sm:flex-row gap-6 sm:gap-12 w-full">
              <div className="relative aspect-square sm:size-44 size-40 border-2 border-primary/50 rounded-full">
                <Image
                  src={WEDDING_DATA.bride.image}
                  alt={WEDDING_DATA.bride.name}
                  width={200}
                  height={200}
                  className="rounded-full aspect-square object-cover object-center p-1.5"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="space-y-4">
                <h4 className="text-3xl sm:text-4xl font-semibold font-caligraphy">
                  {WEDDING_DATA.bride.fullTitle}
                </h4>
                <div className="text-sm md:text-base text-muted-foreground">
                  <p>Putri dari</p>
                  <p>{WEDDING_DATA.bride.parents}</p>
                </div>
                <Button variant="default" asChild>
                  <Link
                    href={`https://www.instagram.com/${WEDDING_DATA.bride.instagram.replace(/@/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <InstagramIcon />
                    {WEDDING_DATA.bride.instagram}
                  </Link>
                </Button>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={0.4} inView direction="up">
            <div className="text-4xl sm:text-5xl font-caligraphy">&</div>
          </BlurFade>
          <BlurFade delay={0.5} inView direction="right">
            <div className="flex items-center flex-col sm:flex-row-reverse gap-6 sm:gap-12 w-full">
              <div className="relative aspect-square sm:size-44 size-40 border-2 border-primary/50 rounded-full">
                <Image
                  src={WEDDING_DATA.groom.image}
                  alt={WEDDING_DATA.groom.name}
                  width={200}
                  height={200}
                  className="rounded-full aspect-square object-cover object-center p-1.5"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="space-y-4">
                <h4 className="text-3xl sm:text-4xl font-semibold font-caligraphy">
                  {WEDDING_DATA.groom.fullTitle}
                </h4>
                <div className="text-sm md:text-base text-muted-foreground">
                  <p>Putra dari</p>
                  <p>{WEDDING_DATA.groom.parents}</p>
                </div>
                <Button variant="default" asChild>
                  <Link
                    href={`https://www.instagram.com/${WEDDING_DATA.groom.instagram.replace(/@/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <InstagramIcon />
                    {WEDDING_DATA.groom.instagram}
                  </Link>
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
