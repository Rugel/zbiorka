import './globals.css';
import Header from './modules/Heder';
import Navigation from './modules/Navigation';
import Footer from './modules/Footer';
import CookieConsent from './modules/CookieConsent';

export const metadata = {
  title: "Zbiórka odpadów komunalnych, powiadomień e-mail, harmonogram",
  description: "Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla Twojej miejscowości lub ulicy. Dodaj harmonogram zbiórki odpadów komunalnych.",
  keywords: "odpady komunalne, śmieci, harmonogram, powiadomienie e-mail"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
      <meta name="apple-mobile-web-app-title" content="Zbiórka" />
      </head>
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