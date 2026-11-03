import { Nav } from "@/components/nav";
import {
  Accelerateurs,
  AiCode,
  AiWork,
  Bascules,
  Boutique,
  Footer,
  Hero,
  IaNative,
  Methode,
  Piliers,
  PremierPas,
  Probleme,
  Realisations,
  Valeurs,
} from "@/components/sections";

// L'ordre suit le deck « Klayer · Présentation 2026 · V2 », slide par slide.
export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Probleme />
        <Bascules />
        <Piliers />
        <AiWork />
        <AiCode />
        <Methode />
        <Accelerateurs />
        <IaNative />
        <Realisations />
        <Boutique />
        <Valeurs />
        <PremierPas />
      </main>
      <Footer />
    </>
  );
}
