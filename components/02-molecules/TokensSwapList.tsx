import { TokenSwapCard } from "./TokenSwapCard";
import { TokensShelfVariant } from "@/components/03-organisms";
import {
  TokenCardActionType,
  TokenCardStyleType,
} from "@/components/02-molecules";
import { ERC20, EthereumAddress, Token } from "@/lib/shared/types";
import { EMPTY_ERC_20_BALANCE } from "@/lib/client/blockchain-utils";

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

export const TokensSwapList = ({
  tokensList,
  ownerAddress,
  withSelectionValidation = true,
  displayERC20TokensAmount = false,
  tokenCardStyleType = TokenCardStyleType.NORMAL,
  gridClassNames = "w-full grid grid-cols-3 md:grid-cols-6  lg:grid-cols-4 gap-3",
}: TokensListProps) => {
  /* Filter TokenList so that TokenCard receives the filtered array and does not display tokens with a zero balance on the screen */
  tokensList = tokensList.filter(
    (token) => (token as ERC20).rawBalance !== EMPTY_ERC_20_BALANCE,
  );

  const EmptySquare = () => {
    return <div key={`empty-1`} className={TokenCardStyleType.NORMAL} />;
  };

  const placeholders = Array.from(
    { length: 4 - (tokensList.length % 4) },
    (_, index) => <div key={index} className="card-token-medium" />,
  );

  const tokenCards = tokensList.map((token: Token, index) => (
    <div key={`token-${index}`}>
      <TokenSwapCard
        styleType={tokenCardStyleType}
        displayERC20TokensAmount={displayERC20TokensAmount}
        withSelectionValidation={withSelectionValidation}
        ownerAddress={ownerAddress}
        tokenData={token}
      />
    </div>
  ));

  const allSquares = [...tokenCards, ...placeholders];

  return (
    <div className={gridClassNames}>
      {allSquares}
      <EmptySquare />
    </div>
  );
};
