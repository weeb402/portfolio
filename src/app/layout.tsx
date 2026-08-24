import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import GunCursor from "@/components/GunCursor";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "VAIBHAV GOYAL [007-DEV] — Classified Dossier",
  description:
    "MI6-grade dossier of Vaibhav Goyal: Full-Stack Systems Architect & Distributed Systems Engineer. 16 live production deployments, 258+ verified passing tests, 0 critical vulnerabilities.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${cormorant.variable} ${plexMono.variable}`}>
        {children}
        <GunCursor />
      </body>
    </html>
  );
}
