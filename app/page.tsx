import Main from './modules/Main';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Łagów Harmonogram Wywozu Śmieci 2026 | Powiadomienia TrashAlert",
  description: "Sprawdź aktualny harmonogram wywozu śmieci dla gminy Łagów. Zamów darmowe powiadomienia e-mail o terminach odbioru odpadów z aplikacją TrashAlert.",
  keywords: ["zbiórka śmieci", "powiadomienia e-mail", "Łagów", "Górno", "Cedzyna", "harmonogram odpadów", "subskrypcja", "śmieci 2026", "zbiórka komunalna", "odpady", "ekologia"],
  openGraph: {
    title: "Łagów Harmonogram Wywozu Śmieci 2026 | Powiadomienia TrashAlert",
    description: "Sprawdź aktualny harmonogram wywozu śmieci dla gminy Łagów. Zamów darmowe powiadomienia e-mail o terminach odbioru odpadów z aplikacją TrashAlert.",
    url: "https://zbiorka.vercel.app/",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://zbiorka.vercel.app/#website",
        "url": "https://zbiorka.vercel.app/",
        "name": "TrashAlert - Harmonogram Wywozu Śmieci",
        "description": "Darmowe powiadomienia e-mail o terminach odbioru odpadów komunalnych w gminie Łagów, Górno i Cedzyna.",
        "publisher": { "@id": "https://zbiorka.vercel.app/#organization" },
        "inLanguage": "pl-PL"
      },
      {
        "@type": "Organization",
        "@id": "https://zbiorka.vercel.app/#organization",
        "name": "TrashAlert",
        "url": "https://zbiorka.vercel.app/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zbiorka.vercel.app/web-app-manifest-512x512.png",
          "width": 512,
          "height": 512
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "kontakt@trashalert.pl",
          "url": "https://zbiorka.vercel.app/contact"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Jak działa aplikacja TrashAlert?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "TrashAlert wysyła automatyczne powiadomienia e-mail o terminach odbioru odpadów komunalnych (zmieszane, plastik, szkło, bio). Wystarczy podać adres e-mail i wybrać swoją miejscowość w gminie Łagów, Górno lub Cedzyna."
            }
          },
          {
            "@type": "Question",
            "name": "Czy powiadomienia o wywozie śmieci są płatne?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Nie, usługa TrashAlert jest całkowicie darmowa dla wszystkich mieszkańców obsługiwanych gmin."
            }
          },
          {
            "@type": "Question",
            "name": "Jakie miejscowości obsługuje TrashAlert?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Obecnie obsługujemy gminę Łagów, Górno oraz Cedzynę (powiat kielecki). Stale rozwijamy bazę harmonogramów o nowe lokalizacje."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Main />
    </>
  );
}