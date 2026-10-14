import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://klayer.ai"),
  title: "Klayer · Votre partenaire pour réussir avec Claude",
  description:
    "Klayer est une boutique de conseil française, 100 % dédiée à l'écosystème Anthropic. De la stratégie à l'exécution, nous déployons des agents Claude sûrs et fiables.",
  openGraph: {
    title: "Klayer · Votre partenaire pour réussir avec Claude",
    description: "Transformer le travail grâce à l'IA. De la stratégie à l'exécution, avec l'écosystème Anthropic.",
    locale: "fr_FR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
