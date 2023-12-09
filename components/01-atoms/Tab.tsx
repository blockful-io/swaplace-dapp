import { useState } from "react";
import cc from "classcat";

interface ITab {
  setSelectNftsFromOthers: (_: boolean) => void;
}

export const Tab = ({ setSelectNftsFromOthers }: ITab) => {
  const [isActiveTab, setIsActiveTab] = useState(1);

  return (
    <div className="flex-auto flex items-center justify-between w-[580px] ">
      <div className="flex">
        <button
          className={cc([isActiveTab == 1 && "bg-slate-300"])}
          onClick={() => {
            setSelectNftsFromOthers(false);
            setIsActiveTab(1);
          }}
        >
          Their Items
        </button>
      </div>
      <div className="flex">
        <button
          className={cc([isActiveTab == 2 && "bg-slate-300"])}
          onClick={() => {
            setSelectNftsFromOthers(true);
            setIsActiveTab(2);
          }}
        >
          Your Items
        </button>
      </div>
    </div>
  );
};
