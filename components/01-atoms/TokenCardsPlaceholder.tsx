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
  confirmationModalTotalSquares?: number;
  styleType?: TokenCardStyleType;
}

/// @dev Some shelfs will have more lines than others, even it's line is fully empty, preserving the design aspects.
/// And other shelfs will have single lines. But both of the mentioned cases will work while scaling the grid to handle more items.
export const TokenCardsPlaceholder = ({
  totalCardsLength,
  wideScreenTotalSquares = 24,
  desktopTotalSquares = 24,
  tabletTotalSquares = 24,
  mobileTotalSquares = 15,
  confirmationModalTotalSquares = 0, // 0 for turning off as default, 1 or more for total squares
  styleType = TokenCardStyleType.MEDIUM,
}: TokenCardsPlaceholderProps) => {
  const { isDesktop, isTablet, isWideScreen, isMobile } = useScreenSize();

  let totalSquares = 0;
  let totalSquaresX = 0; // Token quantity in X axis

  // !IMPORTANT: We assume the values passed as arguments are defined in the design and using random values might break
  // Confirmation modal will always have 1 row in the grid with the amount of columns passed
  // on `confirmationModalTotalSquares` and expand if needed respecting the max columns given.
  confirmationModalTotalSquares > 0
    ? ((totalSquares = confirmationModalTotalSquares),
      (totalSquaresX = confirmationModalTotalSquares))
    : isMobile
    ? // For the rest of the cases, we need to have a determined amount of rows and columns to fill the design.
      // The LCM (Least Common Multiple) is used to find the common multiple to determine the amount of empty squares needed.
      ((totalSquares = mobileTotalSquares),
      // If the totalSquares matches the hardcoded maxium amount of columns, we set total squares on the X axis to the LCM
      // hardcoded value. Otherwise, we set the default total squares on the X axis to 6 for all screen sizes and 3 for mobile.
      // We have to do this approachbecause the `OfferSummar.tsx` component has an specific design that don't match the others.
      mobileTotalSquares == 5 ? (totalSquaresX = 5) : (totalSquaresX = 3))
    : isWideScreen
    ? ((totalSquares = wideScreenTotalSquares),
      wideScreenTotalSquares == 10 ? (totalSquaresX = 5) : (totalSquaresX = 6))
    : isDesktop
    ? ((totalSquares = desktopTotalSquares),
      desktopTotalSquares == 6 ? (totalSquaresX = 3) : (totalSquaresX = 3))
    : isTablet &&
      ((totalSquares = tabletTotalSquares),
      tabletTotalSquares == 10 ? (totalSquaresX = 5) : (totalSquaresX = 6));

  // We calculate the the modulus to determine the amount of empty squares needed to fill the squares on the X axis.
  const spareTokensX = totalCardsLength % totalSquaresX;
  // If the modulus is 0 we don't need to add empty squares to the grid.
  // If the modulus is different than 0, the `emptySquaresCountX` will take the value of the empty squares needed to fill the row.
  const emptySquaresCountX = spareTokensX ? totalSquaresX - spareTokensX : 0;
  // We calculate the total amount of empty squares needed to fill the entire grid.
  const spareTokens = totalSquares - totalCardsLength;
  // If the total amount of empty squares needed to fill the row is less than the amount of empty squares needed to fill the grid,
  // we set the `emptySquaresCount` to the amount of empty squares needed to fill the grid. Otherwise, we set the `emptySquaresCount`
  // to the total amount of empty squares needed to fill row.
  const emptySquaresCount =
    emptySquaresCountX < spareTokens ? spareTokens : emptySquaresCountX;

  return Array.from({ length: emptySquaresCount }, (_, index) => (
    <>
      <div key={`empty-${index}`} className={TokenSizeClassNames[styleType]} />
    </>
  ));
};
