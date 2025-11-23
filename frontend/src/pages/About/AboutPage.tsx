import "swiper/css/bundle";
import History from "./History";
import AboutIntroCard from "./AboutIntroCard";
import BoardCarousel from "./BoardCarousel";
import LeadersBlock from "./LeadersBlock";
import { useEffect, useRef, useState, useMemo } from "react";
import { fetchVIPMembers, mapVIPRoles } from "../http";
import type { VIPMember } from "../http";
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
  const [VIPMembers, setVIPMembers] = useState<VIPMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVIPs = async () => {
      try {
        setLoading(true);
        const vipMembers = await fetchVIPMembers();
        setVIPMembers([...vipMembers]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadVIPs();
  }, []);

  const groupByRole = useMemo(() => {
    return VIPMembers.reduce(
      (acc: Record<string, string[]>, member: VIPMember) => {
        const role = member.role_title;
        if (!acc[role]) acc[role] = [];
        acc[role].push(member.name);
        return acc;
      },
      {}
    );
  }, [VIPMembers]);

  return (
    <div>
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
          {Object.entries(groupByRole).map(([role, names]) => {
            //@ts-ignore
            const roleName = mapVIPRoles[role];
            return (
              <InfoSection
                className="max-w-4xl"
                key={role}
                headerText={roleName}
                headerClasses={headerStyles}
                paragraphText={names.join(", ")}
                paragraphClasses={textStyles}
              />
            );
          })}
        </LeftSideBorderedCard>
        <History scrollTargetRef={historyRef} />
      </div>
    </div>
  );
};

export default AboutPage;
