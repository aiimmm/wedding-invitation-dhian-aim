import { BlurFade } from "@/components/ui/blur-fade";

export default function ClosingSections() {
  return (
    <section
      id="closing"
      className="bg-secondary/50 relative px-6 py-20 flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center text-center">
        <BlurFade delay={0.1} inView direction="up">
          <p className="max-w-xl text-base md:text-lg text-muted-foreground mb-6">
            Terima kasih atas perhatian dan doa restu Anda, yang menjadi
            kebahagiaan serta kehormatan besar bagi kami.
          </p>
        </BlurFade>
        <div className="space-y-6">
          <BlurFade delay={0.2} inView direction="up">
            <h3 className="text-3xl md:text-4xl font-semibold text-muted-foreground font-caligraphy">
              Wassalamualaikum Wr. Wb
            </h3>
          </BlurFade>
          <BlurFade delay={0.3} inView direction="up">
            <h2 className="text-3xl md:text-4xl text-muted-foreground">
              اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ
            </h2>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
