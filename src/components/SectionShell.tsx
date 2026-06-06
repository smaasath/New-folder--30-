import { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionShellProps = {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({ id, label, children, className = "" }: SectionShellProps) {
  return (
    <section id={id} className={`relative overflow-hidden px-5 py-20 sm:py-24 ${className}`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <motion.img
          src="/assets/jasmine-spray.svg"
          alt=""
          className="section-flower section-flower-left"
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, x: -24, y: 18, rotate: -12 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: -7 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.img
          src="/assets/floral-corner.svg"
          alt=""
          className="section-flower section-flower-right"
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, x: 24, y: 18, rotate: 12 }}
          whileInView={{ opacity: 1, x: 0, y: 0, rotate: 8 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.15, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <motion.div
        className="relative mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 34 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-label">{label}</p>
        {children}
      </motion.div>
    </section>
  );
}
