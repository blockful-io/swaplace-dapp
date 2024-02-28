import { NftSizeClassNames, StyleVariant } from "../02-molecules";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";
import cc from "classcat";

export const EmptyNftsCards = (
  tokenArrayLength: number,
  ismobileTotalSquares: number,
  isWideScreenTotalSquares: number,
  isDesktopTotalSquares: number,
  isTabletTotalSquares: number,
  styleType?: StyleVariant,
) => {
  const { isDesktop, isTablet, isWideScreen, isMobile } = useScreenSize();

  let totalSquares = 0;
  let totalSquaresX = 0; // Token quantity in X axis

  // We are getting X count as the LCM to fill the rows with empty cards correctly.
  isMobile
    ? ((totalSquares = ismobileTotalSquares),
      ismobileTotalSquares == 5 ? (totalSquaresX = 5) : (totalSquaresX = 3))
    : isWideScreen
    ? ((totalSquares = isWideScreenTotalSquares),
      isWideScreenTotalSquares == 10
        ? (totalSquaresX = 5)
        : (totalSquaresX = 6))
    : isDesktop
    ? ((totalSquares = isDesktopTotalSquares),
      isDesktopTotalSquares == 8 ? (totalSquaresX = 4) : (totalSquaresX = 6))
    : isTablet &&
      ((totalSquares = isTabletTotalSquares),
      isTabletTotalSquares == 10 ? (totalSquaresX = 5) : (totalSquaresX = 6));

  const spareTokensX = tokenArrayLength % totalSquaresX;
  const emptySquaresCountX = spareTokensX ? totalSquaresX - spareTokensX : 0;

  const spareTokens = totalSquares - tokenArrayLength;
  const emptySquaresCount =
    emptySquaresCountX < spareTokens
      ? Math.max(spareTokens, 0)
      : emptySquaresCountX;

  const emptySquares = Array.from({ length: emptySquaresCount }, (_, index) => (
    <>
      <div
        key={`empty-${index}`}
        className={cc(
          styleType && [NftSizeClassNames[styleType]]
            ? [NftSizeClassNames[styleType]]
            : "card-nft-normal",
        )}
      />
    </>
  ));

  return emptySquares;
};
