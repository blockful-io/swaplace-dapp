/* eslint-disable react-hooks/exhaustive-deps */
import {
  TokenCardStyleType,
  TokenSizeClassNames,
} from "@/components/02-molecules";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";

interface TokenCardsPlaceholderProps {
  totalCardsLength: number;
  wideScreenTotalSquares?: number;
  desktopTotalSquares?: number;
  tabletTotalSquares?: number;
  mobileTotalSquares?: number;
  styleType?: TokenCardStyleType;
}

export const TokenCardsPlaceholder = ({
  totalCardsLength,
  wideScreenTotalSquares = 24,
  desktopTotalSquares = 24,
  tabletTotalSquares = 24,
  mobileTotalSquares = 15,
  styleType = TokenCardStyleType.MEDIUM,
}: TokenCardsPlaceholderProps) => {
  const { isDesktop, isTablet, isWideScreen, isMobile } = useScreenSize();

  let totalSquares = 0;
  let totalSquaresX = 0; // Token quantity in X axis

  // We are getting X count as the LCM to fill the rows with empty cards correctly.
  isMobile
    ? ((totalSquares = mobileTotalSquares),
      mobileTotalSquares == 5 ? (totalSquaresX = 5) : (totalSquaresX = 3))
    : isWideScreen
    ? ((totalSquares = wideScreenTotalSquares),
      wideScreenTotalSquares == 10 ? (totalSquaresX = 5) : (totalSquaresX = 6))
    : isDesktop
    ? ((totalSquares = desktopTotalSquares),
      desktopTotalSquares == 8 ? (totalSquaresX = 4) : (totalSquaresX = 6))
    : isTablet &&
      ((totalSquares = tabletTotalSquares),
      tabletTotalSquares == 10 ? (totalSquaresX = 5) : (totalSquaresX = 6));

  const spareTokensX = totalCardsLength % totalSquaresX;
  const emptySquaresCountX = spareTokensX ? totalSquaresX - spareTokensX : 0;

  const spareTokens = totalSquares - totalCardsLength;
  const emptySquaresCount =
    emptySquaresCountX < spareTokens
      ? Math.max(spareTokens, 0)
      : emptySquaresCountX;

  return Array.from({ length: emptySquaresCount }, (_, index) => (
    <div key={`empty-${index}`} className={TokenSizeClassNames[styleType]} />
  ));
};
