import type { Metadata } from 'next';
import './globals.css';
import Header from './modules/Heder';
import Navigation from './modules/Navigation';
import Footer from './modules/Footer';
import CookieConsent from './modules/CookieConsent';

export const metadata: Metadata = {
  metadataBase: new URL("https://zbiorka.vercel.app"),
  title: {
    default: "Harmonogram wywozu śmieci - powiadomienia e-mail - Łagów",
    template: "%s | TrashAlert"
  },
  description: "Ustaw darmowe powiadomienia e-mail o terminie wywozu odpadów komunalnych dla swojej miejscowości lub ulicy. Harmonogram zbiórki odpadów komunalnych dla Łagów, Górno, Cedzyna.",
  keywords: ["odpady komunalne", "śmieci", "harmonogram", "powiadomienie e-mail", "Łagów", " TrashAlert"],
  authors: [{ name: "Zespół TrashAlert" }],
  creator: "TrashAlert",
  publisher: "TrashAlert",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://zbiorka.vercel.app",
    siteName: "TrashAlert",
    title: "Harmonogram wywozu śmieci - Łagów",
    description: "Darmowe powiadomienia e-mail o wywozie śmieci.",
    images: [
      {
        url: "/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "Logo TrashAlert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmonogram wywozu śmieci - Łagów",
    description: "Darmowe powiadomienia e-mail o wywozie śmieci.",
    images: ["/web-app-manifest-512x512.png"],
    creator: "@ZbiorkaApp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/web-app-manifest-192x192.png",
  },
  appleWebApp: {
    title: "TrashAlert",
    statusBarStyle: "default",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <Navigation />
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}