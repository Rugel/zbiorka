'use client';

import Head from 'next/head';
import Main from './modules/Main';

export default function Home() {
  return (
    <>
      <Head>
        {/* Podstawowe metadane */}
        <title>Zbiórka odpadów komunalnych - Powiadomienia e-mail, Harmonogram 2025</title>
        <meta name="description" content="Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla swojej miejscowości lub ulicy. Harmonogram zbiórki odpadów komunalnych na 2025 rok, zarządzaj subskrypcjami online." />
        <meta name="keywords" content="zbiórka śmieci, powiadomienia e-mail, harmonogram odpadów, subskrypcja, śmieci 2025, zbiórka komunalna, odpady, ekologia" />
        <meta name="author" content="Zespół Zbiorka" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="content-language" content="pl" />
        <meta name="revisit-after" content="7 days" />
        <meta name="date" content="2025-09-28T17:53+02:00" /> {/* Aktualna data i czas CEST */}

        {/* Open Graph (Facebook, LinkedIn itp.) */}
        <meta property="og:title" content="Zbiórka odpadów komunalnych - Powiadomienia e-mail, Harmonogram 2025" />
        <meta property="og:description" content="Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla swojej miejscowości lub ulicy. Harmonogram zbiórki odpadów komunalnych na 2025 rok." />
        <meta property="og:url" content="https://zbiorka.vercel.app/" />
        <meta property="og:image" content="https://zbiorka.vercel.app/web-app-manifest-512x512.png" />
        <meta property="og:image:alt" content="Logo aplikacji Zbiorka - powiadomienia o zbiórce śmieci" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Zbiorka" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Zbiórka odpadów - Powiadomienia e-mail, Harmonogram 2025" />
        <meta name="twitter:description" content="Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla swojej miejscowości lub ulicy. Harmonogram na 2025 rok." />
        <meta name="twitter:image" content="https://zbiorka.vercel.app/web-app-manifest-512x512.png" />
        <meta name="twitter:image:alt" content="Logo Zbiorka - aplikacja do powiadomień o śmieciach" />
        <meta name="twitter:site" content="@ZbiorkaApp" /> {/* Jeśli masz konto Twitter, dostosuj */}

        {/* Strukturalne dane JSON-LD (dla Google) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Zbiorka",
              "url": "https://zbiorka.vercel.app/",
              "description": "Platforma do ustawiania darmowych powiadomień e-mail o zbiórce śmieci według harmonogramu odpadów komunalnych na 2025 rok.",
              "publisher": {
                "@type": "Organization",
                "name": "Zbiorka",
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
      </Head>
      <Main />
    </>
  );
}