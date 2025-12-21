import HeroBanner from "./HeroBanner";
import Card from "../../components/Card";
import { infoKSI, listItems, carouselImages } from "./data";
import { EventList } from "./EventList";
import { BigListWithParagraphs } from "./BigListWithParagraphs";
import AutoCarousel from "./ImgCarousel";
import logoKsi from "../../assets/images/base/logo-ksi.svg"
import handAndKeyboard from "../../assets/images/events/53229668_2380325235334565_8317455106463236096_o.jpg"
import aboutKsi1 from "../../assets/images/events/aboutKsi1.jpg"

const LandingPage = () => {
  return (
    <>
      <HeroBanner />

      <div className="bg-[#2B2D42] px-3 py-8 flex justify-center">
        <div className="flex flex-col md:flex-row max-w-4xl w-full items-center justify-center text-white gap-6">
          <Card
            title={infoKSI[1].title}
            titleClasses="text-4xl text-white font-inter text-[clamp(1rem,4vw,2rem)] text-left"
          >
            <div className="flex flex-col gap-1 p-3 border-l-2 border-white text-justify">
              {infoKSI[1].paragraph}
            </div>
          </Card>

          <img
            className="hidden md:block w-48 h-auto invert"
            src={logoKsi}
            alt="KSI Logo"
          />
        </div>
      </div>

      <div className="flex flex-col mt-[clamp(110px,40%,150px)] md:mt-0 max-w-4xl w-full mx-auto mt-5  md:flex-row gap-10">
        <div className="relative w-[clamp(220px,70%,300px)] md:w-120 md:px-2 mx-auto content-center">
          <img
            src={handAndKeyboard}
            className="absolute w-7/8 -right-1/5 bottom-3/4 md:w-5/8 md:-right-1/10 md:bottom-9/16 h-auto object-cover rounded-4xl z-10"
            alt="Zdjęcie grupowe 1"
          />
          <img
            src={aboutKsi1}
            className="relative bottom-1/10 -left-1/5 md:left-0 md:-bottom-1/10 w-full h-auto object-cover rounded-4xl"
            alt="Zdjęcie grupowe 2"
          />
        </div>

        <div className="flex flex-col w-full mb-4 px-8 md:mt-8 md:w-[480px]">
          <h1 className="text-4xl font-semibold font-inter">
            Co nas wyróżnia?
          </h1>

          <BigListWithParagraphs items={listItems} />
        </div>
      </div>

      <AutoCarousel images={carouselImages} />
      <EventList />
    </>
  );
};

export default LandingPage;
