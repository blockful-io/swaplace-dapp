import { ConnectWallet, SwaplaceIcon } from "@/components/01-atoms";
import React from "react";

export const CardHome = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-16 w-[90%] text-center">
      <div className="flex flex-col gap-10 items-center">
        <div className="flex items-center gap-3 ">
          <SwaplaceIcon className="w-10" />
          <h1 className="text-2xl text-[#333333] dark:text-white">Swaplace</h1>
        </div>

        <div className="flex flex-col gap-4  items-center ">
          <div className="font-bold text-[40px] leading-[48.41px] text-[#333333] dark:text-white">
            Your greatest deals are here
          </div>
          <div className="font-normal  text-[24px] leading-[29.05px] text-[#333333] dark:text-white">
            Connect your wallet to start swapping your NFTs and tokens
          </div>
        </div>
      </div>

      <ConnectWallet
        customStyle={
          "py-4 max-w-[400px] w-full text-center border border-[#E0E0E0] rounded-lg hover:bg-[#f6f6f6] text-black dark:text-black dark:hover:bg-[#f6f6f6] dark:bg-white"
        }
      />
    </div>
  );
};
