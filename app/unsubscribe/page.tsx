import type { Metadata } from "next";
import UnsubscribeForm from "../modules/UnsubscribeForm";
import Breadcrumbs from "../modules/Breadcrumbs";

export const metadata: Metadata = {
  title: "Anulowanie subskrypcji - TrashAlert",
  description: "Zrezygnuj z powiadomień e-mail o odbiorze odpadów. Możesz to zrobić w dowolnym momencie.",
  alternates: {
    canonical: "https://zbiorka.vercel.app/unsubscribe",
  },
};

export default function UnsubscribePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", item: "/" }, { name: "Anulowanie subskrypcji", item: "/unsubscribe" }]} />
      <UnsubscribeForm />
    </>
  );
}
