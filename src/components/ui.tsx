"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Règles retenues : design system Klayer (couleurs, polices, bouton radius-md 8px) et house rules de
// taste-skill (pas d'eyebrow, de numérotation, de monospace, d'ombre, de dégradé ni de filet ; accent unique).

/**
 * Entrée d'un élément : il monte de 32px une fois, quand il approche de l'écran.
 * Le contenu n'est jamais masqué : sans script, ou avec prefers-reduced-motion, il reste visible et immobile.
 */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // déjà à l'écran : on ne le cache pas
    el.style.transform = "translateY(32px)";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        el.style.transition = `transform 700ms cubic-bezier(.22,1,.36,1) ${delay}s`;
        el.style.transform = "none";
        io.disconnect();
      },
      { rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function SectionHead({
  title,
  lead,
  onDark = false,
  id,
}: {
  title: string;
  lead?: string;
  onDark?: boolean;
  id?: string;
}) {
  return (
    <div className="max-w-4xl">
      <Reveal>
        <h2 id={id} className={`text-[1.75rem] leading-[1.1] sm:text-5xl ${onDark ? "text-white" : "text-ink"}`}>
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={0.08}>
          <p className={`mt-6 max-w-3xl text-lg leading-relaxed ${onDark ? "text-white" : "text-ink"}`}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Tag({ children, tone = "brume" }: { children: ReactNode; tone?: "brume" | "white" | "teal" }) {
  const styles = {
    brume: "bg-brume text-teal",
    white: "bg-white text-teal",
    teal: "bg-teal-surface text-white",
  }[tone];
  return <span className={`inline-flex w-fit items-center rounded-[4px] px-3 py-1.5 text-base font-semibold ${styles}`}>{children}</span>;
}

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light" | "outline-light";
}) {
  const styles = {
    primary: "bg-teal text-white hover:bg-teal-deep",
    light: "bg-white text-teal hover:bg-brume",
    "outline-light": "bg-teal-surface text-white hover:bg-teal-light",
  }[variant];
  return (
    <a
      href={href}
      className={`group inline-flex h-12 items-center justify-center gap-3 rounded-[8px] px-5 text-base font-semibold transition-[background-color,transform] duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${styles}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
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

/** Écran du produit, posé sur un cadre plein : la marche de ton sépare les surfaces, pas une ombre. */
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
    <div className={`rounded-[12px] p-2 ${onDark ? "bg-teal-light" : "bg-white"} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={w} height={h} loading="lazy" className="block h-auto w-full rounded-[6px]" />
    </div>
  );
}
