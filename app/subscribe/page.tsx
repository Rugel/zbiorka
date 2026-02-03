import type { Metadata } from 'next';
import SubscribeForm from '../modules/SubscribeForm';
import Breadcrumbs from '../modules/Breadcrumbs';

export const metadata: Metadata = {
  title: "Harmonogram wywozu śmieci - powiadomienia e-mail - Łagów",
  description: "Ustaw darmowe powiadomienia e-mail o terminie wywozu odpadów komunalnych dla miejscowości lub ulicy. Harmonogram zbiórki odpadów komunalnych dla Łagów.",
  alternates: {
    canonical: "https://zbiorka.vercel.app/subscribe",
  },
  openGraph: {
    title: "Harmonogram wywozu śmieci - powiadomienia e-mail - Łagów",
    description: "Ustaw darmowe powiadomienia e-mail o terminie wywozu odpadów komunalnych dla miejscowości lub ulicy. Harmonogram zbiórki odpadów komunalnych dla Łagów.",
    url: "https://zbiorka.vercel.app/subscribe",
    images: ["https://zbiorka.vercel.app/web-app-manifest-512x512.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harmonogram wywozu śmieci - powiadomienia e-mail - Łagów",
    description: "Ustaw darmowe powiadomienia e-mail o terminie wywozu odpadów komunalnych dla miejscowości lub ulicy. Harmonogram zbiórki odpadów komunalnych dla Łagów.",
    images: ["https://zbiorka.vercel.app/web-app-manifest-512x512.png"],
  },
};

export default function Subscribe() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", item: "/" }, { name: "Subskrypcja", item: "/subscribe" }]} />
      <SubscribeForm />
    </>
  );
}
