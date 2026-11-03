import { Nav } from "@/components/nav";
import {
  Accelerateurs,
  Conviction,
  CustomerZero,
  Footer,
  Hero,
  Methode,
  Piliers,
  Pourquoi,
  PremierPas,
  Probleme,
  Realisations,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Probleme />
        <Conviction />
        <Piliers />
        <Methode />
        <Accelerateurs />
        <CustomerZero />
        <Realisations />
        <Pourquoi />
        <PremierPas />
      </main>
      <Footer />
    </>
  );
}
