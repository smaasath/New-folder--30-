import { DecorativeParticles } from "./DecorativeParticles";
import { invitationData } from "../data/invitationData";
import { SectionShell } from "./SectionShell";

export function DuaSection() {
  return (
    <SectionShell id="dua" label={invitationData.dua.label} className="bg-emerald text-ivory">
      <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] bg-[length:320px] opacity-[0.06]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(201,162,77,0.32),transparent_35%),radial-gradient(circle_at_15%_75%,rgba(248,238,216,0.18),transparent_30%)]" aria-hidden="true" />
      <DecorativeParticles />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-8 h-px w-44 bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />
        <p className="font-arabic text-4xl leading-loose text-ivory sm:text-6xl" dir="rtl">
          {invitationData.dua.arabic}
        </p>
        <p className="mx-auto mt-8 max-w-3xl font-serif text-2xl leading-relaxed text-cream sm:text-3xl">
          {invitationData.dua.english}
        </p>
      </div>
    </SectionShell>
  );
}
