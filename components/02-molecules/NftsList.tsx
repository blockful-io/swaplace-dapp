import { NFT } from "@/lib/client/constants";
import { NftCard } from "../01-atoms";

interface INftsList {
  nftsList: NFT[];
}

/**
 *
 * This component receives the data of multiple nfts and create its cards
 * @param nftsList
 *
 * @returns NftsList
 */

export const NftsList = ({ nftsList }: INftsList) => {
  return (
    <div className="grid grid-cols-6 gap-3 py-2 px-4">
      {nftsList.map((nft: NFT) => {
        return <NftCard nftData={nft} />;
      })}
    </div>
  );
};
