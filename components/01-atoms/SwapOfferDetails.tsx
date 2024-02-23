import { CheckIcon, XMarkIcon } from "@/components/01-atoms";
import React from "react";

export const SwapOfferDetails = () => (
  <div className="flex w-full justify-between items-center py-1 px-3 p-xsmall">
    <ul className="flex text-[#898e8b]">
      <li className="uppercase bg-[#d9702a] text-[#fff] px-1.5 rounded">
        pending analysis
      </li>
      <div className="w-1.5 h-1.5 mx-2.5 mt-2 rounded-full bg-[#373737]" />
      <li>expires on</li>
      <div className="w-1.5 h-1.5 mx-2.5 my-2 rounded-full bg-[#373737]" />
      <li>Created by them</li>
    </ul>
    <div className="flex">
      <button
        // onClick={acceptSwap}
        className="disabled:pointer-events-none rounded-lg w-full disabled:bg-gray-100 dark:disabled:bg-[#353836] bg-[#d8f035] py-1 px-2.5 mx-4 items-center flex justify-center gap-1 font-semibold text-[#171918] disabled:border-gray-200  dark:disabled:border-[#434443] disabled:text-gray-300"
      >
        <CheckIcon />
        Accept
      </button>
      <button
        // onClick={cancelSwap}
        className="disabled:pointer-events-none rounded-lg w-full disabled:bg-gray-100 dark:disabled:bg-[#353836] bg-[#434828;] py-1 px-2.5 items-center flex justify-center gap-1 font-semibold text-[#cee535] dark:disabled:border-[#434443] disabled:text-gray-300"
      >
        <XMarkIcon />
        Reject
      </button>
    </div>
  </div>
);
