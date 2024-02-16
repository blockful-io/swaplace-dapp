import { NFT } from "@/lib/client/constants";
import { NftCard } from "@/components/02-molecules";
import { EmptyNftsCards } from "@/components/01-atoms";
/* eslint-disable react/jsx-key */

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
  const emptySquares = EmptyNftsCards(nftsList.length, 15, 30, 30, 30);
  const nftSquares = nftsList.map((nft: NFT, index) => (
    <div key={`nft-${index}`}>
      <NftCard ownerAddress={ownerAddress} nftData={nft} />
    </div>
  ));

  const allSquares = [...nftSquares, ...emptySquares];

  return (
    <div className="w-full grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3 py-6 px-4">
      {allSquares}
    </div>
  );
};
