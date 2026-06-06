import { motion } from "framer-motion";
import { invitationData } from "../data/invitationData";

const nameVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 py-20 sm:py-28">
      <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] bg-[length:360px] opacity-[0.055]" aria-hidden="true" />
      <img
        src="/assets/floral-left.svg"
        alt=""
        className="pointer-events-none absolute left-0 top-16 w-36 opacity-60 sm:w-56 lg:w-72"
        loading="lazy"
      />
      <img
        src="/assets/floral-right.svg"
        alt=""
        className="pointer-events-none absolute bottom-10 right-0 w-36 opacity-60 sm:w-56 lg:w-72"
        loading="lazy"
      />
      <motion.div
        className="relative mx-auto flex max-w-5xl flex-col items-center text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18 } },
        }}
      >
        <motion.p
          className="font-arabic text-3xl leading-relaxed text-emerald sm:text-5xl"
          variants={nameVariants}
          transition={{ duration: 0.85 }}
          dir="rtl"
        >
          {invitationData.bismillahArabic}
        </motion.p>
        <motion.p
          className="mt-3 max-w-2xl font-serif text-xl text-ink-brown/75 sm:text-2xl"
          variants={nameVariants}
          transition={{ duration: 0.85 }}
        >
          {invitationData.bismillahEnglish}
        </motion.p>
        <motion.p
          className="mt-14 font-display text-sm font-semibold uppercase tracking-[0.28em] text-deep-gold"
          variants={nameVariants}
          transition={{ duration: 0.8 }}
        >
          {invitationData.heroIntro}
        </motion.p>

        <div className="mt-9 grid w-full gap-7 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <motion.article
            className="person-panel"
            variants={nameVariants}
            transition={{ duration: 0.9 }}
          >
            <Portrait
              src={invitationData.groom.photo}
              alt={invitationData.groom.photoAlt}
              align="left"
            />
            <span className="panel-kicker">Groom</span>
            <h2>{invitationData.groom.name}</h2>
            <p>{invitationData.groom.parentLine}</p>
          </motion.article>
          <motion.div
            className="mx-auto hidden h-52 w-px bg-gradient-to-b from-transparent via-gold to-transparent lg:block"
            variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }}
            transition={{ duration: 1.15, delay: 0.2 }}
            aria-hidden="true"
          />
          <motion.article
            className="person-panel"
            variants={nameVariants}
            transition={{ duration: 0.9 }}
          >
            <Portrait
              src={invitationData.bride.photo}
              alt={invitationData.bride.photoAlt}
              align="right"
            />
            <span className="panel-kicker">Bride</span>
            <h2>{invitationData.bride.name}</h2>
            <p>{invitationData.bride.parentLine}</p>
          </motion.article>
        </div>

        <motion.p
          className="mt-10 font-serif text-2xl tracking-[0.16em] text-gold"
          variants={nameVariants}
          transition={{ duration: 0.8 }}
          aria-hidden="true"
        >
          {invitationData.divider}
        </motion.p>
        <motion.p
          className="mt-8 max-w-3xl font-serif text-2xl leading-relaxed text-ink-brown sm:text-3xl"
          variants={nameVariants}
          transition={{ duration: 0.85 }}
        >
          {invitationData.familyRequest}
        </motion.p>
        <motion.p
          className="mt-4 font-display text-lg font-semibold tracking-[0.24em] text-emerald"
          variants={nameVariants}
          transition={{ duration: 0.85 }}
        >
          {invitationData.inShaaAllah}
        </motion.p>
      </motion.div>
    </section>
  );
}

function Portrait({
  src,
  alt,
  align,
}: {
  src: string;
  alt: string;
  align: "left" | "right";
}) {
  return (
    <motion.div
      className="portrait-frame"
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover ${align === "right" ? "object-[58%_50%]" : "object-[42%_50%]"}`}
        loading="lazy"
      />
    </motion.div>
  );
}
