import { useScreenSize } from "@/lib/client/hooks/useScreenSize";

export const TokenCardsPlaceholder = (
  len: number,
  ismobileTotalSquares: number,
  isWideScreenTotalSquares: number,
  isDesktopTotalSquares: number,
  isTabletTotalSquares: number,
) => {
  const { isDesktop, isTablet, isWideScreen, isMobile } = useScreenSize();

  let totalSquares = 0;

  isMobile
    ? (totalSquares = ismobileTotalSquares)
    : isWideScreen
    ? (totalSquares = isWideScreenTotalSquares)
    : isDesktop
    ? (totalSquares = isDesktopTotalSquares)
    : isTablet && (totalSquares = isTabletTotalSquares);

  const emptySquaresCount = Math.max(totalSquares - len, 0);

  const emptySquares = Array.from({ length: emptySquaresCount }, (_, index) => (
    <>
      <div key={`empty-${index}`} className="card-nft-normal" />
    </>
  ));

  return emptySquares;
};
