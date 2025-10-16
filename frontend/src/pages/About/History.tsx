import { useState } from "react";
const History = () => {
  const historyTabs = ["2020", "2010", "2000", "1990", "1980", "1970"];
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col">
      <h3 className="text-2xl font-inter font-md my-2">Historia Koła</h3>
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
            className={`text-2xl ${
              activeTab === idx
                ? "text-black font-inter font-md"
                : "text-gray-600 font-inter font-extralight"
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};
export default History;
