import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { Topbar } from "@/components/shared/topbar";
import { Audiences } from "@/components/home/audiences";
import { Cta } from "@/components/home/cta";
import { CustomerZero } from "@/components/home/customer-zero";
import { Engagements } from "@/components/home/engagements";
import { Hero } from "@/components/home/hero";
import { Offers } from "@/components/home/offers";
import { TocSections } from "@/components/home/toc-sections";

export default function Home() {
  return (
    <>
      <Topbar />
      <Header />
      <main>
        <Hero />
        <Offers />
        <CustomerZero />
        <Audiences />
        <TocSections />
        <Engagements />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
