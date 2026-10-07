import Fly from "@/components/timeline/fly";

export const metadata = {
  title: "Timeline",
  description:
    "How we got here, and where we're going: from an NYU Tisch MFA and HEER's Best Short win to Happy Baisakhi! shooting in 2027.",
  alternates: { canonical: "/timeline" },
  openGraph: {
    type: "website",
    siteName: "Honeyverse Productions",
    title: "Timeline \u00b7 Honeyverse Productions",
    description:
      "How we got here, and where we're going: from an NYU Tisch MFA and HEER's Best Short win to Happy Baisakhi! shooting in 2027.",
    url: "/timeline",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timeline \u00b7 Honeyverse Productions",
    description:
      "How we got here, and where we're going: from an NYU Tisch MFA and HEER's Best Short win to Happy Baisakhi! shooting in 2027.",
    images: ["/og-image.jpg"],
  },
};


const Visuals = function () {
  return (
    <>
      <Fly/>
    </>
  );
};

export default Visuals;