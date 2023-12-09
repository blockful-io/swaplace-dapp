import { useState } from "react";
import cc from "classcat";

interface ITab {
  setSelectNftsFromOthers: (_: boolean) => void;
}

export const Tab = ({ setSelectNftsFromOthers }: ITab) => {
  const [isActiveTab, setIsActiveTab] = useState(1);

  return (
    <div className="flex-auto flex items-center justify-between ">
      <div
        className={cc([
          isActiveTab == 1 ? "bg-[#f8f8f8]" : "bg-[#f0f0f0]",
          "flex-1 p-4",
        ])}
      >
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              setSelectNftsFromOthers(false);
              setIsActiveTab(1);
            }}
          >
            Their Items
          </button>
        </div>
      </div>
      <div
        className={cc([
          "flex-1 p-4 border-l-[1px] border-b-[1px]",
          isActiveTab == 2 ? "bg-[#f8f8f8]" : "bg-[#f0f0f0]",
        ])}
      >
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              setSelectNftsFromOthers(true);
              setIsActiveTab(2);
            }}
          >
            Your Items
          </button>
        </div>
      </div>
    </div>
  );
};
