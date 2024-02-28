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
  let totalSquaresX = 0; // Token quantity in X axis

  // We are getting X count as the LCM to fill the rows with empty cards correctly.
  isMobile
    ? ((totalSquares = ismobileTotalSquares),
      ismobileTotalSquares == 4 ? (totalSquaresX = 4) : (totalSquaresX = 3))
    : isWideScreen
    ? ((totalSquares = isWideScreenTotalSquares),
      isWideScreenTotalSquares == 8 ? (totalSquaresX = 4) : (totalSquaresX = 6))
    : isDesktop
    ? ((totalSquares = isDesktopTotalSquares), (totalSquaresX = 6))
    : isTablet && ((totalSquares = isTabletTotalSquares), (totalSquaresX = 6));

  const spareTokensX = len % totalSquaresX;
  const emptySquaresCountX = spareTokensX ? totalSquaresX - spareTokensX : 0;

  const spareTokens = totalSquares - len;
  const emptySquaresCount =
    emptySquaresCountX < spareTokens
      ? Math.max(spareTokens, 0)
      : emptySquaresCountX;

  const emptySquares = Array.from({ length: emptySquaresCount }, (_, index) => (
    <>
      <div key={`empty-${index}`} className="card-nft-normal" />
    </>
  ));

  return emptySquares;
};
