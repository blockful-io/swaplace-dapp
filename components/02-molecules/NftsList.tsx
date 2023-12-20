import { INftsList, NFT } from "@/lib/client/constants";
import { NftCard } from "@/components/02-molecules";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";

/**
 *
 * This component receives the data of multiple nfts and create its cards
 * @param nftsList
 * @param ownerAddress
 *
 * @returns NftsList
 */

export const NftsList = ({ nftsList, ownerAddress }: INftsList) => {
  const emptySquares = EmptyNftsCards(nftsList.length);
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

const EmptyNftsCards = (len: number) => {
  const { isDesktop, isTablet, isWideScreen, isMobile } = useScreenSize();

  let totalSquares: number = 0;

  isMobile
    ? (totalSquares = 15)
    : isWideScreen
    ? (totalSquares = 30)
    : isDesktop
    ? (totalSquares = 30)
    : isTablet && (totalSquares = 30);

  const emptySquaresCount = Math.max(totalSquares - len, 0);

  const emptySquares = Array.from({ length: emptySquaresCount }, (_, index) => (
    <>
      <div key={`empty-${index}`} className="card-nft" />
    </>
  ));

  return emptySquares;
};
