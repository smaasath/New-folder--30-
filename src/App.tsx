import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { OpeningScreen } from "./components/OpeningScreen";
import { HeroSection } from "./components/HeroSection";
import { QuranSection } from "./components/QuranSection";
import { DateSection } from "./components/DateSection";
import { VenueSection } from "./components/VenueSection";
import { QRCodeSection } from "./components/QRCodeSection";
import { FamiliesSection } from "./components/FamiliesSection";
import { DuaSection } from "./components/DuaSection";
import { RSVPSection } from "./components/RSVPSection";
import { Footer } from "./components/Footer";
import { MusicToggle } from "./components/MusicToggle";

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    document.body.style.overflow = hasEntered ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [hasEntered]);

  const handleEnter = async () => {
    const audio = audioRef.current;
    setHasEntered(true);

    if (!audio) return;

    audio.volume = 0.35;
    audio.loop = true;

    try {
      await audio.play();
      setIsMusicPlaying(true);
    } catch {
      setIsMusicPlaying(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch {
        setIsMusicPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsMusicPlaying(false);
  };

  return (
    <>
      {/* Replace /assets/bgm.mp3 with the final licensed wedding background music. */}
      <audio ref={audioRef} src="/assets/bgm.mp3" preload="none" loop />

      <div className="min-h-screen bg-ivory text-ink-brown">
        <AnimatePresence>
          {!hasEntered && <OpeningScreen onEnter={handleEnter} />}
        </AnimatePresence>

        {hasEntered && <MusicToggle isPlaying={isMusicPlaying} onToggle={toggleMusic} />}

        {hasEntered && (
          <motion.main
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.25, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroSection />
            <QuranSection />
            <DateSection />
            <VenueSection />
            <QRCodeSection />
            <FamiliesSection />
            <DuaSection />
            <RSVPSection />
            <Footer />
          </motion.main>
        )}
      </div>
    </>
  );
}
