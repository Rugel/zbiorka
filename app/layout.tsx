import './globals.css';
import Header from './modules/Heder';
import Navigation from './modules/Navigation';
import Footer from './modules/Footer';
import CookieConsent from './modules/CookieConsent';

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