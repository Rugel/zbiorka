import type { Metadata } from "next";
import ContactForm from "../modules/ContactForm";
import Breadcrumbs from "../modules/Breadcrumbs";

export const metadata: Metadata = {
    title: "Kontakt",
    description: "Skontaktuj się z zespołem TrashAlert. Masz pytania dotyczące harmonogramu wywozu śmieci w gminie Łagów, Górno lub Cedzyna? Jesteśmy do Twojej dyspozycji.",
    alternates: {
        canonical: "/contact",
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
