"use client";

import {
  accelerateurs,
  aiCode,
  aiWork,
  bascules,
  boutique,
  hero,
  iaNative,
  methode,
  piliers,
  premierPas,
  probleme,
  realisations,
  valeurs,
} from "@/content";
import { motion } from "framer-motion";
import { ParticleGlyph } from "./particle-glyph";
import { Button, Eyebrow, Icon, Lockup, Reveal, Screen, SectionHead, Tag } from "./ui";

const wrap = "mx-auto max-w-[1280px] px-4 sm:px-8";
const pad = "py-24 sm:py-32";

// Quadrillage discret des slides du deck, posé en fond de certaines scènes.
function Grid({ onDark = false }: { onDark?: boolean }) {
  const c = onDark ? "rgba(255,255,255,0.05)" : "rgba(16,50,59,0.06)";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(${c} 1px, transparent 1px), linear-gradient(90deg, ${c} 1px, transparent 1px)`,
        backgroundSize: "52px 52px",
        maskImage: "radial-gradient(ellipse at 70% 50%, black 20%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at 70% 50%, black 20%, transparent 75%)",
      }}
    />
  );
}

/* 1. Couverture */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-teal pt-[72px] text-white">
      <Grid onDark />
      <div className={`${wrap} relative grid items-center gap-8 py-16 sm:py-24 lg:grid-cols-[1.6fr_1fr] lg:gap-0 lg:py-28`}>
        <div>
          <Reveal>
            <Eyebrow onDark>{hero.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="text-[2.375rem] leading-[1.08] sm:text-7xl lg:text-[4.5rem] xl:whitespace-nowrap">
              {hero.title[0]}
              <br />
              {hero.title[1]}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{hero.lead}</p>
          </Reveal>
          <Reveal delay={0.18} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primary.href} variant="light">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="outline-light">
              {hero.secondary.label}
            </Button>
          </Reveal>
          <Reveal delay={0.24} className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-[15px] text-white/70">
            {hero.facts.map((f) => (
              <span key={f} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-brique" aria-hidden="true" />
                {f}
              </span>
            ))}
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <ParticleGlyph onDark className="block h-[260px] w-full sm:h-[420px] lg:h-[520px]" />
        </Reveal>
      </div>
    </section>
  );
}

/* 2. Le constat : moitié blanche, moitié teal */
export function Probleme() {
  return (
    <section className="grid md:grid-cols-2">
      {probleme.items.map((item, i) => {
        const dark = i === 1;
        return (
          <div key={item.tag} className={dark ? "bg-teal text-white" : "bg-white text-ink"}>
            <div className={`flex h-full flex-col px-4 py-20 sm:px-8 sm:py-28 lg:px-16 ${i === 0 ? "md:ml-auto" : ""} max-w-[640px]`}>
              {i === 0 && <Eyebrow>{probleme.eyebrow}</Eyebrow>}
              {i === 1 && <div className="hidden md:block md:h-[44px]" aria-hidden="true" />}
              <Reveal delay={i * 0.1}>
                <p className={`text-lg font-semibold ${dark ? "text-white/85" : "text-teal"}`}>{item.tag}</p>
                <h2 className={`mt-4 text-[2.125rem] leading-[1.1] sm:text-5xl ${dark ? "text-white" : "text-ink"}`}>{item.title}</h2>
                <p className={`mt-8 text-xl leading-relaxed ${dark ? "text-white/85" : "text-secondary"}`}>{item.body}</p>
              </Reveal>
            </div>
          </div>
        );
      })}
    </section>
  );
}

/* 3. Notre conviction : hier, demain */
export function Bascules() {
  return (
    <section className="bg-brume">
      <div className={`${wrap} ${pad}`}>
        <SectionHead eyebrow={bascules.eyebrow} title={bascules.title} />
        <div className="mt-14">
          <div className="hidden grid-cols-[1fr_56px_1fr] gap-4 pb-4 text-sm font-semibold text-secondary sm:grid">
            <span>Hier</span>
            <span />
            <span className="text-brique">Demain</span>
          </div>
          <div className="space-y-3">
            {bascules.rows.map((r, i) => (
              <Reveal key={r.hier} delay={i * 0.08}>
                <div className="grid items-center gap-3 sm:grid-cols-[1fr_56px_1fr] sm:gap-4">
                  <div className="rounded-[12px] bg-white/60 px-6 py-6 font-display text-xl text-secondary sm:text-2xl">{r.hier}</div>
                  <span className="hidden justify-center text-2xl text-brique sm:flex" aria-hidden="true">
                    →
                  </span>
                  <div className="rounded-[12px] bg-teal px-6 py-6 font-display text-xl font-semibold text-white sm:text-2xl">{r.demain}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal>
          <p className="mt-10 font-display text-xl font-semibold text-teal">{bascules.footer}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* 4. Deux piliers */
export function Piliers() {
  return (
    <section id="piliers" className="bg-white">
      <div className={`${wrap} ${pad}`}>
        <SectionHead eyebrow={piliers.eyebrow} title={piliers.title} wide />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {piliers.items.map((p, i) => {
            const dark = i === 0;
            return (
              <Reveal key={p.tag} delay={i * 0.08}>
                <a
                  href={p.href}
                  className={`group flex h-full min-h-[340px] flex-col rounded-[16px] p-8 transition-transform hover:-translate-y-1 sm:p-12 ${
                    dark ? "bg-teal text-white" : "bg-brume text-ink"
                  }`}
                >
                  <p className={`font-display text-lg font-semibold ${dark ? "text-white/85" : "text-teal"}`}>{p.tag}</p>
                  <h3 className="mt-5 text-3xl leading-[1.12] sm:text-[2.5rem]">{p.title}</h3>
                  <div className="flex-1" />
                  <div className="mt-10 flex items-end justify-between gap-4">
                    <p className={dark ? "text-white/85" : "text-secondary"}>{p.audience}</p>
                    <span className="text-2xl transition-transform group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 5. AI for Work : écrans empilés */
export function AiWork() {
  const [sheets, finder, cowork] = aiWork.screens;
  return (
    <section id="ai-work" className="relative overflow-hidden bg-brume">
      <Grid />
      <div className={`${wrap} ${pad} relative grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]`}>
        <div>
          <SectionHead eyebrow={aiWork.eyebrow} title={aiWork.title} lead={aiWork.lead} />
          <Reveal>
            <ul className="mt-8 flex flex-wrap gap-2">
              {aiWork.points.map((p) => (
                <li key={p}>
                  <Tag tone="white">{p}</Tag>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-lg text-secondary">{aiWork.footer}</p>
          </Reveal>
        </div>
        <div className="relative">
          <div className="relative aspect-[16/11]">
            <motion.div
              className="absolute right-0 top-0 w-[78%]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Screen {...sheets} />
            </motion.div>
            <motion.div
              className="absolute left-0 top-[20%] w-[52%]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 }}
            >
              <Screen {...finder} />
            </motion.div>
            <motion.div
              className="absolute bottom-0 right-[4%] w-[76%]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.24 }}
            >
              <Screen {...cowork} />
            </motion.div>
          </div>
          <p className="mt-4 text-right text-sm text-secondary">{aiWork.caption}</p>
        </div>
      </div>
    </section>
  );
}

/* 6. AI for Code : terminal et Klayer BO */
export function AiCode() {
  const [bo, terminal] = aiCode.screens;
  return (
    <section id="ai-code" className="relative overflow-hidden bg-teal text-white">
      <Grid onDark />
      <div className={`${wrap} ${pad} relative grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]`}>
        <div>
          <SectionHead eyebrow={aiCode.eyebrow} title={aiCode.title} lead={aiCode.lead} onDark />
          <ol className="mt-10 space-y-3">
            {aiCode.steps.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06}>
                <li className="rounded-[12px] bg-teal-surface p-5">
                  <p className="font-display font-semibold">{s.name}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-white/80">{s.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-10">
            <Button href={aiCode.cta.href} variant="light">
              {aiCode.cta.label}
            </Button>
          </Reveal>
        </div>
        <div>
          <div className="relative aspect-[16/12]">
            <motion.div
              className="absolute right-0 top-0 w-[84%]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Screen {...bo} onDark />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-0 w-[76%]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <Screen {...terminal} onDark />
            </motion.div>
          </div>
          <p className="mt-4 text-right text-sm text-white/70">{aiCode.caption}</p>
        </div>
      </div>
    </section>
  );
}

/* 7. Méthode : une marche qui monte */
export function Methode() {
  return (
    <section id="methode" className="bg-brume">
      <div className={`${wrap} ${pad}`}>
        <SectionHead eyebrow={methode.eyebrow} title={methode.title} lead={methode.lead} wide />
        <ol className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
          {methode.steps.map((s, i) => {
            const last = i === methode.steps.length - 1;
            return (
              <Reveal key={s.name} delay={i * 0.07}>
                <li
                  className={`flex flex-col rounded-[12px] p-6 ${last ? "bg-teal text-white" : "bg-white text-ink"}`}
                  style={{ minHeight: 280 + i * 56 }}
                >
                  <span className={`font-display text-5xl font-semibold ${last ? "text-white" : "text-brique"}`}>{i + 1}</span>
                  <div className="flex-1" />
                  <h3 className="mt-8 text-2xl">{s.name}</h3>
                  <p className="mt-3 font-semibold leading-snug">{s.result}</p>
                  <p className={`mt-2 text-[15px] ${last ? "text-white/80" : "text-secondary"}`}>{s.detail}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
        <Reveal>
          <p className="mt-10 text-[15px] text-secondary">{methode.engagements}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* 8. Accélérateurs */
export function Accelerateurs() {
  const [ws, ao, code] = accelerateurs.items;
  const top = "flex h-[260px] flex-col gap-2.5 bg-brume p-6";
  const bottom = "flex flex-1 flex-col gap-2 p-7";
  return (
    <section className="bg-white">
      <div className={`${wrap} ${pad}`}>
        <SectionHead eyebrow={accelerateurs.eyebrow} title={accelerateurs.title} lead={accelerateurs.lead} />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <Reveal>
            <article className="flex h-full flex-col overflow-hidden rounded-[16px] bg-brume/45">
              <div className={top}>
                {accelerateurs.memoire.map((m) => (
                  <p key={m} className="rounded-[8px] bg-white px-4 py-2.5 text-[15px]">
                    {m}
                  </p>
                ))}
              </div>
              <div className={bottom}>
                <p className="text-sm font-semibold text-brique">{ws.tag}</p>
                <h3 className="text-xl leading-snug">{ws.title}</h3>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="flex h-full flex-col overflow-hidden rounded-[16px] bg-brume/45">
              <div className={top}>
                <p className="text-[15px] font-semibold text-teal"># support-claude</p>
                <p className="w-[88%] rounded-[8px] bg-white px-4 py-3 text-[15px] leading-snug">Comment relancer la Skill de veille ?</p>
                <p className="ml-auto w-[88%] rounded-[8px] bg-teal px-4 py-3 text-[15px] leading-snug text-white">
                  Claude : voici la marche à suivre, ticket ouvert.
                </p>
              </div>
              <div className={bottom}>
                <p className="text-sm font-semibold text-brique">{ao.tag}</p>
                <h3 className="text-xl leading-snug">{ao.title}</h3>
              </div>
            </article>
          </Reveal>
          <Reveal delay={0.16}>
            <article className="flex h-full flex-col overflow-hidden rounded-[16px] bg-brume/45">
              <div className={`${top} justify-center gap-1.5 font-mono text-[15px]`}>
                {accelerateurs.boucle.map((b) => (
                  <p key={b}>
                    <span className="text-brique">✓</span> {b}
                  </p>
                ))}
              </div>
              <div className={bottom}>
                <p className="text-sm font-semibold text-brique">{code.tag}</p>
                <h3 className="text-xl leading-snug">{code.title}</h3>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 9. IA native : Claude au centre, nos outils autour */
function Orbit() {
  const n = iaNative.outils.length + 1;
  const items = [{ name: "Klayer BO", icon: "", bo: true }, ...iaNative.outils.map((o) => ({ ...o, bo: false }))];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute inset-[14%] rounded-full border border-white/10" aria-hidden="true" />
      <div className="absolute inset-[30%] rounded-full border border-white/5" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[16px] bg-white shadow-[0_0_80px_rgba(174,79,46,0.35)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/outils/claude.svg" alt="Claude" className="h-1/2 w-1/2" />
      </div>
      {items.map((o, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(a) * 40;
        const y = 50 + Math.sin(a) * 40;
        return (
          <motion.div
            key={o.name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
          >
            <span
              className={`flex items-center gap-2 whitespace-nowrap rounded-[8px] px-3 py-2 text-sm font-semibold sm:text-[15px] ${
                o.bo ? "bg-brique text-white" : "bg-teal-surface text-white"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={o.bo ? "/glyph-white.svg" : o.icon} alt="" className="h-4 w-auto sm:h-5" />
              {o.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

export function IaNative() {
  return (
    <section id="ia-native" className="relative overflow-hidden bg-teal text-white">
      <Grid onDark />
      <div className={`${wrap} ${pad} relative grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]`}>
        <div>
          <SectionHead eyebrow={iaNative.eyebrow} title={iaNative.title} lead={iaNative.lead} onDark />
          <Reveal>
            <p className="mt-8 font-display text-xl font-semibold leading-snug sm:text-2xl">{iaNative.strong}</p>
          </Reveal>
          <Reveal className="mt-12 rounded-[12px] bg-teal-surface p-7">
            <p className="flex items-baseline gap-3 font-display font-semibold">
              <span className="text-6xl tabular-nums sm:text-7xl">{iaNative.kpi.value}</span>
              <span className="text-xl">{iaNative.kpi.unit}</span>
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">{iaNative.kpi.caption}</p>
          </Reveal>
        </div>
        <Orbit />
      </div>
    </section>
  );
}

/* 10. Déjà livré */
export function Realisations() {
  return (
    <section id="realisations" className="bg-white">
      <div className={`${wrap} ${pad}`}>
        <SectionHead eyebrow={realisations.eyebrow} title={realisations.title} />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {realisations.items.map((r, i) => {
            const dark = r.tag === "AI for Code";
            return (
              <Reveal key={r.title} delay={(i % 3) * 0.06}>
                <article className={`flex h-full min-h-[220px] flex-col rounded-[12px] p-7 ${dark ? "bg-teal text-white" : "bg-brume"}`}>
                  <p className={`text-sm font-semibold ${dark ? "text-white/85" : "text-teal"}`}>{r.tag}</p>
                  <div className="flex-1" />
                  <h3 className="mt-8 text-2xl leading-snug">{r.title}</h3>
                  <p className={`mt-2 ${dark ? "text-white/85" : "text-secondary"}`}>{r.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal>
          <p className="mt-8 text-sm text-secondary">{realisations.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* 11. Pourquoi Klayer */
export function Boutique() {
  return (
    <section id="pourquoi" className="bg-teal text-white">
      <div className={`${wrap} ${pad}`}>
        <SectionHead eyebrow={boutique.eyebrow} title={boutique.title} onDark />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {boutique.items.map((b, i) => (
            <Reveal key={b.title} delay={(i % 2) * 0.08}>
              <article className="flex h-full gap-6 rounded-[12px] bg-teal-surface p-8 sm:p-10">
                <Icon name={b.icon} className="h-9 w-9 shrink-0" />
                <div>
                  <h3 className="text-2xl">{b.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-white/85">{b.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 12. Valeurs */
export function Valeurs() {
  return (
    <section className="bg-brume">
      <div className={`${wrap} ${pad}`}>
        <SectionHead eyebrow={valeurs.eyebrow} title={valeurs.title} wide />
        <dl className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valeurs.items.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.06}>
              <div className="flex h-full min-h-[280px] flex-col rounded-[12px] bg-white p-7">
                <span className="font-display text-sm font-semibold text-brique">0{i + 1}</span>
                <div className="flex-1" />
                <dt className="mt-10 font-display text-2xl font-semibold">{v.name}</dt>
                <dd className="mt-3 leading-relaxed text-secondary">{v.body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* 13. Premier pas */
export function PremierPas() {
  return (
    <section id="premier-pas" className="bg-white">
      <div className={`${wrap} ${pad}`}>
        <SectionHead eyebrow={premierPas.eyebrow} title={premierPas.title} lead={premierPas.lead} wide />
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {premierPas.options.map((o, i) => {
            const dark = i === 1;
            return (
              <Reveal key={o.title} delay={i * 0.08}>
                <div className={`flex h-full flex-col rounded-[16px] p-8 sm:p-12 ${dark ? "bg-teal text-white" : "bg-brume text-ink"}`}>
                  <p className={`font-display text-lg font-semibold ${dark ? "text-white/85" : "text-teal"}`}>{o.tag}</p>
                  <h3 className="mt-5 text-3xl sm:text-4xl">{o.title}</h3>
                  <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/85" : "text-secondary"}`}>{o.body}</p>
                  <div className="mt-10">
                    <Button
                      href={`mailto:${premierPas.email}?subject=${encodeURIComponent(`${o.tag} : ${o.title}`)}`}
                      variant={dark ? "light" : "primary"}
                    >
                      En parler avec nous
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 14. Clôture */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-teal-deep text-white">
      <div className={`${wrap} relative flex flex-col items-center py-24 text-center sm:py-32`}>
        <Lockup onDark size={72} />
        <p className="mt-10 text-lg text-white/85">
          <a href={`mailto:${premierPas.email}`} className="hover:text-white">
            {premierPas.email}
          </a>{" "}
          · <a href="https://klayer.ai" className="hover:text-white">klayer.ai</a>
        </p>
      </div>
      <div className={`${wrap} flex flex-col gap-2 border-t border-white/10 py-8 text-sm text-white/60 sm:flex-row sm:justify-between`}>
        <span>© 2026 Klayer</span>
        <span>Claude au travail, Claude dans le code.</span>
      </div>
    </footer>
  );
}
