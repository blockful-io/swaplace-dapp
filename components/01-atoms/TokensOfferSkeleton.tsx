import React from "react";
import cc from "classcat";

export const TokensOfferSkeleton = () => {
  const TokenCardSkeleton = () => {
    return (
      <div className="w-[326px] h-full flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="ens-avatar-small bg-gray-700"></div>
          <div className="w-40 h-4 bg-gray-700 rounded-full "></div>
        </div>
        <div className="flex gap-4">
          <div className=" card-nft-medium !mx-0 !bg-gray-700  "></div>
          <div className=" card-nft-medium !mx-0 !bg-gray-700  "></div>
          <div className=" card-nft-medium !mx-0 !bg-gray-700  "></div>
          <div className=" card-nft-medium !mx-0 !bg-gray-700  "></div>
        </div>
        <div className="flex justify-between py-1 px-2">
          <div className="w-[60px] h-[20px] bg-gray-700 rounded-full "></div>
          <div className="w-[135px] h-[20px] bg-gray-700 rounded-full "></div>
        </div>
      </div>
    );
  };

  const TokenOfferDetailsSkeleton = () => {
    return (
      <div className="flex justify-between px-3 p-2">
        <div className="flex p-small dark:!text-[#A3A9A5] items-center gap-2">
          <div className="w-[80px] !bg-gray-700 rounded-lg h-6"></div>
          <div className="w-[160px] !bg-gray-700 rounded-lg h-4"></div>
          <div className="w-[100px] !bg-gray-700 rounded-lg h-4"></div>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <div className="w-[90px] bg-gray-700 h-6 rounded-full"></div>
          <div className="w-[12px] bg-gray-700 h-6 rounded-full"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col border border-[#353836] shadow-add-manually-card dark:bg-[#282B29] rounded-lg w-[716px] h-full animate-pulse">
      <div className="flex border-b border-[#353836]">
        <div className={cc(["border-r p-4 dark:border-[#353836] "])}>
          <TokenCardSkeleton />
        </div>
        <div className="flex p-4">
          <TokenCardSkeleton />
        </div>
      </div>
      <TokenOfferDetailsSkeleton />
    </div>
  );
};
