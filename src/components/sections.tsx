"use client";

import {
  accelerateurs,
  conviction,
  customerZero,
  hero,
  methode,
  piliers,
  pourquoi,
  premierPas,
  probleme,
  realisations,
  valeurs,
} from "@/content";
import { ParticleGlyph } from "./particle-glyph";
import { Button, Eyebrow, Lockup, Reveal, SectionHead, Tag } from "./ui";

const wrap = "mx-auto max-w-[1280px] px-4 sm:px-8";
const section = "py-24 sm:py-32";

export function Hero() {
  return (
    <section id="top" className="relative pt-[120px] sm:pt-[148px]">
      <div className={`${wrap} text-center`}>
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-brume px-4 py-1.5 text-sm font-semibold text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-brique" aria-hidden="true" />
            {hero.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-8 max-w-5xl text-[2.75rem] leading-[1.04] text-ink sm:text-7xl md:text-[5.5rem]">
            {hero.title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-secondary sm:text-xl">{hero.lead}</p>
        </Reveal>
        <Reveal delay={0.18} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={hero.primary.href}>{hero.primary.label}</Button>
          <Button href={hero.secondary.href} variant="ghost">
            {hero.secondary.label}
          </Button>
        </Reveal>
      </div>

      <Reveal delay={0.25} className={`${wrap} mt-16 sm:mt-20`}>
        <div className="relative overflow-hidden rounded-[28px] bg-brume">
          <ParticleGlyph className="block h-[360px] w-full sm:h-[520px]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap justify-center gap-2 p-5 sm:gap-3 sm:p-8">
            {hero.facts.map((f) => (
              <span key={f} className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-teal backdrop-blur sm:text-sm">
                {f}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Probleme() {
  return (
    <section className={section}>
      <div className={wrap}>
        <SectionHead eyebrow={probleme.eyebrow} title={probleme.title} />
        <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-6">
          {probleme.items.map((item, i) => (
            <Reveal key={item.tag} delay={i * 0.08}>
              <article className="h-full rounded-[var(--radius-card)] bg-brume p-8 sm:p-10">
                <Tag>{item.tag}</Tag>
                <h3 className="mt-6 text-2xl sm:text-3xl">{item.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-secondary">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Conviction() {
  return (
    <section className="bg-brume">
      <div className={`${wrap} ${section}`}>
        <SectionHead eyebrow={conviction.eyebrow} title={conviction.title} lead={conviction.lead} />
        <ol className="mt-14 divide-y divide-filet border-y border-filet">
          {conviction.shifts.map((s, i) => (
            <Reveal key={s.from} delay={i * 0.06}>
              <li className="grid items-baseline gap-2 py-7 sm:grid-cols-[64px_1fr_48px_1fr] sm:gap-6 sm:py-9">
                <span className="font-display text-sm font-semibold text-brique">0{i + 1}</span>
                <span className="font-display text-xl text-secondary sm:text-3xl">{s.from}</span>
                <span className="hidden text-2xl text-brique sm:block" aria-hidden="true">
                  →
                </span>
                <span className="font-display text-xl font-semibold text-ink sm:text-3xl">{s.to}</span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Piliers() {
  return (
    <section id="piliers" className={section}>
      <div className={wrap}>
        <SectionHead eyebrow={piliers.eyebrow} title={piliers.title} lead={piliers.lead} />
        <div className="mt-14 grid gap-4 lg:grid-cols-2 lg:gap-6">
          {piliers.items.map((p, i) => {
            const dark = i === 1;
            return (
              <Reveal key={p.tag} delay={i * 0.08}>
                <article
                  className={`flex h-full flex-col rounded-[var(--radius-panel)] p-8 sm:p-12 ${
                    dark ? "bg-teal text-white" : "bg-brume text-ink"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <Tag onDark={dark}>{p.tag}</Tag>
                    <span className={`text-sm ${dark ? "text-white/70" : "text-secondary"}`}>{p.audience}</span>
                  </div>
                  <h3 className="mt-8 text-3xl sm:text-[2.5rem] sm:leading-[1.1]">{p.title}</h3>
                  <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-white/80" : "text-secondary"}`}>{p.body}</p>
                  <ul className="mt-auto space-y-3 pt-10">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className={`flex gap-3 rounded-2xl p-4 text-[15px] leading-snug ${dark ? "bg-teal-surface" : "bg-white"}`}
                      >
                        <span className={dark ? "text-white" : "text-brique"} aria-hidden="true">
                          ●
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Methode() {
  return (
    <section id="methode" className="bg-brume">
      <div className={`${wrap} ${section}`}>
        <SectionHead eyebrow={methode.eyebrow} title={methode.title} lead={methode.lead} />
        <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {methode.steps.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06}>
              <li className="relative flex h-full flex-col rounded-[var(--radius-card)] bg-white p-6">
                <span className="font-display text-5xl font-semibold text-brume" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-xl">{s.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p className="mt-10 text-[15px] text-secondary">{methode.engagements}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Accelerateurs() {
  return (
    <section className={section}>
      <div className={wrap}>
        <SectionHead eyebrow={accelerateurs.eyebrow} title={accelerateurs.title} lead={accelerateurs.lead} />
        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
          {accelerateurs.items.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-[var(--radius-card)] bg-brume p-8">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-teal">{a.tag}</span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-brique">{a.status}</span>
                </div>
                <h3 className="mt-10 text-2xl">{a.title}</h3>
                <p className="mt-4 leading-relaxed text-secondary">{a.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CustomerZero() {
  return (
    <section className="px-4 sm:px-8">
      <div className="mx-auto max-w-[1280px] overflow-hidden rounded-[var(--radius-panel)] bg-teal">
        <div className="grid gap-12 p-8 sm:p-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:p-20">
          <div>
            <SectionHead eyebrow={customerZero.eyebrow} title={customerZero.title} lead={customerZero.lead} onDark />
            <ul className="mt-10 flex flex-wrap gap-2">
              {customerZero.points.map((p) => (
                <li key={p}>
                  <Tag onDark>{p}</Tag>
                </li>
              ))}
            </ul>
          </div>
          <Reveal delay={0.1} className="flex flex-col justify-end rounded-[var(--radius-card)] bg-teal-surface p-8 sm:p-10">
            <p className="flex items-baseline gap-3 font-display font-semibold text-white">
              <span className="text-7xl tabular-nums sm:text-[7.5rem] sm:leading-none">{customerZero.kpi.value}</span>
              <span className="text-xl sm:text-2xl">{customerZero.kpi.unit}</span>
            </p>
            <p className="mt-6 leading-relaxed text-white/80">{customerZero.kpi.caption}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Realisations() {
  return (
    <section id="realisations" className={section}>
      <div className={wrap}>
        <SectionHead eyebrow={realisations.eyebrow} title={realisations.title} lead={realisations.lead} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {realisations.items.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 0.06}>
              <article className="group flex h-full flex-col rounded-[var(--radius-card)] p-7 ring-1 ring-inset ring-filet transition-colors hover:bg-brume hover:ring-brume">
                <span className={`text-xs font-semibold ${r.tag === "AI for Code" ? "text-brique" : "text-teal"}`}>{r.tag}</span>
                <h3 className="mt-8 text-xl">{r.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-secondary">{r.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-sm text-secondary">{realisations.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Pourquoi() {
  return (
    <section id="pourquoi" className="bg-brume">
      <div className={`${wrap} ${section}`}>
        <SectionHead eyebrow={pourquoi.eyebrow} title={pourquoi.title} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          {pourquoi.items.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <article className="flex h-full gap-5 rounded-[var(--radius-card)] bg-white p-8">
                <span className="font-display text-sm font-semibold text-brique">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-secondary">{p.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 sm:mt-32">
          <SectionHead eyebrow={valeurs.eyebrow} title={valeurs.title} />
          <dl className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {valeurs.items.map((v, i) => (
              <Reveal key={v.name} delay={i * 0.06}>
                <div className="border-t-2 border-teal pt-6">
                  <dt className="font-display text-xl font-semibold">{v.name}</dt>
                  <dd className="mt-3 text-[15px] leading-relaxed text-secondary">{v.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function PremierPas() {
  return (
    <section id="premier-pas" className={section}>
      <div className={wrap}>
        <SectionHead eyebrow={premierPas.eyebrow} title={premierPas.title} lead={premierPas.lead} center />
        <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6">
          {premierPas.options.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.08}>
              <a
                href={`mailto:${premierPas.email}?subject=${encodeURIComponent(`${o.tag} : ${o.title}`)}`}
                className={`group flex h-full flex-col rounded-[var(--radius-panel)] p-8 transition-transform hover:-translate-y-1 sm:p-10 ${
                  i === 0 ? "bg-brume text-ink" : "bg-teal text-white"
                }`}
              >
                <Tag onDark={i === 1}>{o.tag}</Tag>
                <h3 className="mt-8 text-3xl">{o.title}</h3>
                <p className={`mt-4 text-lg leading-relaxed ${i === 0 ? "text-secondary" : "text-white/80"}`}>{o.body}</p>
                <span className="mt-10 inline-flex items-center gap-2 font-semibold">
                  En parler avec nous
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <p className="text-secondary">
            Ou écrivez-nous directement :{" "}
            <a href={`mailto:${premierPas.email}`} className="font-semibold text-teal underline-offset-4 hover:underline">
              {premierPas.email}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-teal-deep text-white">
      <div className={`${wrap} pt-20`}>
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <Lockup onDark size={24} />
            <p className="mt-6 text-white/70">Claude au travail, Claude dans le code. De la stratégie à la production.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-[15px] sm:grid-cols-3">
            <div>
              <Eyebrow onDark>Offres</Eyebrow>
              <ul className="space-y-3 text-white/85">
                <li><a href="#piliers" className="hover:text-white">AI for Work</a></li>
                <li><a href="#piliers" className="hover:text-white">AI for Code</a></li>
                <li><a href="#methode" className="hover:text-white">Méthode</a></li>
              </ul>
            </div>
            <div>
              <Eyebrow onDark>Klayer</Eyebrow>
              <ul className="space-y-3 text-white/85">
                <li><a href="#realisations" className="hover:text-white">Réalisations</a></li>
                <li><a href="#pourquoi" className="hover:text-white">Pourquoi Klayer</a></li>
              </ul>
            </div>
            <div>
              <Eyebrow onDark>Contact</Eyebrow>
              <ul className="space-y-3 text-white/85">
                <li><a href={`mailto:${premierPas.email}`} className="hover:text-white">{premierPas.email}</a></li>
                <li><a href="https://klayer.ai" className="hover:text-white">klayer.ai</a></li>
              </ul>
            </div>
          </div>
        </div>
        <p
          className="mt-20 select-none overflow-hidden pb-[0.12em] font-display font-semibold leading-[0.8] text-white/[0.07]"
          style={{ fontSize: "clamp(6rem, 24vw, 22rem)", letterSpacing: "-0.04em" }}
          aria-hidden="true"
        >
          Klayer
        </p>
        <div className="flex flex-col gap-2 border-t border-white/10 py-8 text-sm text-white/60 sm:flex-row sm:justify-between">
          <span>© 2026 Klayer</span>
          <span>Boutique française dédiée à l'écosystème Anthropic</span>
        </div>
      </div>
    </footer>
  );
}
