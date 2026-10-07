import Heroportfolio from "@/components/portfolio/heroportfolio/heroportfolio";
import Flagship from "@/components/portfolio/flagship/flagship";
import Corelist from "@/components/portfolio/corelist/corelist";
import Digitalip from "@/components/portfolio/digitalip/digitalip";

export const metadata = {
  title: "Portfolio",
  description:
    "Films, series and digital stories about women who stopped waiting for permission: HEER, Happy Baisakhi!, BRIE! and more from Honey B. Singh.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    type: "website",
    siteName: "Honeyverse Productions",
    title: "Portfolio \u00b7 Honeyverse Productions",
    description:
      "Films, series and digital stories about women who stopped waiting for permission: HEER, Happy Baisakhi!, BRIE! and more from Honey B. Singh.",
    url: "/portfolio",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio \u00b7 Honeyverse Productions",
    description:
      "Films, series and digital stories about women who stopped waiting for permission: HEER, Happy Baisakhi!, BRIE! and more from Honey B. Singh.",
    images: ["/og-image.jpg"],
  },
};


const Brand = function () {
  return (
    <>
      <Heroportfolio />
      <Flagship/>
      <Corelist/>
      <Digitalip/>
    </>
  );
};

export default Brand;