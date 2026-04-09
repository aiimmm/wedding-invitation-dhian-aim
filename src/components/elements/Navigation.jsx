import { cn } from "@/lib/utils";
import {
  CalendarDaysIcon,
  ClockIcon,
  GiftIcon,
  HomeIcon,
  MessageCircleMoreIcon,
  UsersIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BlurFade } from "../ui/blur-fade";
import { Button } from "../ui/button";
import { Dock, DockIcon } from "../ui/dock";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const DATA = {
  navItems: [
    { id: "hero", label: "Home", icon: HomeIcon },
    { id: "couple", label: "Couple", icon: UsersIcon },
    { id: "countdown", label: "Countdown", icon: ClockIcon },
    { id: "event", label: "Event", icon: CalendarDaysIcon },
    { id: "gift", label: "Gift", icon: GiftIcon },
    { id: "wishes", label: "Guest Book", icon: MessageCircleMoreIcon },
  ],
};

export default function Navigation({ isPlaying, onToggleAudio }) {
  const [isActiveSection, setIsActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = DATA.navItems.map((item) =>
        document.getElementById(item.id),
      );

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setIsActiveSection(DATA.navItems[index].id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <BlurFade
      delay={0.4}
      inView
      direction="up"
      className="flex gap-2 fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <Dock className="rounded-full" direction="middle">
        {DATA.navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = isActiveSection === item.id;

          return (
            <BlurFade
              key={item.label}
              delay={0.5 + index * 0.05}
              inView
              direction="up"
            >
              <DockIcon>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "size-10 rounded-full",
                        isActive && "bg-primary text-primary-foreground",
                      )}
                    >
                      <Icon className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            </BlurFade>
          );
        })}

        <Separator orientation="vertical" className="h-full" />

        <BlurFade
          delay={0.5 + DATA.navItems.length * 0.05}
          inView
          direction="up"
        >
          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onToggleAudio}
                  variant="ghost"
                  size="icon"
                  className="animate-pulse size-10"
                >
                  {isPlaying ? (
                    <Volume2Icon className="size-4" />
                  ) : (
                    <VolumeXIcon className="size-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isPlaying ? "Mute" : "Unmute"}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </BlurFade>
      </Dock>
    </BlurFade>
  );
}
