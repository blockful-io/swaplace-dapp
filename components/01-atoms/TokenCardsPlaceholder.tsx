/* eslint-disable react-hooks/exhaustive-deps */
import {
  TokenCardStyleType,
  TokenSizeClassNames,
} from "@/components/02-molecules";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";
import { useEffect, useState } from "react";

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
  wideScreenTotalSquares = 15,
  desktopTotalSquares = 30,
  tabletTotalSquares = 30,
  mobileTotalSquares = 30,
  styleType = TokenCardStyleType.MEDIUM,
}: TokenCardsPlaceholderProps) => {
  const { isDesktop, isTablet, isWideScreen, isMobile } = useScreenSize();

  const [totalSquares, setTotalSquares] = useState(0);
  const [totalSquaresX, setTotalSquaresX] = useState(0);

  // We are getting X count as the LCM to fill the rows with empty cards correctly.
  const [spareTokensX, setSpareTokensX] = useState(0);
  const [spareTokens, setSpareTokens] = useState(0);
  const [emptySquaresCount, setEmptySquaresCount] = useState(0);
  const [emptySquaresCountX, setEmptySquaresCountX] = useState(0);

  const resetTokenCards = () => {
    isWideScreen
      ? (setTotalSquares(wideScreenTotalSquares),
        wideScreenTotalSquares == 8 ? setTotalSquares(4) : setTotalSquaresX(6))
      : isDesktop
      ? (setTotalSquares(desktopTotalSquares), setTotalSquaresX(6))
      : isTablet
      ? (setTotalSquares(tabletTotalSquares), setTotalSquaresX(6))
      : isMobile &&
        (setTotalSquares(mobileTotalSquares),
        mobileTotalSquares == 4 ? setTotalSquaresX(4) : setTotalSquaresX(3));

    setSpareTokens(totalSquares - totalCardsLength);
    setSpareTokensX(totalCardsLength % totalSquaresX);
    setEmptySquaresCount(
      emptySquaresCountX < spareTokens
        ? Math.max(spareTokens, 0)
        : emptySquaresCountX,
    );
    setEmptySquaresCountX(spareTokensX ? totalSquaresX - spareTokensX : 0);
  };

  useEffect(() => {
    resetTokenCards();

    window.addEventListener("resize", resetTokenCards);

    return () => {
      window.removeEventListener("resize", resetTokenCards);
    };
  }, []);

  useEffect(() => {
    resetTokenCards();
  }, [
    mobileTotalSquares,
    tabletTotalSquares,
    desktopTotalSquares,
    wideScreenTotalSquares,
    totalCardsLength,
  ]);

  return Array.from({ length: emptySquaresCount }, (_, index) => (
    <>
      <div key={`empty-${index}`} className={TokenSizeClassNames[styleType]} />
    </>
  ));
};
