import type { Metadata } from "next";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";
import "@fontsource/hanken-grotesk/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Klayer · Claude au travail, Claude dans le code",
  description:
    "Klayer déploie Claude au sein des fonctions métier et développe, avec Claude Code, les applications et services des DSI et des directions produit. Une boutique française 100 % dédiée à l'écosystème Anthropic.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
