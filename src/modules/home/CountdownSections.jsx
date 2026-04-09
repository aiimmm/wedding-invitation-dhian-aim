"use client";

import { WEDDING_DATA } from "@/commons/constants/wedding-data";
import { CountdownCard } from "@/components/elements/CountdownCard";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { CalendarPlus2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const WEDDING_DATE = new Date(`${WEDDING_DATA.weddingEvent.countDown}`);

export default function CountdownSections() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = WEDDING_DATE.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="countdown"
      className="bg-secondary/50 relative px-6 py-20 flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center justify-center text-center">
        <BlurFade delay={0.1} inView direction="up">
          <p className="text-muted-foreground text-base md:text-lg tracking-widest uppercase mb-4">
            Save The Date
          </p>
        </BlurFade>
        <BlurFade delay={0.2} inView direction="up">
          <h3 className="text-3xl md:text-4xl font-semibold font-caligraphy">
            Countdown to Our Big Day
          </h3>
        </BlurFade>
        <div className="flex flex-col items-center justify-center mt-12 mb-6">
          <div className="grid grid-flow-col gap-6 text-center auto-cols-max">
            <BlurFade delay={0.2} inView direction="up">
              <CountdownCard value={timeLeft.days} label="Days" />
            </BlurFade>
            <BlurFade delay={0.3} inView direction="up">
              <CountdownCard value={timeLeft.hours} label="Hours" />
            </BlurFade>
            <BlurFade delay={0.4} inView direction="up">
              <CountdownCard value={timeLeft.minutes} label="Minutes" />
            </BlurFade>
            <BlurFade delay={0.5} inView direction="up">
              <CountdownCard value={timeLeft.seconds} label="Seconds" />
            </BlurFade>
          </div>
        </div>
        <BlurFade delay={0.6} inView direction="up">
          <Button variant="default" asChild>
            <Link
              href={WEDDING_DATA.weddingEvent.addToCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <CalendarPlus2Icon />
              Add to Calendar
            </Link>
          </Button>
        </BlurFade>
      </div>
    </section>
  );
}
