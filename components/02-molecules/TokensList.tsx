import { TokensShelfVariant } from "../03-organisms";
import { TokenCard } from "@/components/02-molecules";
import { SwapAddTokenCard, TokenCardsPlaceholder } from "@/components/01-atoms";
import { Token } from "@/lib/shared/types";

export interface TokensListProps {
  tokensList: Token[];
  ownerAddress: string | null;
  withAddTokenCard?: boolean;
  withSelectionValidation?: boolean;
  mobileTotalCards?: number;
  tabletTotalCards?: number;
  desktopTotalCards?: number;
  wideScreenTotalCards?: number;
  variant: TokensShelfVariant;
}

/**
 *
 * This component receives the data of multiple tokens and create its cards
 * @param tokensList
 * @param ownerAddress
 *
 * @returns TokensList
 */

export const TokensList = ({
  tokensList,
  withAddTokenCard = true,
  withSelectionValidation = true,
  mobileTotalCards,
  tabletTotalCards,
  desktopTotalCards,
  wideScreenTotalCards,
  ownerAddress,
  variant,
}: TokensListProps) => {
  const placeholders = TokenCardsPlaceholder(
    tokensList.length,
    mobileTotalCards,
    tabletTotalCards,
    desktopTotalCards,
    wideScreenTotalCards,
  );
  const tokenCards = tokensList.map((token: Token, index) => (
    <div key={`nft-${index}`}>
      <TokenCard
        withSelectionValidation={withSelectionValidation}
        ownerAddress={ownerAddress}
        tokenData={token}
      />
    </div>
  ));

  let allSquares = [...tokenCards, ...placeholders];

  const addTokenSquare = withAddTokenCard ? SwapAddTokenCard() : <></>;

  if (variant === TokensShelfVariant.Your) {
    placeholders.pop(); // Removes the last element to fill with addToken
    allSquares = [...allSquares, addTokenSquare];
    return (
      <div className="w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3 py-6 xl:px-4">
        {allSquares}
      </div>
    );
  } else {
    return (
      <div className="w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3 py-6 xl:px-4">
        {allSquares}
      </div>
    );
  }
};
