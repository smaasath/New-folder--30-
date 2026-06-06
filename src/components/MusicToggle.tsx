import { Volume2, VolumeX } from "lucide-react";

type MusicToggleProps = {
  isPlaying: boolean;
  onToggle: () => void;
};

export function MusicToggle({ isPlaying, onToggle }: MusicToggleProps) {
  const Icon = isPlaying ? Volume2 : VolumeX;

  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-gold/50 bg-ivory/90 text-emerald shadow-gold backdrop-blur-md transition hover:-translate-y-0.5 hover:text-deep-gold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
      aria-label={isPlaying ? "Mute background music" : "Unmute background music"}
      title={isPlaying ? "Mute music" : "Play music"}
    >
      <Icon aria-hidden="true" size={20} />
    </button>
  );
}
