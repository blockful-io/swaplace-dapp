import React from "react";
import cc from "classcat";
import { CardSwap } from "../01-atoms/CardSwap";

export const SwapStation = () => {
  return (
    <div
      className={cc([
        "flex flex-col justify-center items-center gap-16 bg-[#f2f2f2]",
      ])}
    >
      <CardSwap />
    </div>
  );
};
