import { TokensShelfVariant } from "@/components/03-organisms";
import {
  AddTokenCardManually,
  TokenAmountSelectionModal,
  TokenCard,
  TokenCardActionType,
  TokenCardStyleType,
} from "@/components/02-molecules";
import { TokenCardsPlaceholder } from "@/components/01-atoms";
import { EthereumAddress, Token } from "@/lib/shared/types";
import { useState } from "react";

export interface TokensListProps {
  tokensList: Token[];
  ownerAddress: EthereumAddress | null;
  withSelectionValidation?: boolean;
  withPlaceholders?: boolean;
  withAddTokenCard?: boolean;
  mobileTotalCards?: number;
  tabletTotalCards?: number;
  desktopTotalCards?: number;
  wideScreenTotalCards?: number;

  /* 
    When true, instead of displaying an ERC20 Token balance
    the TokenCard will display the ERC20 Token amount 
    selected by the user for the swap transaction
  */
  displayERC20TokensAmount?: boolean;
  tokenCardStyleType?: TokenCardStyleType;
  tokenCardClickAction?: TokenCardActionType;
  variant: TokensShelfVariant;
  gridClassNames?: string;
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
  ownerAddress,
  mobileTotalCards,
  tabletTotalCards,
  desktopTotalCards,
  wideScreenTotalCards,
  withPlaceholders = true,
  withAddTokenCard = true,
  withSelectionValidation = true,
  displayERC20TokensAmount = false,
  variant = TokensShelfVariant.Your,
  tokenCardStyleType = TokenCardStyleType.NORMAL,
  tokenCardClickAction = TokenCardActionType.SELECT_NFT_FOR_SWAP,
  gridClassNames = "w-full h-full grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-3",
}: TokensListProps) => {
  const [selectTokenAmountOf, setSelectTokenAmountOf] =
    useState<EthereumAddress | null>(null);
  const [selectTokenAmountFor, setSelectTokenAmountFor] =
    useState<Token | null>(null);

  const openTokenAmountSelectionModal = (
    owner: EthereumAddress,
    token: Token,
  ) => {
    setSelectTokenAmountFor(token);
    setSelectTokenAmountOf(owner);
  };

  const onCloseModal = () => {
    setSelectTokenAmountFor(null);
    setSelectTokenAmountOf(null);
  };

  const placeholders = withPlaceholders
    ? TokenCardsPlaceholder({
        totalCardsLength: tokensList.length,
        mobileTotalSquares: mobileTotalCards,
        tabletTotalSquares: tabletTotalCards,
        desktopTotalSquares: desktopTotalCards,
        wideScreenTotalSquares: wideScreenTotalCards,
        styleType: tokenCardStyleType,
      })
    : [<></>];
  const tokenCards = tokensList.map((token: Token, index) => (
    <div key={`token-${index}`}>
      <TokenCard
        styleType={tokenCardStyleType}
        onClickAction={tokenCardClickAction}
        displayERC20TokensAmount={displayERC20TokensAmount}
        openTokenAmountSelectionModal={openTokenAmountSelectionModal}
        withSelectionValidation={withSelectionValidation}
        ownerAddress={ownerAddress}
        tokenData={token}
      />
    </div>
  ));

  let allSquares = [...tokenCards, ...placeholders];

  const addTokenSquare = withAddTokenCard ? AddTokenCardManually() : <></>;

  const Layout = (squares: React.JSX.Element[]) => {
    return (
      <div className={gridClassNames}>
        {squares}
        <TokenAmountSelectionModal
          owner={selectTokenAmountOf}
          token={selectTokenAmountFor}
          onCloseModal={onCloseModal}
        />
      </div>
    );
  };

  if (variant === TokensShelfVariant.Your) {
    placeholders.pop(); // Removes the last element to fill with addToken
    allSquares = [...allSquares, addTokenSquare];
    return Layout(allSquares);
  }
  return Layout(allSquares);
};
