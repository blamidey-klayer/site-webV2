"use client";

import { useEffect, useState } from "react";
import { nav } from "@/content";
import { Lockup } from "./ui";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-white/90 shadow-[0_1px_0_#c9cac3] backdrop-blur-xl" : "bg-white"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-4 sm:px-8">
        <a href="#top" aria-label="Klayer, retour en haut">
          <Lockup size={22} />
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-[8px] px-3.5 py-2 text-[15px] font-medium text-secondary transition-colors hover:bg-brume hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#premier-pas"
            className="hidden h-10 items-center rounded-[8px] bg-teal px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-deep sm:inline-flex"
          >
            Nous contacter
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] ring-1 ring-filet md:hidden"
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-[2px] w-4 bg-ink transition-all ${open ? "top-[5px] rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[2px] w-4 bg-ink transition-all ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-filet px-4 pb-6 pt-2 md:hidden" aria-label="Navigation mobile">
          {[...nav, { label: "Nous contacter", href: "#premier-pas" }].map((item) => (
            <a
              key={item.href + item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-[8px] px-3 py-3 text-lg font-medium text-ink hover:bg-brume"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
