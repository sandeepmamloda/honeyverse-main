import Heroservices from "@/components/services/homeservices/homeservices";
import Physical from "@/components/services/physical/physical";
import TurnkeyList from "@/components/services/turnkeylist/turnkeylist";
import Collaborate from "@/components/services/collaborate/collaborate";

export const metadata = {
  title: "Services",
  description:
    "From first draft to final cut, and from film to feed. Development, directing, producing, branded content, social strategy and co-productions.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    siteName: "Honeyverse Productions",
    title: "Services \u00b7 Honeyverse Productions",
    description:
      "From first draft to final cut, and from film to feed. Development, directing, producing, branded content, social strategy and co-productions.",
    url: "/services",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services \u00b7 Honeyverse Productions",
    description:
      "From first draft to final cut, and from film to feed. Development, directing, producing, branded content, social strategy and co-productions.",
    images: ["/og-image.jpg"],
  },
};


const Brand = function () {
  return (
    <>
      <Heroservices/>
      <Physical/>
      <TurnkeyList/>
      <Collaborate/>
    </>
  );
};

export default Brand;