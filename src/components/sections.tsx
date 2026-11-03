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
import { useState } from "react";
import { ParticleGlyph } from "./particle-glyph";
import { Button, Reveal, Screen, SectionHead, Tag } from "./ui";

const wrap = "mx-auto max-w-[1280px] px-4 sm:px-8";
const pad = "py-24 sm:py-40";

/* 1. Couverture */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-teal pt-[72px] text-white">
      <div className={`${wrap} relative grid items-center gap-6 py-16 sm:py-24 lg:grid-cols-[1.35fr_1fr] lg:gap-0 lg:py-20`}>
        <div>
          <Reveal>
            <h1 className="text-[1.875rem] leading-[1.08] sm:text-[3.5rem] lg:text-[4.5rem] xl:whitespace-nowrap">
              {hero.title[0]}
              <br />
              {hero.title[1]}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white">{hero.lead}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primary.href} variant="light">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="outline-light">
              {hero.secondary.label}
            </Button>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-12 text-base text-white/80">
              {hero.eyebrow}. {hero.facts.join(". ")}.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <ParticleGlyph onDark className="block h-[260px] w-full sm:h-[460px] lg:h-[620px]" />
        </Reveal>
      </div>
    </section>
  );
}

/* 2. Le constat : moitié blanche, moitié teal */
export function Probleme() {
  return (
    <section className="grid lg:grid-cols-2" aria-label="Le constat">
      {probleme.items.map((item, i) => {
        const dark = i === 1;
        return (
          <div key={item.tag} className={dark ? "bg-teal text-white" : "bg-white text-ink"}>
            <div className={`flex h-full max-w-[640px] flex-col justify-center px-4 py-24 sm:px-8 sm:py-32 lg:px-16 ${i === 0 ? "lg:ml-auto" : ""}`}>
              <Reveal delay={i * 0.1}>
                <h2 className={`text-[1.75rem] leading-[1.1] sm:text-5xl ${dark ? "text-white" : "text-ink"}`}>{item.title}</h2>
              </Reveal>
              <Reveal delay={0.08 + i * 0.1}>
                <p className="mt-8 text-lg leading-relaxed">{item.body}</p>
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
      <div className={`${wrap} ${pad} grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-16`}>
        <div>
          <SectionHead title={bascules.title} lead={bascules.footer} />
        </div>
        <ol className="space-y-3">
          {bascules.rows.map((r, i) => (
            <Reveal key={r.hier} delay={i * 0.08}>
              <li className="grid gap-px overflow-hidden rounded-[12px] sm:grid-cols-2">
                <p className="bg-white px-6 py-6 text-lg text-ink">
                  <span className="sr-only">Hier : </span>
                  {r.hier}
                </p>
                <p className="bg-teal px-6 py-6 font-display text-2xl font-semibold text-white">
                  <span className="sr-only">Demain : </span>
                  {r.demain}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* 4. Deux piliers */
export function Piliers() {
  return (
    <section id="piliers" className="bg-white">
      <div className={`${wrap} ${pad}`}>
        <SectionHead title={piliers.title} lead={piliers.lead} />
        <div className="mt-16 grid gap-4 lg:grid-cols-2">
          {piliers.items.map((p, i) => {
            const dark = i === 0;
            return (
              <Reveal key={p.tag} delay={i * 0.08}>
                <a
                  href={p.href}
                  className={`group flex h-full min-h-[360px] flex-col rounded-[16px] p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-12 ${
                    dark ? "bg-teal text-white" : "bg-brume text-ink"
                  }`}
                >
                  <h3 className="text-[1.75rem] leading-[1.12] sm:text-5xl">{p.title}</h3>
                  <div className="flex-1" />
                  <div className="mt-12 flex items-end justify-between gap-4">
                    <p className="text-lg">
                      <span className="font-semibold">{p.tag}.</span> {p.audience}
                    </p>
                    <span className="text-2xl transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
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
    <section id="ai-work" className="bg-brume">
      <div className={`${wrap} ${pad} grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div>
          <SectionHead title="AI for Work : Claude dans vos fonctions" lead={aiWork.lead} />
          <Reveal delay={0.16}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {aiWork.points.map((p) => (
                <li key={p}>
                  <Tag tone="white">{p}</Tag>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg text-ink">{aiWork.footer}</p>
          </Reveal>
        </div>
        <figure>
          <div className="relative aspect-[16/11]">
            <Reveal className="absolute right-0 top-0 w-[78%]">
              <Screen {...sheets} />
            </Reveal>
            <Reveal className="absolute left-0 top-[22%] w-[48%]" delay={0.1}>
              <Screen {...finder} />
            </Reveal>
            <Reveal className="absolute bottom-0 right-[4%] w-[76%]" delay={0.2}>
              <Screen {...cowork} />
            </Reveal>
          </div>
          <figcaption className="mt-4 text-right text-base text-secondary">{aiWork.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* 6. AI for Code : terminal et Klayer BO */
export function AiCode() {
  const [bo, terminal] = aiCode.screens;
  return (
    <section id="ai-code" className="bg-teal text-white">
      <div className={`${wrap} ${pad} grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div>
          <SectionHead title="AI for Code : le logiciel autrement" lead={aiCode.lead} onDark />
          <dl className="mt-10 grid gap-px overflow-hidden rounded-[12px]">
            {aiCode.steps.map((s, i) => (
              <Reveal key={s.name} delay={0.1 + i * 0.07}>
                <div className="bg-teal-surface p-5">
                  <dt className="font-display text-lg font-semibold">{s.name}</dt>
                  <dd className="mt-1 text-base leading-relaxed text-white">{s.body}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <Reveal className="mt-10" delay={0.3}>
            <Button href={aiCode.cta.href} variant="light">
              {aiCode.cta.label}
            </Button>
          </Reveal>
        </div>
        <figure>
          <div className="relative aspect-[16/12]">
            <Reveal className="absolute right-0 top-0 w-[84%]">
              <Screen {...bo} onDark />
            </Reveal>
            <Reveal className="absolute bottom-0 left-0 w-[76%]" delay={0.15}>
              <Screen {...terminal} onDark />
            </Reveal>
          </div>
          <figcaption className="mt-4 text-right text-base text-white/80">{aiCode.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* 7. Méthode : une marche qui monte, l'ordre se lit à la hauteur */
export function Methode() {
  return (
    <section id="methode" className="bg-white">
      <div className={`${wrap} ${pad}`}>
        <SectionHead title={methode.title} lead={methode.lead} />
        <ol className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
          {methode.steps.map((s, i) => {
            const last = i === methode.steps.length - 1;
            return (
              <Reveal key={s.name} delay={i * 0.07}>
                <li
                  className={`flex flex-col justify-end rounded-[12px] p-6 lg:min-h-[var(--h)] ${last ? "bg-teal text-white" : "bg-brume text-ink"}`}
                  style={{ ["--h" as string]: `${220 + i * 64}px` }}
                >
                  <h3 className="text-2xl">{s.name}</h3>
                  <p className="mt-3 text-lg font-semibold leading-snug">{s.result}</p>
                  <p className="mt-2 text-base">{s.detail}</p>
                </li>
              </Reveal>
            );
          })}
        </ol>
        <Reveal>
          <p className="mt-10 text-base text-ink">{methode.engagements}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* 8. Accélérateurs : trois fragments d'interface */
export function Accelerateurs() {
  const [ws, ao, code] = accelerateurs.items;
  return (
    <section className="bg-brume">
      <div className={`${wrap} ${pad}`}>
        <SectionHead title={accelerateurs.title} lead={accelerateurs.lead} />
        <div className="mt-16 grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
          <Reveal>
            <article className="flex h-full flex-col rounded-[16px] bg-teal p-8 text-white">
              <div data-ui className="grid grid-cols-2 gap-2">
                {accelerateurs.memoire.map((m) => (
                  <p key={m} className="rounded-[8px] bg-teal-surface px-4 py-6 text-base font-semibold">
                    {m}
                  </p>
                ))}
              </div>
              <h3 className="mt-10 text-2xl">{ws.title}</h3>
              <p className="mt-2 text-lg">{ws.body}</p>
            </article>
          </Reveal>
          <Reveal delay={0.08}>
            <article className="flex h-full flex-col rounded-[16px] bg-white p-8">
              <div data-ui className="flex flex-col gap-2">
                <p className="text-base font-semibold text-teal"># support-claude</p>
                <p className="w-[90%] rounded-[8px] bg-brume px-4 py-3 text-base leading-snug">Comment relancer la Skill de veille ?</p>
                <p className="ml-auto w-[90%] rounded-[8px] bg-teal px-4 py-3 text-base leading-snug text-white">
                  Claude : voici la marche à suivre, ticket ouvert.
                </p>
              </div>
              <div className="flex-1" />
              <h3 className="mt-10 text-2xl">{ao.title}</h3>
              <p className="mt-2 text-lg">{ao.body}</p>
            </article>
          </Reveal>
          <Reveal delay={0.16}>
            <article className="flex h-full flex-col rounded-[16px] bg-white p-8">
              <ol data-ui className="flex flex-wrap gap-2">
                {accelerateurs.boucle.map((b) => (
                  <li key={b} className="rounded-[8px] bg-brume px-3 py-2 text-base font-semibold text-teal">
                    {b}
                  </li>
                ))}
              </ol>
              <div className="flex-1" />
              <h3 className="mt-10 text-2xl">{code.title}</h3>
              <p className="mt-2 text-lg">{code.body}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 9. IA native : Claude au centre, nos outils autour */
function Orbit() {
  const items = [{ name: "Klayer BO", icon: "/glyph-white.svg", bo: true }, ...iaNative.outils.map((o) => ({ ...o, bo: false }))];
  const n = items.length;
  return (
    <>
    <div className="sm:hidden">
      <div className="flex h-24 w-24 items-center justify-center rounded-[16px] bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/outils/claude.svg" alt="Claude" className="h-12 w-12" />
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((o) => (
          <li key={o.name} className={`flex items-center gap-2 rounded-[8px] px-3 py-2 text-base font-semibold ${o.bo ? "bg-white text-teal" : "bg-teal-surface text-white"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={o.bo ? "/glyph-teal.svg" : o.icon} alt="" className="h-5 w-auto" />
            {o.name}
          </li>
        ))}
      </ul>
    </div>
    <div className="relative mx-auto hidden aspect-square w-full max-w-[560px] sm:block">
      <div className="absolute inset-[14%] rounded-full bg-teal-surface/40" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[16px] bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/outils/claude.svg" alt="Claude" className="h-1/2 w-1/2" />
      </div>
      <ul>
        {items.map((o, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          return (
            <li
              key={o.name}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + Math.cos(a) * 40}%`, top: `${50 + Math.sin(a) * 40}%` }}
            >
              <Reveal delay={0.1 + i * 0.06}>
                <span
                  className={`flex items-center gap-2 whitespace-nowrap rounded-[8px] px-3 py-2 text-base font-semibold ${
                    o.bo ? "bg-white text-teal" : "bg-teal-surface text-white"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.bo ? "/glyph-teal.svg" : o.icon} alt="" className="h-5 w-auto" />
                  {o.name}
                </span>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </div>
    </>
  );
}

export function IaNative() {
  return (
    <section id="ia-native" className="bg-teal text-white">
      <div className={`${wrap} ${pad} grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]`}>
        <div>
          <SectionHead title={iaNative.title} lead={`${iaNative.lead} ${iaNative.strong}`} onDark />
          <Reveal className="mt-12 rounded-[12px] bg-teal-surface p-8" delay={0.16}>
            <p className="flex items-baseline gap-3 font-display font-semibold">
              <span className="text-[4.5rem] leading-none tabular-nums">{iaNative.kpi.value}</span>
              <span className="text-2xl">{iaNative.kpi.unit}</span>
            </p>
            <p className="mt-4 text-base leading-relaxed text-white">{iaNative.kpi.caption}</p>
          </Reveal>
        </div>
        <Orbit />
      </div>
    </section>
  );
}

/* 10. Déjà livré : une liste par pilier */
export function Realisations() {
  const work = realisations.items.filter((r) => r.tag === "AI for Work");
  const code = realisations.items.filter((r) => r.tag === "AI for Code");
  return (
    <section id="realisations" className="bg-white">
      <div className={`${wrap} ${pad}`}>
        <SectionHead title={realisations.title} lead={realisations.lead} />
        <div className="mt-16 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div className="h-full rounded-[16px] bg-brume p-8 sm:p-10">
              <h3 className="text-2xl">AI for Work, cinq réalisations</h3>
              <ul className="mt-8 grid gap-2">
                {work.map((r) => (
                  <li key={r.title} className="grid gap-1 rounded-[8px] bg-white px-5 py-4 sm:grid-cols-[1fr_1.2fr] sm:items-baseline sm:gap-6">
                    <span className="font-display text-lg font-semibold">{r.title}</span>
                    <span className="text-base">{r.body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-[16px] bg-teal p-8 text-white sm:p-10">
              <h3 className="text-2xl">AI for Code, une réalisation</h3>
              <div className="flex-1" />
              {code.map((r) => (
                <div key={r.title} className="mt-10">
                  <p className="font-display text-[2rem] font-semibold leading-tight">{r.title}</p>
                  <p className="mt-3 text-lg">{r.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-8 text-base text-secondary">{realisations.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* 11. Pourquoi Klayer : quatre affirmations, sans cartes */
export function Boutique() {
  return (
    <section id="pourquoi" className="bg-teal text-white">
      <div className={`${wrap} ${pad}`}>
        <SectionHead title={boutique.title} onDark />
        <dl className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
          {boutique.items.map((b, i) => (
            <Reveal key={b.title} delay={(i % 2) * 0.08}>
              <div className="border-l-4 border-white pl-6">
                <dt className="font-display text-2xl font-semibold">{b.title}</dt>
                <dd className="mt-3 text-lg leading-relaxed text-white">{b.body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* 12. Valeurs : quatre lignes, le nom en grand */
export function Valeurs() {
  return (
    <section className="bg-brume">
      <div className={`${wrap} ${pad}`}>
        <SectionHead title={valeurs.title} lead={valeurs.lead} />
        <dl className="mt-16 grid gap-2">
          {valeurs.items.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.06}>
              <div className="grid gap-2 rounded-[12px] bg-white px-6 py-7 md:grid-cols-[1fr_1.4fr] md:items-baseline md:gap-10 md:px-10">
                <dt className="font-display text-[1.75rem] font-semibold leading-tight sm:text-[2rem]">{v.name}</dt>
                <dd className="text-lg leading-relaxed">{v.body}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* 13. Premier pas : le module interactif */
export function PremierPas() {
  const [pid, setPid] = useState(premierPas.piliers[0].id);
  const pilier = premierPas.piliers.find((p) => p.id === pid) ?? premierPas.piliers[0];
  const [choix, setChoix] = useState<Record<string, string>>({});
  const c = choix[pilier.id] ?? pilier.choix[0];
  const titre = pilier.titre(c);
  const subject = `${pilier.tag} : ${titre}`;
  const body = `Bonjour,\n\nNous aimerions étudier un premier pas ${pilier.tag} avec Klayer : ${c}.\n\nContexte :\n\n`;
  const mailto = `mailto:${premierPas.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <section id="premier-pas" className="bg-white">
      <div className={`${wrap} ${pad} grid gap-14 lg:grid-cols-[1fr_1.15fr]`}>
        <div>
          <SectionHead title={premierPas.title} lead={premierPas.lead} />
          <Reveal delay={0.12}>
            <fieldset className="mt-10">
              <legend className="text-lg font-semibold">Votre pilier</legend>
              <div className="mt-3 inline-grid grid-cols-2 gap-1 rounded-[8px] bg-brume p-1">
                {premierPas.piliers.map((p) => (
                  <label
                    key={p.id}
                    className={`cursor-pointer rounded-[6px] px-5 py-3 text-base font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-teal ${
                      pid === p.id ? "bg-teal text-white" : "text-teal hover:bg-white"
                    }`}
                  >
                    <input type="radio" name="pilier" value={p.id} checked={pid === p.id} onChange={() => setPid(p.id)} className="sr-only" />
                    {p.tag}
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="mt-8">
              <legend className="text-lg font-semibold">{pilier.question}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {pilier.choix.map((x) => (
                  <label
                    key={x}
                    className={`cursor-pointer rounded-[8px] px-4 py-3 text-base font-semibold transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-teal ${
                      c === x ? "bg-teal text-white" : "bg-brume text-teal hover:bg-filet"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`choix-${pilier.id}`}
                      value={x}
                      checked={c === x}
                      onChange={() => setChoix((s) => ({ ...s, [pilier.id]: x }))}
                      className="sr-only"
                    />
                    {x}
                  </label>
                ))}
              </div>
            </fieldset>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div className="flex h-full min-h-[420px] flex-col rounded-[16px] bg-teal p-8 text-white sm:p-12" aria-live="polite">
            <h3 className="text-[1.75rem] leading-[1.1] sm:text-5xl">{titre}</h3>
            <p className="mt-6 text-lg leading-relaxed">{pilier.entree}</p>
            <p className="mt-4 text-base text-white/80">{pilier.tag}. {pilier.engagement}</p>
            <div className="flex-1" />
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button href={mailto} variant="light">
                En parler avec nous
              </Button>
              <a href={`mailto:${premierPas.email}`} className="text-base font-semibold underline-offset-4 hover:underline">
                {premierPas.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 14. Clôture : le nom revient en pleine largeur */
export function Footer() {
  return (
    <footer className="overflow-hidden bg-teal-deep text-white">
      <div className={`${wrap} pt-24 sm:pt-32`}>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md font-display text-2xl font-semibold leading-snug">Claude au travail, Claude dans le code.</p>
          <p className="text-lg">
            <a href={`mailto:${premierPas.email}`} className="hover:underline">
              {premierPas.email}
            </a>
            {" · "}
            <a href="https://klayer.ai" className="hover:underline">
              klayer.ai
            </a>
          </p>
        </div>
        <div className="mt-16 flex items-end gap-[3vw] pb-10" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/glyph-white.svg" alt="" style={{ height: "clamp(3.5rem, 14vw, 13rem)" }} />
          <span className="font-display font-semibold leading-[0.78]" style={{ fontSize: "clamp(5rem, 21vw, 19rem)", letterSpacing: "-0.04em" }}>
            Klayer
          </span>
        </div>
        <p className="pb-8 text-base text-white/70">© 2026 Klayer · Boutique française dédiée à l&apos;écosystème Anthropic</p>
      </div>
    </footer>
  );
}

