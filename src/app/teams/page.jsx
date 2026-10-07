import Heroteams from "@/components/teams/heroteams/teams";
import Coreteam from "@/components/teams/coreteam/coreteam";
import Developmentslate from "@/components/teams/development-slate/development-slate";
import Globalpresenc from "@/components/teams/globalpresence/globalpresencs";

export const metadata = {
  title: "Team",
  description:
    "A small team with a big universe. Meet Honey B. Singh, founder, writer and director, and the collaborators we bring in for every story.",
  alternates: { canonical: "/team" },
  openGraph: {
    type: "website",
    siteName: "Honeyverse Productions",
    title: "Team \u00b7 Honeyverse Productions",
    description:
      "A small team with a big universe. Meet Honey B. Singh, founder, writer and director, and the collaborators we bring in for every story.",
    url: "/team",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team \u00b7 Honeyverse Productions",
    description:
      "A small team with a big universe. Meet Honey B. Singh, founder, writer and director, and the collaborators we bring in for every story.",
    images: ["/og-image.jpg"],
  },
};


const Awards = function () {
  return (
    <>
      <Heroteams />
      <Coreteam/>
      <Developmentslate/>
      <Globalpresenc/>
    </>
  );
};

export default Awards;