"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/shared/button";
import { Container } from "@/components/shared/container";
import { Glyph, Lockup } from "@/components/shared/glyph";
import { MAIN_MENU, type MenuEntry } from "@/lib/menus";
import { cn } from "@/lib/cn";

const CLOSE_DELAY_MS = 100;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 10 6"
      className={cn("h-1.5 w-2.5 transition-transform duration-200", open && "rotate-180")}
      aria-hidden
    >
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  );
}

function MegaPanel({ entry, onNavigate }: { entry: MenuEntry; onNavigate: () => void }) {
  return (
    <div className="flex gap-x-16 py-10">
      {entry.sections?.map((section) => (
        <div key={section.title} className="min-w-56">
          <p className="font-mono text-[10px] font-medium uppercase tracking-wider text-gray-50">
            {section.title}
          </p>
          <ul className="mt-5 flex flex-col gap-y-5">
            {section.items.map((item) => (
              <li key={item.title}>
                <Link href={item.href} onClick={onNavigate} className="group block">
                  <span className="text-lg leading-none tracking-extra-tight text-white transition-colors group-hover:text-teal-300">
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="mt-1.5 block text-[13px] tracking-extra-tight text-gray-60">
                      {item.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {entry.banner && (
        <Link
          href={entry.banner.href}
          onClick={onNavigate}
          className="group relative ml-auto flex h-64 w-80 flex-col justify-end overflow-hidden border border-gray-15 bg-teal-night p-6"
        >
          <Glyph className="absolute -right-10 -top-6 h-40 w-auto text-teal-brand transition-transform duration-500 group-hover:scale-105" />
          <span className="noise absolute inset-0 opacity-40" aria-hidden />
          <span className="relative text-xl tracking-extra-tight text-white">
            {entry.banner.title}
          </span>
          <span className="relative mt-2 text-sm text-gray-70">{entry.banner.description}</span>
        </Link>
      )}
    </div>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 bottom-0 top-14 z-40 flex flex-col overflow-y-auto bg-black-pure px-5 lg:hidden"
          aria-label="Menu mobile"
        >
          <ul className="flex flex-col divide-y divide-gray-15 border-b border-gray-15">
            {MAIN_MENU.map((entry) => (
              <li key={entry.label}>
                {entry.sections ? (
                  <>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-5 text-2xl tracking-extra-tight"
                      aria-expanded={expanded === entry.label}
                      onClick={() => setExpanded(expanded === entry.label ? null : entry.label)}
                    >
                      {entry.label}
                      <Chevron open={expanded === entry.label} />
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded === entry.label && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          {entry.sections.flatMap((s) => s.items).map((item) => (
                            <li key={item.title}>
                              <Link
                                href={item.href}
                                onClick={onClose}
                                className="block py-2.5 text-base text-gray-70"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                          <li className="h-4" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={entry.href ?? "#"}
                    onClick={onClose}
                    className="block py-5 text-2xl tracking-extra-tight"
                  >
                    {entry.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="sticky bottom-0 mt-auto flex gap-3 bg-black-pure py-5">
            <Button href="mailto:contact@klayer.ai" theme="outlined" className="flex-1">
              Écrire
            </Button>
            <Button href="#contact" className="flex-1">
              Prendre rendez-vous
            </Button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActive(label);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActive(null), CLOSE_DELAY_MS);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const activeEntry = MAIN_MENU.find((m) => m.label === active && m.sections);

  return (
    <>
      {/* Voile sur la page quand un méga-menu est ouvert */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-0 z-30 bg-black-pure/80 transition-opacity duration-300",
          activeEntry ? "opacity-100" : "opacity-0",
        )}
      />
      <header
        className="sticky top-0 z-40 -mb-14 bg-black-pure after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gray-20 lg:-mb-16"
        onMouseLeave={scheduleClose}
      >
        <Container size="1920" className="flex h-14 items-center lg:h-16">
          <Link href="/" aria-label="Klayer, accueil" className="shrink-0">
            <Lockup />
          </Link>

          <nav className="ml-16 hidden lg:block xl:ml-24" aria-label="Navigation principale">
            <ul className="flex items-center gap-x-9">
              {MAIN_MENU.map((entry) => (
                <li key={entry.label} onMouseEnter={() => (entry.sections ? open(entry.label) : setActive(null))}>
                  {entry.sections ? (
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-1.5 py-2 text-[15px] tracking-extra-tight transition-colors",
                        active === entry.label ? "text-white" : "text-gray-80 hover:text-white",
                      )}
                      aria-expanded={active === entry.label}
                      onClick={() => setActive(active === entry.label ? null : entry.label)}
                    >
                      {entry.label}
                      <Chevron open={active === entry.label} />
                    </button>
                  ) : (
                    <Link
                      href={entry.href ?? "#"}
                      className="py-2 text-[15px] tracking-extra-tight text-gray-80 transition-colors hover:text-white"
                    >
                      {entry.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto hidden items-center gap-x-3 lg:flex">
            <Button href="mailto:contact@klayer.ai" theme="outlined" size="sm">
              Nous écrire
            </Button>
            <Button href="#contact" size="sm">
              Prendre rendez-vous
            </Button>
          </div>

          <button
            type="button"
            className="ml-auto flex size-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={cn(
                "h-px w-5 bg-white transition-transform",
                mobileOpen && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-white transition-transform",
                mobileOpen && "-translate-y-[3.5px] -rotate-45",
              )}
            />
          </button>
        </Container>

        {/* Méga-menu : hauteur animée, panneaux en fondu enchaîné */}
        <AnimatePresence>
          {activeEntry && (
            <motion.div
              key="mega"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-x-0 top-full hidden overflow-hidden border-b border-gray-20 bg-black-pure lg:block"
              onMouseEnter={() => activeEntry && open(activeEntry.label)}
            >
              <Container size="1920">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeEntry.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="lg:pl-[calc(124px+4rem)] xl:pl-[calc(124px+6rem)]"
                  >
                    <MegaPanel entry={activeEntry} onNavigate={() => setActive(null)} />
                  </motion.div>
                </AnimatePresence>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
