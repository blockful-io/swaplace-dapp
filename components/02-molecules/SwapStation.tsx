import React from "react";
import { OfferSummary } from "./OfferSummary";

export const SwapStation = () => {
  return (
    <div className="w-[95%] lg:w-[400px] rounded p-5 flex flex-col justify-start items-center gap-16 bg-[#f8f8f8] border-2 border-[#E5E4E4]">
      <div className="w-full flex flex-col justify-start ">
        <h3 className="font-light text-xl text-[#333] mb-7">Swap offer</h3>
        <OfferSummary forAuthedUser={true} />
        <OfferSummary forAuthedUser={false} />
      </div>
    </div>
  );
};
