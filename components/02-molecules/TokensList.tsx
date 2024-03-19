import { TokensShelfVariant } from "@/components/03-organisms";
import {
  AddTokenCardManually,
  TokenAmountSelectionModal,
  TokenCard,
  TokenCardActionType,
  TokenCardStyleType,
} from "@/components/02-molecules";
import { TokenCardsPlaceholder } from "@/components/01-atoms";
import { ERC20, EthereumAddress, Token } from "@/lib/shared/types";
import { EMPTY_ERC_20_BALANCE } from "@/lib/client/blockchain-utils";
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
 * Renders a list of tokens associated with a user's account.
 *
 * This component allows users to view a list of tokens associated with a specific account.
 * It provides flexibility in displaying tokens based on various parameters and screen sizes.
 * Users can interact with individual tokens, including selecting tokens for swapping and viewing token amounts.
 * Additionally, the component supports the addition of custom styling and actions for token cards.
 *
 **/

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
  tokenCardClickAction = TokenCardActionType.SELECT_TOKEN_FOR_SWAP,
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

  /* Filter TokenList so that TokenCard receives the filtered array and does not display tokens with a zero balance on the screen */
  tokensList = tokensList.filter(
    (token) => (token as ERC20).rawBalance !== EMPTY_ERC_20_BALANCE,
  );

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
