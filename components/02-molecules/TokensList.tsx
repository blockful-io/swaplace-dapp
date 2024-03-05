import { TokensShelfVariant } from "../03-organisms";
import { TokenAmountSelectionModal } from "../01-atoms/TokenAmountSelectionModal";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { toastBlockchainTxError } from "@/lib/client/blockchain-utils";
import {
  TokenCard,
  TokenCardActionType,
  TokenCardStyleType,
} from "@/components/02-molecules";
import {
  SwapAddTokenCard,
  SwapContext,
  TokenCardsPlaceholder,
} from "@/components/01-atoms";
import { ERC20, EthereumAddress, Token } from "@/lib/shared/types";
import { useContext, useState } from "react";

export interface TokensListProps {
  tokensList: Token[];
  ownerAddress: EthereumAddress | null;
  withPlaceholders?: boolean;
  withAddTokenCard?: boolean;
  withSelectionValidation?: boolean;
  mobileTotalCards?: number;
  tabletTotalCards?: number;
  desktopTotalCards?: number;
  wideScreenTotalCards?: number;
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
  withPlaceholders = true,
  withAddTokenCard = true,
  withSelectionValidation = true,
  mobileTotalCards,
  tabletTotalCards,
  desktopTotalCards,
  wideScreenTotalCards,
  ownerAddress,
  variant = TokensShelfVariant.Your,
  tokenCardStyleType = TokenCardStyleType.NORMAL,
  tokenCardClickAction = TokenCardActionType.SELECT_NFT_FOR_SWAP,
  gridClassNames = "w-full grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3",
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

  const placeholders = withPlaceholders
    ? TokenCardsPlaceholder(
        tokensList.length,
        mobileTotalCards,
        tabletTotalCards,
        desktopTotalCards,
        wideScreenTotalCards,
      )
    : [<></>];
  const tokenCards = tokensList.map((token: Token, index) => (
    <div key={`nft-${index}`}>
      <TokenCard
        styleType={tokenCardStyleType}
        onClickAction={tokenCardClickAction}
        openTokenAmountSelectionModal={openTokenAmountSelectionModal}
        withSelectionValidation={withSelectionValidation}
        ownerAddress={ownerAddress}
        tokenData={token}
      />
    </div>
  ));

  const { authenticatedUserAddress } = useAuthenticatedUser();
  const {
    authenticatedUserTokensList,
    searchedUserTokensList,
    setAuthenticatedUserTokensList,
    setSearchedUserTokensList,
  } = useContext(SwapContext);

  const closeAmountSelectionModal = (amount: null | string) => {
    if (!selectTokenAmountOf || !selectTokenAmountFor) {
      toastBlockchainTxError(
        "No token or token's owner selected to set amount for.",
      );
      throw new Error("No token or token's owner selected to set amount for.");
    }

    const tokenOwnerIsAuthedUser =
      authenticatedUserAddress?.equals(selectTokenAmountOf);

    let originalTokensList: Token[];
    if (tokenOwnerIsAuthedUser) {
      originalTokensList = [...authenticatedUserTokensList];
    } else {
      originalTokensList = [...searchedUserTokensList];
    }

    originalTokensList.map((token) => {
      if (
        amount &&
        Number(amount) !== 0 &&
        token.contract === selectTokenAmountFor.contract
      ) {
        (token as ERC20).rawBalance = amount;
      } else if (!amount || Number(amount) === 0) {
        originalTokensList = originalTokensList.filter(
          (token) => token.contract !== selectTokenAmountFor.contract,
        );
      }
    });

    if (tokenOwnerIsAuthedUser) {
      setAuthenticatedUserTokensList(originalTokensList);
    } else {
      setSearchedUserTokensList(originalTokensList);
    }

    setSelectTokenAmountFor(null);
    setSelectTokenAmountOf(null);
  };

  let allSquares = [...tokenCards, ...placeholders];

  const addTokenSquare = withAddTokenCard ? SwapAddTokenCard() : <></>;

  if (variant === TokensShelfVariant.Your) {
    placeholders.pop(); // Removes the last element to fill with addToken
    allSquares = [...allSquares, addTokenSquare];
    return (
      <div className={gridClassNames}>
        {allSquares}
        <TokenAmountSelectionModal
          owner={selectTokenAmountOf}
          token={selectTokenAmountFor}
          onCloseModal={closeAmountSelectionModal}
        />
      </div>
    );
  } else {
    return <div className={gridClassNames}>{allSquares}</div>;
  }
};
