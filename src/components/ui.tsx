"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p className={`mb-5 text-sm font-semibold ${onDark ? "text-white/70" : "text-brique"}`}>{children}</p>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  onDark = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  onDark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
      <h2 className={`text-[2.25rem] leading-[1.1] sm:text-5xl md:text-[3.5rem] ${onDark ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {lead && (
        <p className={`mt-6 text-lg leading-relaxed sm:text-xl ${onDark ? "text-white/80" : "text-secondary"}`}>{lead}</p>
      )}
    </Reveal>
  );
}

export function Tag({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className={`inline-flex w-fit self-start items-center rounded-full px-3 py-1 text-xs font-semibold ${
        onDark ? "bg-white/10 text-white" : "bg-brume text-teal"
      }`}
    >
      {children}
    </span>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "light";
}) {
  const styles = {
    primary: "bg-teal text-white hover:bg-teal-deep",
    ghost: "bg-transparent text-ink ring-1 ring-inset ring-filet hover:bg-brume",
    light: "bg-white text-teal hover:bg-brume",
  }[variant];
  return (
    <a
      href={href}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-colors ${styles}`}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

export function Lockup({ onDark = false, size = 26 }: { onDark?: boolean; size?: number }) {
  return (
    <span className="inline-flex items-center" style={{ gap: size * (10 / 26) }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={onDark ? "/glyph-white.svg" : "/glyph-teal.svg"} alt="" style={{ height: size * (30 / 26) }} />
      <span
        className={`font-display font-semibold ${onDark ? "text-white" : "text-teal"}`}
        style={{ fontSize: size, letterSpacing: "-0.015em", lineHeight: 1 }}
      >
        Klayer
      </span>
    </span>
  );
}
