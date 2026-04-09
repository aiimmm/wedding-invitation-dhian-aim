"use client";

import { WEDDING_DATA } from "@/commons/constants/wedding-data";
import FadeContent from "@/components/elements/FadeContent";
import { ParallaxBackground } from "@/components/elements/ParallaxBackground";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion } from "framer-motion";

export default function HeroSections() {
  return (
    <FadeContent
      blur={true}
      initialOpacity={50}
      easing="easeInOut"
      duration={1000}
    >
      <section
        id="hero"
        className="relative px-6 min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <ParallaxBackground />
        <div className="relative z-2 space-y-6 flex flex-col items-center justify-center text-center text-white">
          <BlurFade delay={0.1} inView direction="up">
            <p className="text-base md:text-lg text-muted-foreground tracking-widest uppercase">
              The Weeding of
            </p>
          </BlurFade>
          <div className="space-y-2">
            <BlurFade delay={0.15} inView direction="up">
              <h1 className="text-5xl md:text-6xl font-black font-caligraphy">
                {WEDDING_DATA.bride.name} & {WEDDING_DATA.groom.name}
              </h1>
            </BlurFade>
            <BlurFade delay={0.2} inView direction="up">
              <span className="text-lg md:text-xl text-muted-foreground">
                {WEDDING_DATA.weddingEvent.date}{" "}
                {WEDDING_DATA.weddingEvent.month}{" "}
                {WEDDING_DATA.weddingEvent.year}
              </span>
            </BlurFade>
          </div>
          <div className="max-w-xl space-y-2">
            <BlurFade delay={0.25} inView direction="up">
              <p className="text-base md:text-lg italic text-muted-foreground">
                “Dan di antara tanda-tanda (kebesaran)-Nya adalah Dia
                menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar
                kamu cenderung dan merasa tentram kepadanya“
              </p>
            </BlurFade>
            <BlurFade delay={0.3} inView direction="up">
              <p className="text-base md:text-lg text-muted-foreground">
                QS. Ar-Rum: 21
              </p>
            </BlurFade>
          </div>
        </div>
        <BlurFade delay={0.35} inView direction="up">
          <div className="flex flex-col items-center justify-center mt-12 space-y-4">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.6,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <div className="w-6 h-10 rounded-full border border-muted-foreground/30 flex justify-center p-1">
                <motion.div
                  className="w-1.5 h-2.5 rounded-full bg-muted-foreground/60"
                  animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.6,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>

            <motion.p
              className="text-xs tracking-widest uppercase text-muted-foreground"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll Down
            </motion.p>
          </div>
        </BlurFade>
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/10 to-black/50" />
      </section>
    </FadeContent>
  );
}
