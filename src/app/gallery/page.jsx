import Herogallery from "@/components/gallery/herogallery/herogallery";
import Archivestills from "@/components/gallery/archive-stills/archive-stills";
import Scence from "@/components/gallery/scence/scence";
import Draftsearch from "@/components/gallery/draftsearch/draftsearch";
import Createprocess from "@/components/gallery/creative-process/creativeprocess"
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