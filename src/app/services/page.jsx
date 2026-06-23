import Heroservices from "@/components/services/homeservices/homeservices";
import Physical from "@/components/services/physical/physical";
import TurnkeyList from "@/components/services/turnkeylist/turnkeylist";
import Collaborate from "@/components/services/collaborate/collaborate";
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