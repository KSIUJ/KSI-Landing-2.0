import BoardLeaderCard from "./BoardLeaderCard";
import InfoSection from "../../components/InfoSection";

import ButtonWithArrowDown from "../../components/ButtonWithArrow";
import { useEffect, useState } from "react";
import { fetchBoardMembers, type BoardMember, mapBoardRoles } from "../http";

const LeadersBlock = (props: { onScrollToHistory: () => void }) => {
  const [leaders, setLeaders] = useState<BoardMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaders = async () => {
      try {
        const presidentFetched = await fetchBoardMembers(
          undefined,
          "president"
        );
        const vicePresidentFetched = await fetchBoardMembers(
          undefined,
          "vicepresident"
        );
        setLeaders([...presidentFetched, ...vicePresidentFetched]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadLeaders();
  }, []);

  if (leaders.length === 0) {
    return (
      <div className="text-sm text-slate-500">Brak danych o zarządzie.</div>
    );
  }

  const [president, vice] = leaders;

  return (
    <div className="flex flex-col max-w-4xl w-full mx-auto   md:flex-row  md:gap-14">
      <div className="relative flex flex-col  md:w-[380px] h-[240px] md:mb-30">
        <BoardLeaderCard
          image={president.image_url ?? ""}
          name={president.name}
          role={mapBoardRoles[president.role_title]}
          className="md:w-full w-[300px] h-[200px] md:h-[240px]"
        />
        <BoardLeaderCard
          image={vice.image_url ?? ""}
          name={vice.name}
          role={mapBoardRoles[vice.role_title]}
          className="absolute -top-20 left-42 w-[180px] h-[120px]  md:left-36 md:w-[280px] md:h-[180px] z-10"
        />
      </div>
      <div className="flex flex-col w-full mb-4 md:mt-8 md:w-[200px]">
        <InfoSection
          headerText="Poznaj Nas!"
          headerClasses="text-4xl font-inter mb-2 "
          paragraphText={`Kołem Studentów Informatyki kierują ${president.name} i ${vice.name} razem
                tworzą atmosferę współpracy, organizują wydarzenia i zarządzają projektami, ale przede wszystkim wspierają
                studentów w odkrywaniu nowych możliwości. `}
          paragraphClasses="font-light text-xl font-ssp"
        >
          <ButtonWithArrowDown
            down
            text="Historia Koła"
            className="font-light text-xl font-ssp"
            onClick={props.onScrollToHistory}
          />
        </InfoSection>
      </div>
    </div>
  );
};

export default LeadersBlock;
