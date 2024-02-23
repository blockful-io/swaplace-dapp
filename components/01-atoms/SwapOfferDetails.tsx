import {
  DoneIcon,
  OfferTag,
  ThreeDotsCardOffersOptions,
} from "@/components/01-atoms";
import React from "react";

export const SwapOfferDetails = () => (
  <div className="flex w-full justify-between items-center py-2 px-3">
    <div>
      <ul className="flex p-small dark:!text-[#A3A9A5] items-center gap-2">
        <OfferTag />
        <li className="flex items-center gap-2">
          <div className=" w-1 h-1 bg-neutral-600 rounded-full shadow-inner" />
          Expires on 16 Oct, 2023
        </li>
        <li className="flex items-center gap-2">
          <div className="w-1 h-1 bg-neutral-600 rounded-full shadow-inner" />
          Created by you
        </li>
      </ul>
    </div>
    <div className="flex gap-2 justify-center items-center ">
      <div>
        <button
          // onClick={acceptSwap}
          className="disabled:pointer-events-none rounded-lg w-full h-[28px] shadow-tag bg-[#d8f035] py-1 px-3 items-center flex justify-center gap-2"
        >
          <DoneIcon />
          <p className="p-medium-bold-variant-black">Accept</p>
        </button>
      </div>

      <ThreeDotsCardOffersOptions />
    </div>
  </div>
);
