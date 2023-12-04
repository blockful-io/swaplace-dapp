import React from "react";
import cc from "classcat";
import { ConnectWallet } from "@/components/01-atoms";

export const CardHome = () => {
  return (
    <div className={cc(["flex flex-col justify-center items-center gap-16"])}>
      <div className={cc(["flex flex-col gap-10 items-center"])}>
        <div className={cc(["flex items-center gap-3 "])}>
          <div className="w-7 h-7 bg-neutral-200 rounded-full" />
          <div>Swaplace</div>
        </div>

        <div className={cc(["flex flex-col gap-4  items-center "])}>
          <div className={cc(["font-bold text-[40px] leading-[48.41px]"])}>
            Your greatest deals are here
          </div>
          <div className={cc(["font-normal  text-[24px] leading-[29.05px]"])}>
            Connect your wallet to start swapping your NFTs and tokens
          </div>
        </div>
      </div>

      <div
        className={cc([
          "flex items-center justify-between w-[607px] h-[60px] border border-[#E0E0E0] rounded-lg ",
        ])}
      >
        <ConnectWallet customStyle={"w-[607px] h-[60px] "} />
      </div>
    </div>
  );
};
