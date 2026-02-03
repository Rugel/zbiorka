import type { Metadata } from "next";
import ScheduleForm from "../modules/ScheduleForm";
import Breadcrumbs from "../modules/Breadcrumbs";

export const metadata: Metadata = {
  title: "Dodaj harmonogram - TrashAlert",
  description: "Pomóż nam rozwijać bazę harmonogramów. Dodaj terminy odbioru odpadów dla swojej lokalizacji.",
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