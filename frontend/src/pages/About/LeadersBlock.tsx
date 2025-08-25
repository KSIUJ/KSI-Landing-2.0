import { boardMembers } from "../../assets/images/about/board25-26";
import BoardLeaderCard from "../../components/BoardLeaderCard";
import InfoSection from "../../components/InfoSection";

import ButtonWithArrowDown from "../../components/ButtonWithArrowDown";
const LeadersBlock = () => {
  return (
    <div className="flex flex-col max-w-4xl w-full mx-auto   md:flex-row  md:gap-14">
      <div className="relative flex flex-col  md:w-[380px] h-[240px] md:mb-30">
        <BoardLeaderCard
          image={boardMembers[0].image}
          name={boardMembers[0].memberName}
          role={boardMembers[0].role}
          className="md:w-full w-[300px] h-[200px] md:h-[240px]"
        />
        <BoardLeaderCard
          image={boardMembers[1].image}
          name={boardMembers[1].memberName}
          role={boardMembers[1].role}
          className="absolute -top-20 left-42 w-[180px] h-[120px]  md:left-36 md:w-[280px] md:h-[180px] z-10"
        />
      </div>
      <div className="flex flex-col w-full mb-4 md:mt-8 md:w-[200px]">
        <InfoSection
          headerText="Poznaj Nas!"
          headerClasses="text-3xl font-inter mb-2 "
          paragraphText="Kołem Studentów Informatyki kierują Tomek i Karolina. Razem
                tworzą atmosferę współpracy, organizują wydarzenia i zarządzają projektami, ale przede wszystkim wspierają
                studentów w odkrywaniu nowych możliwości."
          paragraphClasses="font-light text-lg font-ssp"
        >
          <ButtonWithArrowDown text="Historia Koła" />
        </InfoSection>
      </div>
    </div>
  );
};

export default LeadersBlock;
