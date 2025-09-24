import Facade from "../../assets/images/base/facade_4.svg";
import Mordor from "../../assets/images/base/icons/MordorLogoWhite_2.svg";
import Gutenberg from "../../assets/images/base/icons/GutenbergLogoWhite_2.svg";
import Card from "../../components/Card";


const HeroBanner: React.FC = () => (
  <div>
    {/* Tu chyba powinien byc gorny margines zamiast pt-25 ale wtedy odslania biale tlo niewiadomo skad */}
    <h1 className="font-inter text-[#2B2D42] text-[clamp(2rem,4vw,6rem)] justify-self-center font-bold px-1 pt-20 mb-2">
      Koło Studentów Informatyki UJ
    </h1>
    <img src={Facade} className="w-full mb-[clamp(1rem,3vw,2rem)]"/>
    
  </div>
  
);

export default HeroBanner;