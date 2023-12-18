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
    <div className="w-full font-light flex-auto flex items-center justify-between  overflow-hidden  ">
      {swappingTabs.map((tab) => {
        return (
          <div
            key={tab.id}
            className={cc([
              isActiveTab == tab.id
                ? "dark:p-medium-bold-dark p-medium-bold border-b dark:border-[#DDF23D] border-black "
                : "dark:p-medium-bold p-medium-bold opacity-50 border-b dark:border-[#313131]",
              "flex-1 p-4  cursor-pointer",
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
