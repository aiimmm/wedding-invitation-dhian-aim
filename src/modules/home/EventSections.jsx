import { WEDDING_DATA } from "@/commons/constants/wedding-data";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { MapPinIcon } from "lucide-react";
import Link from "next/link";

export default function EventSections() {
  return (
    <section
      id="event"
      className="relative px-6 py-20 flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center text-center">
        <BlurFade delay={0.1} inView direction="up">
          <p className="text-muted-foreground text-base md:text-lg tracking-widest uppercase">
            Wedding
          </p>
        </BlurFade>
        <BlurFade delay={0.2} inView direction="up">
          <h2 className="text-5xl md:text-6xl font-semibold font-caligraphy mb-6">
            Event
          </h2>
        </BlurFade>
        <BlurFade delay={0.3} inView direction="up">
          <p className="max-w-xl text-base md:text-lg text-muted-foreground">
            Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala,
            insyaAllah kami akan menyelenggarakan acara:
          </p>
        </BlurFade>
        <div className="flex flex-col gap-6 mt-6">
          {WEDDING_DATA.weddingEvent.event.map((event, index) => (
            <div key={index} className="space-y-4">
              <BlurFade delay={0.4 + index * 0.1} inView direction="up">
                <h4 className="text-3xl sm:text-4xl font-semibold font-caligraphy">
                  {event.name}
                </h4>
              </BlurFade>
              <BlurFade delay={0.5 + index * 0.1} inView direction="up">
                <div className="text-sm md:text-base text-muted-foreground">
                  <p>
                    {WEDDING_DATA.weddingEvent.day},{" "}
                    {WEDDING_DATA.weddingEvent.date}{" "}
                    {WEDDING_DATA.weddingEvent.month}{" "}
                    {WEDDING_DATA.weddingEvent.year}
                  </p>
                  <p>{event.time}</p>
                </div>
              </BlurFade>
            </div>
          ))}
          <div className="space-y-4 mt-2">
            <BlurFade delay={0.8} inView direction="up">
              <p className="max-w-sm text-sm md:text-base text-muted-foreground">
                Acara akan diselenggarakan di:
              </p>
              <p className="max-w-sm text-sm md:text-base text-muted-foreground">
                {WEDDING_DATA.weddingEvent.location}
              </p>
            </BlurFade>
            <BlurFade delay={0.9} inView direction="up">
              <Button asChild variant="default">
                <Link
                  href={WEDDING_DATA.weddingEvent.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MapPinIcon /> View in Google Maps
                </Link>
              </Button>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
