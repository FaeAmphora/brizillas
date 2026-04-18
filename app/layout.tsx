import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brizillas — Génère ton itinéraire de voyage en 30 secondes",
  description: "Planifie ton voyage parfait gratuitement grâce à l'IA. Itinéraire jour par jour, hôtels, vols et activités inclus.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
