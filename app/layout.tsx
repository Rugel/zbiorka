import type { Metadata } from 'next';
import './globals.css';
import Header from './modules/Heder';
import Navigation from './modules/Navigation';
import Footer from './modules/Footer';
import CookieConsent from './modules/CookieConsent';

export const metadata: Metadata = {
  title: "Harmonogram wywozu śmieci - powiadomienia e-mail - Łagów",
  description: "Ustaw darmowe powiadomienia e-mail o terminie wywozu odpadów komunalnych dla swojej miejscowości lub ulicy. Harmonogram zbiórki odpadów komunalnych dla Łagów, Górno, Cedzyna.",
  keywords: "odpady komunalne, śmieci, harmonogram, powiadomienie e-mail",
  appleWebApp: {
    title: "Zbiórka",
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