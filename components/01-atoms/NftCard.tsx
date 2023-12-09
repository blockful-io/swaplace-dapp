import { NFT } from "@/lib/client/constants";
import Image from "next/image";
import React from "react";

interface INftCard {
  nftData: NFT;
}

/**
 *
 * This component receives the data of an nft and create a card NFT
 * @param nftData
 *
 * @returns NftCard
 */

export const NftCard = ({ nftData }: INftCard) => {
  if (!nftData.id || !nftData.contract) return null;

  return (
    <div className="w-20 h-20 rounded border border-[#E0E0E0] flex flex-col justify-center items-center bg-white">
      {nftData.metadata?.image ? (
        <img
          src={nftData.metadata?.image}
          alt={nftData.metadata?.name}
          height={80}
          width={80}
        />
      ) : nftData.metadata?.name ? (
        <div className="text-center text-[10px] mt-2 font-medium max-h-[40px] oveflow-y-scroll">
          {nftData.metadata?.name}
        </div>
      ) : null}
    </div>
  );
};
