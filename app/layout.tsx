import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";
import VisitTracker from "@/components/VisitTracker";
import ChatAgent from "@/components/ChatAgent";
import CommandPalette from "@/components/CommandPalette";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-mono",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  title: `${site.name} — Student & Developer`,
  description: site.tagline,
  keywords: ["Kris Keshav", "Student", "Developer", "IIT Roorkee", "Portfolio", "DSA", "System Design"],
  authors: [{ name: site.name }],
  robots: { index: true, follow: true },
  openGraph: {
    title: `${site.name} — Student & Developer`,
    description: site.tagline,
    type: "website",
    locale: "en_US",
    siteName: `${site.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Student & Developer`,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plexMono.variable} ${plexSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Runs before paint: applies saved theme, and skips the boot screen on repeat visits / reduced motion */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light")d.setAttribute("data-mode","light")}catch(e){}try{if(sessionStorage.getItem("booted")||matchMedia("(prefers-reduced-motion: reduce)").matches)d.setAttribute("data-booted","")}catch(e){d.setAttribute("data-booted","")}})()`,
          }}
        />
        <noscript>
          <style>{`.boot-overlay{display:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans">
        <VisitTracker />
        {children}
        <ChatAgent />
        <CommandPalette />
      </body>
    </html>
  );
}
