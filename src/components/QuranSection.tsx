import { invitationData } from "../data/invitationData";
import { SectionShell } from "./SectionShell";

export function QuranSection() {
  return (
    <SectionShell id="quran" label={invitationData.quran.label}>
      <div className="lux-card mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-8 h-px w-32 bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />
        <p className="font-arabic text-4xl leading-relaxed text-emerald sm:text-6xl" dir="rtl">
          {invitationData.quran.arabic}
        </p>
        <p className="mt-7 font-serif text-2xl text-ink-brown sm:text-3xl">
          {invitationData.quran.english}
        </p>
        <p className="mt-3 font-body text-sm uppercase tracking-[0.22em] text-deep-gold">
          {invitationData.quran.reference}
        </p>
      </div>
    </SectionShell>
  );
}
