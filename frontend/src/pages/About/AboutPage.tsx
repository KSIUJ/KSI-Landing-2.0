import "swiper/css/bundle";
import History from "./History";
import AboutIntroCard from "./AboutIntroCard";
import BoardCarousel from "./BoardCarousel";
import LeadersBlock from "./LeadersBlock";
import { useRef } from "react";
import { infoAboutKsiPeople } from "./data";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import InfoSection from "../../components/InfoSection";
import LeftSideBorderedCard from "../../components/LeftSideBorderedCard";
const AboutPage = () => {
  const flexContainerCenter = "flex flex-col  gap-2 items-center px-4 md:px-8";
  const headerStyles = "font-inter text-2xl";
  const textStyles = "font-ssp text-xl font-light";

  const historyRef = useRef<HTMLDivElement | null>(null);
  const scrollToHistory = () => {
    historyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <Navbar />
      <div className={flexContainerCenter}>
        <AboutIntroCard />
        <LeadersBlock onScrollToHistory={scrollToHistory} />
        <InfoSection
          className="w-full max-w-4xl"
          headerText="Razem tworzymy KSI"
          headerClasses="text-4xl font-inter"
          paragraphText="Reszta zarządu wspólnie odpowiada za realizację projektów, wydarzeń oraz codzienną pracę Koła."
          paragraphClasses="text-2xl font-extralight mt-1"
        ></InfoSection>
        <BoardCarousel />
        <LeftSideBorderedCard
          title="Ci, którzy działają dla KSI"
          titleClasses="text-4xl font-inter"
        >
          {infoAboutKsiPeople.map(({ header, text }) => (
            <InfoSection
              key={header}
              className="max-w-4xl"
              headerText={header}
              headerClasses="text-2xl   font-inter"
              paragraphText={text}
              paragraphClasses="font-extralight text-xl font-ssp"
            />
          ))}
        </LeftSideBorderedCard>
        <History scrollTargetRef={historyRef} />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
