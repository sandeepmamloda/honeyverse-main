import Heroportfolio from "@/components/portfolio/heroportfolio/heroportfolio";
import Flagship from "@/components/portfolio/flagship/flagship";
import Corelist from "@/components/portfolio/corelist/corelist";
import Digitalip from "@/components/portfolio/digitalip/digitalip";
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