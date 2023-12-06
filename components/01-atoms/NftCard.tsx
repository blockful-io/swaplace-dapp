import { NFT } from "@/lib/client/constants";
import React from "react";

interface INftCard {
  nftsOwner: NFT[];
}

/**
 *
 * This component receives the data of an nft and create a card NFT
 * @param nftsOwner
 *
 * @returns NftCard
 */

export const NftCard: React.FC<INftCard> = ({ nftsOwner }) => {
  return (
    <div className="grid grid-cols-6 gap-3">
      {nftsOwner.map((nft, index) => {
        return <div key={index}>{nft.name}</div>;
      })}
    </div>
  );
};
