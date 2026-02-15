import type { Metadata } from 'next';
import SubscribeForm from '../modules/SubscribeForm';
import Breadcrumbs from '../modules/Breadcrumbs';

export const metadata: Metadata = {
  title: "Subskrypcja",
  description: "Zapisz się na darmowe powiadomienia o wywozie śmieci. Nie przegap terminów odbioru odpadów komunalnych.",
  alternates: {
    canonical: "/subscribe",
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
