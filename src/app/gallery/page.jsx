import Herogallery from "@/components/gallery/herogallery/herogallery";
import Archivestills from "@/components/gallery/archive-stills/archive-stills";
import Scence from "@/components/gallery/scence/scence";
import Draftsearch from "@/components/gallery/draftsearch/draftsearch";
import Createprocess from "@/components/gallery/creative-process/creativeprocess";

export const metadata = {
  title: "Gallery",
  description:
    "Stills, set days and the messy middle of making things: scripts, moodboards and our creative process from writing to color.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    type: "website",
    siteName: "Honeyverse Productions",
    title: "Gallery \u00b7 Honeyverse Productions",
    description:
      "Stills, set days and the messy middle of making things: scripts, moodboards and our creative process from writing to color.",
    url: "/gallery",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery \u00b7 Honeyverse Productions",
    description:
      "Stills, set days and the messy middle of making things: scripts, moodboards and our creative process from writing to color.",
    images: ["/og-image.jpg"],
  },
};


const Gallery = function () {
  return (
    <>
      <Herogallery />
      <Archivestills/>
      <Scence/>
      <Draftsearch/>
      <Createprocess/>
    </>
  );
};

export default Gallery;