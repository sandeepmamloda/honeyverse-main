import Heronews from "@/components/news/heronews/heronews";
import Feararchitecture from "@/components/news/feararchitecture/feararchitecture";
import Newsgrid from "@/components/news/newsgrid/newsgrid";

export const metadata = {
  title: "News",
  description:
    "Announcements, press and what we're working on right now, including Happy Baisakhi! entering pre-production ahead of 2027 principal photography.",
  alternates: { canonical: "/news" },
  openGraph: {
    type: "website",
    siteName: "Honeyverse Productions",
    title: "News \u00b7 Honeyverse Productions",
    description:
      "Announcements, press and what we're working on right now, including Happy Baisakhi! entering pre-production ahead of 2027 principal photography.",
    url: "/news",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "News \u00b7 Honeyverse Productions",
    description:
      "Announcements, press and what we're working on right now, including Happy Baisakhi! entering pre-production ahead of 2027 principal photography.",
    images: ["/og-image.jpg"],
  },
};


const News = function () {
  return (
    <>
      <Heronews />
      <Feararchitecture/>
      <Newsgrid/>
    </>
  );
};

export default News;