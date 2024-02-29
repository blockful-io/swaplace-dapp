import { NFT } from "@/lib/client/constants";
import { NftCard } from "@/components/02-molecules";
import { EmptyNftsCards, SwapAddTokenCard } from "@/components/01-atoms";

/* eslint-disable react/jsx-key */
interface INftsList {
  nftsList: NFT[];
  ownerAddress: string | null;
  variant: "your" | "their";
}

/**
 *
 * This component receives the data of multiple nfts and create its cards
 * @param nftsList
 * @param ownerAddress
 *
 * @returns NftsList
 */

export const NftsList = ({ nftsList, ownerAddress, variant }: INftsList) => {
  const emptySquares = EmptyNftsCards(nftsList.length, 15, 24, 24, 24);
  const addTokenSquare = SwapAddTokenCard();
  const nftSquares = nftsList.map((nft: NFT, index) => (
    <div key={`nft-${index}`} className="w-[80px] h-[80px]">
      <NftCard ownerAddress={ownerAddress} nftData={nft} />
    </div>
  ));

  if (variant === "your") {
    emptySquares.pop(); // Removes the last element to fill with addToken
    const allSquares = [...nftSquares, ...emptySquares, addTokenSquare];
    return (
      <div className="w-full h-full grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3">
        {allSquares}
      </div>
    );
  } else {
    const allSquares = [...nftSquares, ...emptySquares];
    return (
      <div className="w-full h-full grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3 ">
        {allSquares}
      </div>
    );
  }
};
