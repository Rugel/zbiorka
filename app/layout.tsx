import './globals.css';
import Header from './modules/Header';
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
        <title>Zbiórka odpadów komunalnych - Powiadomienia e-mail, Harmonogram 2025</title>
        <meta name="description" content="Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla swojej miejscowości lub ulicy. Harmonogram odpadów komunalnych na 2025 rok - subskrypcja online." />
        <meta name="keywords" content="zbiórka śmieci, powiadomienia e-mail, harmonogram odpadów, subskrypcja, śmieci 2025, zbiórka komunalna, odpady, ekologia" />
        <meta name="author" content="autor TrashAlert" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="content-language" content="pl" />
        <meta name="revisit-after" content="7 days" />
        <meta name="date" content="2025-09-29T20:40+02:00" />
        <meta property="og:title" content="Zbiórka odpadów komunalnych - Powiadomienia e-mail, Harmonogram 2025" />
        <meta property="og:description" content="Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla swojej miejscowości lub ulicy. Harmonogram odpadów komunalnych na 2025 rok - subskrypcja online." />
        <meta property="og:url" content="https://zbiorka.vercel.app/" />
        <meta property="og:image" content="https://zbiorka.vercel.app/web-app-manifest-512x512.png" />
        <meta property="og:image:alt" content="Logo aplikacji Zbiorka - powiadomienia o zbiórce śmieci" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="TrashAlert" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zbiórka odpadów - Powiadomienia e-mail, Harmonogram 2025" />
        <meta name="twitter:description" content="Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla swojej miejscowości lub ulicy. Sprawdź harmonogram na 2025 rok." />
        <meta name="twitter:image" content="https://zbiorka.vercel.app/web-app-manifest-512x512.png" />
        <meta name="twitter:image:alt" content="Logo Zbiorka - aplikacja do powiadomień o śmieciach" />
        <meta name="twitter:site" content="@ZbiorkaApp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TrashAlert",
              "url": "https://zbiorka.vercel.app/",
              "description": "Platforma do ustawiania darmowych powiadomień e-mail o zbiórce śmieci wg harmonogramu na 2025 rok.",
              "publisher": {
                "@type": "Organization",
                "name": "TrashAlert",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://zbiorka.vercel.app/web-app-manifest-512x512.png"
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://zbiorka.vercel.app/subscribe?location={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <meta name="apple-mobile-web-app-title" content="TrashAlert" />
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