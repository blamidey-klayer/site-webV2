"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Rayons du design system : bouton radius-md (8px), tag radius-sm (4px),
// carte radius-lg/xl (11-12px), grand panneau radius-3xl (16px). Une carte n'a ni bord ni ombre.

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return <p className={`mb-5 text-base font-semibold ${onDark ? "text-white/85" : "text-brique"}`}>{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  onDark = false,
  wide = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  onDark?: boolean;
  wide?: boolean;
}) {
  return (
    <Reveal className={wide ? "max-w-5xl" : "max-w-3xl"}>
      <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
      <h2 className={`text-[2.125rem] leading-[1.12] sm:text-5xl ${onDark ? "text-white" : "text-ink"}`}>{title}</h2>
      {lead && (
        <p className={`mt-6 text-lg leading-relaxed sm:text-xl ${onDark ? "text-white/85" : "text-secondary"}`}>{lead}</p>
      )}
    </Reveal>
  );
}

export function Tag({ children, tone = "brume" }: { children: ReactNode; tone?: "brume" | "white" | "teal" }) {
  const styles = {
    brume: "bg-brume text-teal",
    white: "bg-white text-teal",
    teal: "bg-white/10 text-white",
  }[tone];
  return (
    <span className={`inline-flex w-fit items-center self-start rounded-[4px] px-2.5 py-1 text-[13px] font-semibold ${styles}`}>
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
  variant?: "primary" | "outline" | "light" | "outline-light";
}) {
  const styles = {
    primary: "bg-teal text-white hover:bg-teal-deep",
    outline: "text-teal ring-1 ring-inset ring-teal hover:bg-teal hover:text-white",
    light: "bg-white text-teal hover:bg-brume",
    "outline-light": "text-white ring-1 ring-inset ring-white/60 hover:bg-white hover:text-teal",
  }[variant];
  return (
    <a
      href={href}
      className={`inline-flex h-12 items-center justify-center gap-3 rounded-[8px] px-5 text-[15px] font-semibold transition-colors ${styles}`}
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

export function Screen({
  src,
  alt,
  w,
  h,
  className = "",
  onDark = false,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  className?: string;
  onDark?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading="lazy"
      className={`block h-auto w-full rounded-[11px] ${
        onDark ? "shadow-[0_24px_60px_rgba(0,0,0,0.45)]" : "shadow-[0_24px_60px_rgba(16,50,59,0.18)]"
      } ${className}`}
    />
  );
}

export function Icon({ name, className = "h-7 w-7" }: { name: string; className?: string }) {
  const paths: Record<string, ReactNode> = {
    star: <path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" />,
    scale: (
      <>
        <path d="M12 3v18M5 21h14M5 7h14" />
        <path d="M5 7l-3 7a3.5 3.5 0 006 0zM19 7l-3 7a3.5 3.5 0 006 0z" />
      </>
    ),
    bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
    check: (
      <>
        <path d="M12 2l2.4 1.8 3-.2 1 2.8 2.6 1.6-.8 2.9 1.2 2.7-2.4 1.8-.4 3-3 .4-1.8 2.4L12 20.8 9.2 22l-1.8-2.4-3-.4-.4-3L1.6 14.4l1.2-2.7L2 8.8l2.6-1.6 1-2.8 3 .2z" />
        <path d="M8 12l3 3 5-6" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
