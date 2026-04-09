"use client";

import { WEDDING_DATA } from "@/commons/constants/wedding-data";
import Navigation from "@/components/elements/Navigation";
import { Suspense, useRef, useState } from "react";
import ClosingSections from "./ClosingSections";
import CountdownSections from "./CountdownSections";
import CoupleSections from "./CoupleSections";
import CoverSections from "./CoverSections";
import EventSections from "./EventSections";
import FooterSections from "./FooterSections";
import GiftSections from "./GiftSections";
import HeroSections from "./HeroSections";
import WishesSections from "./WishesSections";

export default function HomeModules() {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  const openInvitation = async () => {
    setIsOpened(true);

    try {
      await audioRef.current?.play();
      setIsPlaying(true);
    } catch (err) {
      console.log("Autoplay blocked:", err);
    }
  };

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.log("Audio error:", err);
    }
  };

  return (
    <main>
      <audio
        ref={audioRef}
        src={WEDDING_DATA.weddingMusic}
        loop
        preload="auto"
      />

      {!isOpened ? (
        <Suspense fallback={null}>
          <CoverSections onClick={openInvitation} />
        </Suspense>
      ) : (
        <div className="relative">
          <Navigation isPlaying={isPlaying} onToggleAudio={toggleAudio} />
          <HeroSections />
          <CoupleSections />
          <CountdownSections />
          <EventSections />
          <GiftSections />
          <WishesSections />
          <ClosingSections />
          <FooterSections />
        </div>
      )}
    </main>
  );
}
