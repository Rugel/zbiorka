import Main from './modules/Main';
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Harmonogram wywozu śmieci - powiadomienia e-mail - Łagów",
  description: "Łagów, Górno, Cedzyna - ustaw darmowe powiadomienia e-mail o terminie wywozu odpadów komunalnych dla swojej miejscowości lub ulicy.",
  keywords: "zbiórka śmieci, powiadomienia e-mail, Łagów, Górno, Cedzyna, harmonogram odpadów, subskrypcja, śmieci 2025, zbiórka komunalna, odpady, ekologia",
  authors: [{ name: "Zespół Zbiorka" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Harmonogram wywozu śmieci - powiadomienia e-mail - Łagów",
    description: "Łagów, Górno, Cedzyna - ustaw darmowe powiadomienia e-mail o terminie wywozu odpadów komunalnych dla swojej miejscowości lub ulicy.",
    url: "https://zbiorka.vercel.app/",
    siteName: "Zbiorka",
    images: [
      {
        url: "https://zbiorka.vercel.app/web-app-manifest-512x512.png",
        alt: "Logo aplikacji Zbiorka - powiadomienia o zbiórce śmieci",
      },
    ],
    type: "website",
    locale: "pl_PL",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmonogram wywozu śmieci - powiadomienia e-mail - Łagów",
    description: "Łagów, Górno, Cedzyna - ustaw darmowe powiadomienia e-mail o terminie wywozu odpadów komunalnych dla swojej miejscowości lub ulicy.",
    images: {
      url: "https://zbiorka.vercel.app/web-app-manifest-512x512.png",
      alt: "Logo Zbiorka - aplikacja do powiadomień o śmieciach",
    },
    site: "@ZbiorkaApp",
  },
  alternates: {
    canonical: "https://zbiorka.vercel.app/",
  },
  other: {
    "revisit-after": "7 days",
    "date": "2025-09-28T17:53+02:00",
  }
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zbiorka",
    "url": "https://zbiorka.vercel.app/",
    "description": "Łagów, Górno, Cedzyna - ustaw darmowe powiadomienia e-mail o terminie wywozu odpadów komunalnych dla swojej miejscowości lub ulicy.",
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