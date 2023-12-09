import React from "react";
import cc from "classcat";
import { ConnectWallet, SwaplaceIcon } from "@/components/01-atoms";

export const CardHome = () => {
  return (
    <div
      className={cc([
        "flex flex-col justify-center items-center gap-16 w-full text-center",
      ])}
    >
      <div className={cc(["flex flex-col gap-10 items-center"])}>
        <div className={cc(["flex items-center gap-3 "])}>
          <SwaplaceIcon />
          <h1 className="text-2xl">Swaplace</h1>
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

      <ConnectWallet
        customStyle={
          "py-4 px-[20%] text-center border border-[#E0E0E0] rounded-lg hover:bg-[#f6f6f6] transition"
        }
      />
    </div>
  );
};
