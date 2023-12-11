import { useState } from "react";
import cc from "classcat";

interface ITab {
  setActiveSwappingShelfID: (_: SwappingShelfID) => void;
}

interface Tab {
  id: number;
  name: string;
}

export enum SwappingShelfID {
  "THEIR_ITEMS",
  "YOUR_ITEMS",
}

export const swappingTabs: Array<Tab> = [
  {
    id: SwappingShelfID.THEIR_ITEMS,
    name: "Their Items",
  },
  {
    id: SwappingShelfID.YOUR_ITEMS,
    name: "Your Items",
  },
];

export const Tab = ({ setActiveSwappingShelfID }: ITab) => {
  const [isActiveTab, setIsActiveTab] = useState(SwappingShelfID.THEIR_ITEMS);

  return (
    <div className="w-full font-light flex-auto flex items-center justify-between rounded rounded-b-none overflow-hidden border-gray-200 border-2 border-b-0">
      {swappingTabs.map((tab) => {
        return (
          <div
            key={tab.id}
            className={cc([
              isActiveTab == tab.id ? "bg-[#f8f8f8]" : "bg-[#f0f0f0]",
              "flex-1 p-4 border-gray-400 cursor-pointer",
            ])}
            role="tab"
            onClick={() => {
              setActiveSwappingShelfID(tab.id);
              setIsActiveTab(tab.id);
            }}
          >
            <div className="flex items-center justify-center">{tab.name}</div>
          </div>
        );
      })}
    </div>
  );
};
