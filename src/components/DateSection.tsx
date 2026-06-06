import { motion } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import { invitationData } from "../data/invitationData";
import { useCountdown } from "../hooks/useCountdown";
import { SectionShell } from "./SectionShell";

export function DateSection() {
  const countdown = useCountdown(invitationData.date.targetIso);
  const units = [
    ["Days", countdown.days],
    ["Hours", countdown.hours],
    ["Minutes", countdown.minutes],
    ["Seconds", countdown.seconds],
  ] as const;

  return (
    <SectionShell id="date" label={invitationData.date.label} className="bg-cream/45">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          className="mx-auto mb-7 grid h-14 w-14 place-items-center rounded-full border border-gold/50 bg-ivory text-deep-gold shadow-gold"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          aria-hidden="true"
        >
          <CalendarHeart size={24} />
        </motion.div>
        <div className="date-lockup">
          <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }}>
            {invitationData.date.day}
          </motion.span>
          <motion.strong initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.85, delay: 0.12 }}>
            {invitationData.date.dateNumber}
          </motion.strong>
          <motion.span initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.75, delay: 0.2 }}>
            {invitationData.date.weekday}
          </motion.span>
        </div>
        <p className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.24em] text-deep-gold">
          {invitationData.date.hijri}
        </p>

        {countdown.hasPassed ? (
          <p className="mt-10 font-serif text-3xl text-emerald">
            {invitationData.date.arrivedMessage}
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
            {units.map(([label, value]) => (
              <motion.div
                key={label}
                className="countdown-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
