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
      <motion.div
        className="mx-auto max-w-5xl"
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
