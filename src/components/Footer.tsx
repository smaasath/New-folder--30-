import { invitationData } from "../data/invitationData";

export function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 py-16 text-center">
      <div className="absolute inset-0 bg-[url('/assets/pattern.svg')] bg-[length:280px] opacity-[0.06]" aria-hidden="true" />
      <div className="relative mx-auto max-w-3xl">
        <p className="font-display text-3xl font-semibold tracking-[0.18em] text-emerald sm:text-5xl">
          {invitationData.coupleFooter}
        </p>
        <p className="mt-4 font-body text-sm uppercase tracking-[0.18em] text-deep-gold">
          {invitationData.footer.dateLine}
        </p>
        <p className="mt-9 font-arabic text-4xl text-emerald" dir="rtl">
          {invitationData.footer.arabic}
        </p>
        <p className="mt-2 font-serif text-2xl text-ink-brown">
          {invitationData.footer.english}
        </p>
      </div>
    </footer>
  );
}
