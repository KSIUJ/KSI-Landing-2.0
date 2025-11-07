import InfoSection from "../../components/InfoSection";
import DotList from "../../components/DotList";
import ArrowList from "../../components/ArrowList";
import { infoSections, structureItems } from "./data";
import LeftSideBorderedCard from "../../components/LeftSideBorderedCard";
import { Link } from "react-router-dom";

const AboutIntroCard = () => {
  const headerStyles = "font-inter text-2xl";
  const textStyles = "font-ssp text-xl font-light";
    const actions = [
      <Link to="/events" className={textStyles}>Organizujemy Wydarzenia</Link>,
      <Link to="/projects" className={textStyles}>Tworzymy Projekty</Link>
    ];
  return (
    <LeftSideBorderedCard
      title="O KSI"
      className="p-2 mt-24 max-w-4xl"
      titleClasses="text-4xl font-inter"
    >
      <InfoSection
        headerText="Ponad 45 lat działalności"
        headerClasses={headerStyles}
        paragraphText={infoSections[0].paragraph}
        paragraphClasses={textStyles}
      ></InfoSection>
      <InfoSection
        headerText="Czym się zajmujemy?"
        headerClasses={headerStyles}
      ></InfoSection>
      <ArrowList items={actions}>
        <p className={textStyles}>
          i staramy się o to, aby nasz Uniwersytet był przyjaznym miejscem dla
          każdego studenta informatyki!
        </p>
      </ArrowList>
      <InfoSection
        headerText="Struktura Organizacji"
        headerClasses={headerStyles}
        paragraphText='KSI jest organizacją "dla studentów, przez studentów" i jest
              zarządzana w ten sam sposób. Organami kierującymi KSI są:'
        paragraphClasses={textStyles}
      ></InfoSection>
      <DotList items={structureItems} />
    </LeftSideBorderedCard>
  );
};

export default AboutIntroCard;
