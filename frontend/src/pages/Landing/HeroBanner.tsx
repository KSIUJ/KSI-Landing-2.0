import Facade from "../../assets/images/base/facade_4.svg";



const HeroBanner: React.FC = () => (
  <div>
    <h1 className="font-inter text-[#2B2D42] text-[clamp(2rem,4vw,6rem)] justify-self-center font-bold px-1 pt-20 mb-2">
      Koło Studentów Informatyki UJ
    </h1>
    <img src={Facade} className="w-full mb-[clamp(1rem,3vw,2rem)]" alt="Fasada budynku" fetchPriority="high"/>
    
  </div>
  
);

export default HeroBanner;