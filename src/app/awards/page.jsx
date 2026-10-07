import Heroawards from "@/components/awards/heroawards/heroawards";
import AwardsAndSelection from "@/components/awards/awards-and-selection/awards-and-selection";
import LabsAndResidencies from "@/components/awards/labs-and-residencies/labs-and-residencies";
import IndustryAffiliations from "@/components/awards/industry-affiliations/industry-affiliations";
import Education from "@/components/awards/education/education";

// Awards page (/awards): ye export apni Awards page file ke top par paste karo
export const metadata = {
  title: "Awards and Labs",
  description:
    "Festivals, labs and programs behind Honeyverse: HEER's Best Short win at the London South Asian Film Festival and Cine Qua Non Storylines Lab.",
  alternates: { canonical: "/awards" },
  openGraph: {
    type: "website",
    siteName: "Honeyverse Productions",
    title: "Awards and Labs \u00b7 Honeyverse Productions",
    description:
      "Festivals, labs and programs behind Honeyverse: HEER's Best Short win at the London South Asian Film Festival and Cine Qua Non Storylines Lab.",
    url: "/awards",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Awards and Labs \u00b7 Honeyverse Productions",
    description:
      "Festivals, labs and programs behind Honeyverse: HEER's Best Short win at the London South Asian Film Festival and Cine Qua Non Storylines Lab.",
    images: ["/og-image.jpg"],
  },
};

const Awards = function () {
  return (
    <>
      <Heroawards />
      <AwardsAndSelection />
      <LabsAndResidencies />
      {/* <IndustryAffiliations/> */}
      <Education/>
    </>
  );
};

export default Awards;