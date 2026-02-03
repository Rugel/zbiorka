import type { Metadata } from "next";
import ContactForm from "../modules/ContactForm";
import Breadcrumbs from "../modules/Breadcrumbs";

export const metadata: Metadata = {
    title: "Kontakt - TrashAlert",
    description: "Skontaktuj się z zespołem TrashAlert. Masz pytania, sugestie lub potrzebujesz pomocy? Jesteśmy do Twojej dyspozycji.",
    alternates: {
        canonical: "https://zbiorka.vercel.app/contact",
    },
};

export default function ContactPage() {
    return (
        <>
            <Breadcrumbs items={[{ name: "Home", item: "/" }, { name: "Kontakt", item: "/contact" }]} />
            <ContactForm />
        </>
    );
}
