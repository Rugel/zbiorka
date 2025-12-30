import type { Metadata } from 'next';
import SubscribeForm from '../modules/SubscribeForm';

export const metadata: Metadata = {
  title: "Zbiórka odpadów - ustawienie powiadomień e-mail - harmonogram",
  description: "Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla Twojej miejscowości lub ulicy. Dodaj harmonogram zbiórki odpadów komunalnych.",
  openGraph: {
    title: "Zbiórka odpadów komunalnych - ustawienie powiadomień e-mail - harmonogram",
    description: "Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla Twojej miejscowości lub ulicy. Dodaj harmonogram zbiórki odpadów komunalnych.",
    url: "https://zbiorka.vercel.app/",
    images: ["https://zbiorka.vercel.app/web-app-manifest-512x512.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zbiórka odpadów - ustawienie powiadomień e-mail - harmonogram",
    description: "Ustaw darmowe powiadomienia e-mail o zbiórce śmieci dla Twojej miejscowości lub ulicy. Dodaj harmonogram zbiórki odpadów komunalnych.",
    images: ["https://zbiorka.vercel.app/web-app-manifest-512x512.png"],
  },
};

export default function Subscribe() {
  return <SubscribeForm />;
}
