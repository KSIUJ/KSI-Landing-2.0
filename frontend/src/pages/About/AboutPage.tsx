import "swiper/css/bundle";
import History from "./History";
import AboutIntroCard from "./AboutIntroCard";
import BoardCarousel from "./BoardCarousel";
import LeadersBlock from "./LeadersBlock";

import { infoAboutKsiPeople } from "./data";
import InfoSection from "../../components/InfoSection";
import LeftSideBorderedCard from "../../components/LeftSideBorderedCard";
const AboutPage = () => {
  const flexContainerCenter = "flex flex-col  gap-2 items-center px-4 md:px-8";

  return (
    <div className={flexContainerCenter}>
      <AboutIntroCard />
      <LeadersBlock />
      <InfoSection
        className="w-full max-w-4xl"
        headerText="Razem tworzymy KSI"
        headerClasses="text-2xl font-inter"
        paragraphText="Reszta zarządu wspólnie odpowiada za realizację projektów, wydarzeń oraz codzienną pracę Koła."
        paragraphClasses="text-lg font-extralight mt-1"
      ></InfoSection>
      <BoardCarousel />
      <LeftSideBorderedCard
        title="Ci, którzy działają dla KSI"
        titleClasses="text-2xl font-inter"
      >
        {infoAboutKsiPeople.map(({ header, text }) => (
          <InfoSection
            key={header}
            className="max-w-4xl"
            headerText={header}
            headerClasses="text-lg font-inter"
            paragraphText={text}
            paragraphClasses="font-extralight text-md font-s"
          />
        ))}
      </LeftSideBorderedCard>
      <History />
    </div>
  );
};

export default AboutPage;
