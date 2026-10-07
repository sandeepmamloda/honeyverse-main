import Herocode from "@/components/code/herocode/herocode";
import Principles from "@/components/code/principles/principles";
import Declaration from "@/components/code/declaration/declaration"; 

// Code page (/code): ye export apni Code page file ke top par paste karo
export const metadata = {
  title: "Our Code",
  description:
    "Four rules we don't break, on set or online: tell the truth, specific is universal, funny is serious, and take care of the room.",
  alternates: { canonical: "/code" },
  openGraph: {
    type: "website",
    siteName: "Honeyverse Productions",
    title: "Our Code \u00b7 Honeyverse Productions",
    description:
      "Four rules we don't break, on set or online: tell the truth, specific is universal, funny is serious, and take care of the room.",
    url: "/code",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Code \u00b7 Honeyverse Productions",
    description:
      "Four rules we don't break, on set or online: tell the truth, specific is universal, funny is serious, and take care of the room.",
    images: ["/og-image.jpg"],
  },
};


const Code = function () {
  return (
    <>
      <Herocode />
      <Principles/>
      <Declaration/>
    </>
  );
};

export default Code;