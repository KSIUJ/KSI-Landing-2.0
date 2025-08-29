import Facade from "../../assets/images/base/facade_2.svg";
import Mordor from "../../assets/images/base/icons/MordorLogoWhite_2.svg";
import Gutenberg from "../../assets/images/base/icons/GutenbergLogoWhite_2.svg";
import Card from "../../components/Card";


const HeroBanner: React.FC = () => (
  <div>
    {/* Tu chyba powinien byc gorny margines zamiast pt-25 ale wtedy odslania biale tlo niewiadomo skad */}
    <h1 className="font-inter text-[#2B2D42] text-[clamp(2rem,4vw,6rem)] justify-self-center font-bold pt-25 mb-2">
      Koło Studentów Informatyki UJ
    </h1>
    <img src={Facade} className="w-full"/>
    <div className="bg-[#2B2D42] pb-4 md:px-40 xl:px-80">

      <div className="flex gap-x-[15vw] py-5 justify-center">
        <a href="https://mordor.ksi.ii.uj.edu.pl" className="group cursor-pointer transition transform hover:scale-125">
          <img src={Mordor} className="w-auto h-[10vw] "/>
        </a>

        <a href="https://gutenberg.ksi.ii.uj.edu.pl" className=" group cursor-pointer transition transform hover:scale-125">
        
        <img src={Gutenberg} className="w-auto h-[10vw] "/>
        </a>
        <a href="https://mordor.ksi.ii.uj.edu.pl" className=" group cursor-pointer transition transform hover:scale-125">

        <img src={Mordor} className="w-auto h-[10vw]"/>
        </a>
      </div>
    </div>

  </div>
  
);

export default HeroBanner;