import Herobrand from "@/components/brand/herobrand/herobrand";
import Mark from "@/components/brand/mark/mark";
import Decade from "@/components/brand/decade/decade";
import Catattribute from "@/components/brand/catattribute/catattribute";

export const metadata = {
  title: "Brand",
  description:
    "We make films about women who are done performing, and we make them look as good as they feel. Hot pink, black and gold, maximalist on purpose.",
  alternates: { canonical: "/brand" },
  openGraph: {
    type: "website",
    siteName: "Honeyverse Productions",
    title: "Brand \u00b7 Honeyverse Productions",
    description:
      "We make films about women who are done performing, and we make them look as good as they feel. Hot pink, black and gold, maximalist on purpose.",
    url: "/brand",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand \u00b7 Honeyverse Productions",
    description:
      "We make films about women who are done performing, and we make them look as good as they feel. Hot pink, black and gold, maximalist on purpose.",
    images: ["/og-image.jpg"],
  },
};


const Brand = function () {
  return (
    <>
      <Herobrand />
      <Mark/>
      <Decade/>
      <Catattribute/>
    </>
  );
};

export default Brand;