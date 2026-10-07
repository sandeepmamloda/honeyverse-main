import Herovisuals from "@/components/visuals/homevisuals/homevisuals";
import Opticalsignature from "@/components/visuals/optical-signature/optical-signature";
import Lookbood from "@/components/visuals/lookbook/lookbook";

export const metadata = {
  title: "Visual Identity",
  description:
    "Warm skin tones, saturated color and real places. The look of home, lit like a memory: palette, texture, framing, mood and lookbook.",
  alternates: { canonical: "/visuals" },
  openGraph: {
    type: "website",
    siteName: "Honeyverse Productions",
    title: "Visual Identity \u00b7 Honeyverse Productions",
    description:
      "Warm skin tones, saturated color and real places. The look of home, lit like a memory: palette, texture, framing, mood and lookbook.",
    url: "/visuals",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visual Identity \u00b7 Honeyverse Productions",
    description:
      "Warm skin tones, saturated color and real places. The look of home, lit like a memory: palette, texture, framing, mood and lookbook.",
    images: ["/og-image.jpg"],
  },
};


const Visuals = function () {
  return (
    <>
      <Herovisuals />
      <Opticalsignature/>
      <Lookbood/>
    </>
  );
};

export default Visuals;