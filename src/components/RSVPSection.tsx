import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { invitationData } from "../data/invitationData";
import { SectionShell } from "./SectionShell";

export function RSVPSection() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [confirmedName, setConfirmedName] = useState("");

  useEffect(() => {
    const savedName = window.localStorage.getItem("nikah-rsvp-name");
    if (savedName) {
      setName(savedName);
      setConfirmedName(savedName);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError(invitationData.rsvp.error);
      setConfirmedName("");
      return;
    }

    window.localStorage.setItem("nikah-rsvp-name", trimmedName);
    setError("");
    setConfirmedName(trimmedName);
  };

  return (
    <SectionShell id="rsvp" label={invitationData.rsvp.label} className="bg-cream/40">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-serif text-2xl leading-relaxed text-ink-brown">
          {invitationData.rsvp.text}
        </p>
        <form className="mt-9 text-left" onSubmit={handleSubmit} noValidate>
          <label htmlFor="guest-name" className="font-display text-xs font-bold uppercase tracking-[0.22em] text-deep-gold">
            {invitationData.rsvp.fieldLabel}
          </label>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <input
              id="guest-name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (error) setError("");
              }}
              placeholder={invitationData.rsvp.placeholder}
              className="min-h-14 flex-1 rounded-lg border border-gold/45 bg-ivory px-5 font-body text-base text-ink-brown shadow-glow outline-none transition placeholder:text-ink-brown/40 focus:border-gold focus:ring-4 focus:ring-gold/20"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "rsvp-error" : "rsvp-success"}
            />
            <button
              type="submit"
              className="min-h-14 rounded-lg bg-emerald px-6 font-display text-xs font-semibold uppercase tracking-[0.18em] text-ivory shadow-gold transition hover:-translate-y-0.5 hover:bg-ink-brown focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold/40"
            >
              {invitationData.rsvp.button}
            </button>
          </div>
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                id="rsvp-error"
                className="mt-3 font-body text-sm font-semibold text-red-800"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                {error}
              </motion.p>
            )}
            {confirmedName && !error && (
              <motion.div
                id="rsvp-success"
                className="mt-5 flex items-start gap-3 rounded-lg border border-gold/45 bg-ivory p-4 text-emerald shadow-glow"
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 10 }}
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-deep-gold" size={20} aria-hidden="true" />
                <p className="font-body text-sm leading-relaxed">
                  {invitationData.rsvp.success}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </SectionShell>
  );
}
