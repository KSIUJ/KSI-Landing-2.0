import InfoSection from "../../components/InfoSection";
import DotList from "../../components/DotList";
import ArrowList from "../../components/ArrowList";
import { infoSections, structureItems } from "./data";
import LeftSideBorderedCard from "../../components/LeftSideBorderedCard";
const AboutIntroCard = () => {
  const actions = ["Organizujemy Wydarzenia", "Tworzymy Projekty"];
  const headerStyles = "font-inter text-lg";
  const textStyles = "font-openSans text-md font-extralight";
  return (
    <LeftSideBorderedCard
      title="O KSI"
      className="p-2 mt-2 max-w-4xl"
      titleClasses="text-4xl  font-inter"
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
        <p className="text-base font-light font-ssp">
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
