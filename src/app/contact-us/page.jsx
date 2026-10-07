import Contact from "@/components/contact-us/contact/contact";
import Herocontact from "@/components/contact-us/herocontact/herocontact";

export const metadata = {
  title: "Contact",
  description:
    "Projects, press, brand work or just a very good idea. We read everything. Pitch us with a logline and a short treatment, lookbook or reel.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    siteName: "Honeyverse Productions",
    title: "Contact \u00b7 Honeyverse Productions",
    description:
      "Projects, press, brand work or just a very good idea. We read everything. Pitch us with a logline and a short treatment, lookbook or reel.",
    url: "/contact",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact \u00b7 Honeyverse Productions",
    description:
      "Projects, press, brand work or just a very good idea. We read everything. Pitch us with a logline and a short treatment, lookbook or reel.",
    images: ["/og-image.jpg"],
  },
};


const Code = function () {
  return (
    <>
      <Herocontact/>
      <Contact/>
    </>
  );
};

export default Code;