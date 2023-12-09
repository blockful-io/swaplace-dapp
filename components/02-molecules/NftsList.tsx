import { NFT } from "@/lib/client/constants";
import { NftCard } from "../01-atoms";

interface INftsList {
  nftsList: NFT[];
  ownerAddress: string | null;
}

/**
 *
 * This component receives the data of multiple nfts and create its cards
 * @param nftsList
 * @param ownerAddress
 *
 * @returns NftsList
 */

export const NftsList = ({ nftsList, ownerAddress }: INftsList) => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 gap-3 py-6 px-4">
      {nftsList.map((nft: NFT) => {
        return <NftCard ownerAddress={ownerAddress} nftData={nft} />;
      })}
    </div>
  );
};
