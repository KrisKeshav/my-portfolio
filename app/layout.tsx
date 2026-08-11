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
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
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
        {/* Prevents flash of wrong theme by reading localStorage before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.setAttribute("data-mode","light")}catch(e){}})()`,
          }}
        />
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
