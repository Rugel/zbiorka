import type { Metadata } from "next";
import ScheduleForm from "../modules/ScheduleForm";
import Breadcrumbs from "../modules/Breadcrumbs";

export const metadata: Metadata = {
  title: "Dodaj harmonogram",
  description: "Pomóż nam rozwijać bazę harmonogramów wywozu śmieci. Dodaj terminy odbioru odpadów komunalnych dla swojej miejscowości w gminie Łagów, Górno lub Cedzyna.",
  alternates: {
    canonical: "https://zbiorka.vercel.app/schedule",
  },
};

export default function SchedulePage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", item: "/" }, { name: "Dodaj harmonogram", item: "/schedule" }]} />
      <ScheduleForm />
    </>
  );
}