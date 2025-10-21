import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { historyContent } from "./data";
import type { Decade } from "./data";
const History = (props: {
  scrollTargetRef: RefObject<HTMLDivElement> | RefObject<null>;
}) => {
  const historyTabs: Decade[] = [
    "2020",
    "2010",
    "2000",
    "1990",
    "1980",
    "1970",
  ];
  const labels: Record<string, string> = {
    president: "Prezes",
    vicePresidents: "Wiceprezesi",
    boardMembers: "Członkowie zarządu",
    admins: "Administratorzy",
    housekeepers: "Gospodarze",
    auditcomitee: "Komisja rewizyjna",
    plenipotentiaries: "Pełnomocnicy",
    treasurer: "Skarbnik",
    librarians: "Bibliotekarze",
    secretary: "Sekretarz",
  };
  const [openYears, setOpenYears] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeDecade: Decade = historyTabs[activeTab];
  const decadeContent = historyContent[activeDecade];
  useEffect(() => {
    const initiallyOpen = new Set(
      historyContent[activeDecade]
        .filter((entry) => entry.text === "")
        .map((entry) => entry.year)
    );
    setOpenYears(initiallyOpen);
  }, [activeDecade]);

  const toggleYear = (year: string) => {
    setOpenYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };
  return (
    <div
      className="w-full max-w-4xl mx-auto flex flex-col"
      ref={props.scrollTargetRef}
    >
      <h3 className="text-4xl font-inter font-md my-2">Historia Koła</h3>
      <div
        className="w-full md:w-auto
          -mx-4 px-4
          overflow-x-auto
          snap-x snap-mandatory
          flex gap-2 md:gap-4
          md:overflow-visible"
      >
        {historyTabs.map((value, idx) => (
          <button
            key={value}
            onClick={() => setActiveTab(idx)}
            className={`text-3xl  cursor-pointer  ${
              activeTab === idx
                ? "text-black font-inter font-md"
                : "text-gray-600 font-inter font-extralight hover:font-light"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
      {decadeContent.map(({ year, text, management }) => {
        const isOpen = openYears.has(year);
        return (
          <div
            key={year}
            className="mt-4 mb-4 bg-white drop-shadow-lg rounded-2xl p-2 transition hover:drop-shadow-xl hover:-translate-y-1"
          >
            <h3 className="text-xl font-inter">{year}</h3>
            <p className="text-xl font-ssp font-light">{text}</p>
            <button
              onClick={() => toggleYear(year)}
              className="cursor-pointer mt-1"
            >
              <span className="relative after:left-0 after:-bottom-1 after:content-[''] after:absolute after:w-0 after:h-[2px] after:transition-all after:duration-300 hover:after:w-full after:bg-black font-medium">
                {isOpen ? "Ukryj zarząd" : "Pokaż zarząd"}
              </span>
            </button>

            {isOpen && (
              <div className="text-xl font-light font-ssp">
                {Object.entries(management).map(([key, value]) =>
                  value ? (
                    <p key={key}>
                      {labels[key] ?? key}: {value}
                    </p>
                  ) : null
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default History;
