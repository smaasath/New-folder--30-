import { motion } from "framer-motion";
import { invitationData } from "../data/invitationData";
import { DecorativeParticles } from "./DecorativeParticles";

type OpeningScreenProps = {
  onEnter: () => void;
};

export function OpeningScreen({ onEnter }: OpeningScreenProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex h-[100dvh] items-center justify-center overflow-hidden overscroll-none bg-ivory px-4 py-6 text-center sm:px-5"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      <DecorativeParticles />
      <motion.div
        className="absolute inset-0 bg-[url('/assets/pattern.svg')] bg-[length:420px] opacity-[0.08]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 2 }}
      />
      <motion.div
        className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gold/20 to-transparent"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      />
      <motion.div
        className="relative max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.22, delayChildren: 0.35 } },
        }}
      >
        <motion.p
          className="font-arabic text-3xl leading-relaxed text-emerald sm:text-5xl"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
          }}
          dir="rtl"
        >
          {invitationData.bismillahArabic}
        </motion.p>
        <motion.p
          className="mx-auto mt-4 max-w-xl font-serif text-lg leading-relaxed text-ink-brown/80 sm:text-2xl"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
          }}
        >
          {invitationData.bismillahEnglish}
        </motion.p>
        <motion.div
          className="my-6 flex items-center justify-center gap-4 text-gold sm:my-10 sm:gap-5"
          variants={{
            hidden: { opacity: 0, scaleX: 0.7 },
            visible: { opacity: 1, scaleX: 1, transition: { duration: 1 } },
          }}
          aria-hidden="true"
        >
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold sm:w-20" />
          <span className="text-xl">✦</span>
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold sm:w-20" />
        </motion.div>
        <motion.h1
          className="font-display text-2xl font-semibold tracking-[0.14em] text-emerald sm:text-5xl sm:tracking-[0.28em]"
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 1.15, ease: "easeOut" },
            },
          }}
        >
          {invitationData.coupleShort}
        </motion.h1>
        <motion.p
          className="mt-4 font-serif text-4xl italic text-deep-gold sm:text-5xl"
          variants={{
            hidden: { opacity: 0, scale: 0.85 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
          }}
        >
          &
        </motion.p>
        <motion.button
          type="button"
          onClick={onEnter}
          className="mt-7 rounded-full border border-gold/60 bg-emerald px-7 py-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-ivory shadow-gold outline-none transition duration-300 hover:-translate-y-0.5 hover:bg-ink-brown focus-visible:ring-4 focus-visible:ring-gold/40 sm:mt-9 sm:px-8 sm:text-sm sm:tracking-[0.24em]"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
          }}
          whileHover={{ boxShadow: "0 0 34px rgba(201, 162, 77, 0.45)" }}
          aria-label="Open the Nikah invitation"
        >
          Open Invitation
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
