import Heroawards from "@/components/awards/heroawards/heroawards";
import AwardsAndSelection from "@/components/awards/awards-and-selection/awards-and-selection";
import LabsAndResidencies from "@/components/awards/labs-and-residencies/labs-and-residencies";
import IndustryAffiliations from "@/components/awards/industry-affiliations/industry-affiliations";

const Awards = function () {
  return (
    <>
      <Heroawards />
      <AwardsAndSelection />
      <LabsAndResidencies />
      <IndustryAffiliations/>
    </>
  );
};

export default Awards;