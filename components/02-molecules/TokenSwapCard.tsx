/* eslint-disable react-hooks/exhaustive-deps */
import {
  ERC20,
  ERC721,
  EthereumAddress,
  Token,
  TokenType,
} from "@/lib/shared/types";
import { getTokenName } from "@/lib/client/ui-utils";
import React, { useEffect, useState } from "react";
import cc from "classcat";

interface TokenCardProps {
  tokenData: Token;
  ownerAddress: EthereumAddress | null;
  openTokenAmountSelectionModal?: (
    owner: EthereumAddress,
    token: Token,
  ) => void;
  onClickAction?: TokenCardActionType;

  /* 
    When true, instead of displaying an ERC20 Token balance
    the TokenCard will display the ERC20 Token amount 
    selected by the user for the swap transaction
  */
  displayERC20TokensAmount?: boolean;
  withSelectionValidation?: boolean;
  styleType?: StyleVariant;
}

export enum TokenCardActionType {
  "SELECT_TOKEN_FOR_SWAP",
  "APPROVE_TOKEN_SWAP",
  "SHOW_NFT_DETAILS",
  "NO_ACTION",
}

export enum TokenCardStyleType {
  SMALL = "small",
  NORMAL = "normal",
  MEDIUM = "medium",
  LARGE = "large",
}

type StyleVariant =
  | TokenCardStyleType
  | "small"
  | "normal"
  | "medium"
  | "large";

export const TokenSizeClassNames = {
  [TokenCardStyleType.SMALL]: "card-token-small",
  [TokenCardStyleType.NORMAL]: "card-token-normal",
  [TokenCardStyleType.MEDIUM]: "card-token-medium",
  [TokenCardStyleType.LARGE]: "card-token-large",
};

/**
 * TokenCard Component
 *
 * This component is responsible for rendering and interacting with a token card.
 * It supports features such as displaying token information, handling user interaction,
 * and triggering actions based on different scenarios.
 *
 * @param tokenData - Data representing the token, including its type, ID, and image.
 * @param ownerAddress - The address of the token owner.
 * @param openTokenAmountSelectionModal - Function to open a modal for selecting token amount.
 * @param withSelectionValidation - Flag indicating whether to validate token selection.
 * @param displayERC20TokensAmount - Flag indicating whether to display ERC20 token amounts.
 * @param styleType - Style type for the token card (e.g., normal).
 * @param onClickAction - Action type to be performed on token card click.
 */

export const TokenSwapCard = ({
  tokenData,
  displayERC20TokensAmount = false,
  styleType = TokenCardStyleType.NORMAL,
}: TokenCardProps) => {
  const [couldntLoadNftImage, setCouldntLoadNftImage] = useState(false);

  const [tokenDisplayableData, setDisplayableData] = useState({
    id: "",
    image: "",
  });

  useEffect(() => {
    const displayableData = { ...tokenDisplayableData };

    switch (tokenData.tokenType) {
      case TokenType.ERC20:
        if ((tokenData as ERC20).symbol) {
          displayableData.image = (tokenData as ERC20).symbol as string;
        } else {
          displayableData.image = "";
        }

        if ((tokenData as ERC20).id) {
          displayableData.id = (tokenData as ERC20).id as string;
        }
      case TokenType.ERC721:
        if ((tokenData as ERC721).metadata?.image) {
          displayableData.image = (tokenData as ERC721).metadata?.image
            .originalUrl as string;
        } else {
          displayableData.image = "";
        }
        if ((tokenData as ERC721).id) {
          displayableData.id = (tokenData as ERC721).id as string;
        }
    }

    setDisplayableData(displayableData);
  }, [tokenData]);

  const handleImageLoadError = () => {
    setCouldntLoadNftImage(true);
  };

  const ButtonLayout = (children: React.ReactNode) => {
    return (
      <div className={cc([TokenSizeClassNames[styleType]])}>{children}</div>
    );
  };

  return tokenDisplayableData.image && !couldntLoadNftImage ? (
    <>
      {ButtonLayout(
        <img
          onError={handleImageLoadError}
          src={tokenDisplayableData.image}
          alt={getTokenName(tokenData)}
          className="dark:text-[#707572] text-[#707572] text-center static z-10 w-full h-full overflow-y-auto rounded-xl"
        />,
      )}
    </>
  ) : (
    <>
      {ButtonLayout(
        <div className="dark:text-[#707572] text-[#707572] flex justify-center items-center w-full h-full text-[10px] font-medium oveflow-y-scroll break-all">
          {getTokenName(tokenData, {
            withAmountPrefix: tokenData.tokenType === TokenType.ERC20,
            displayTokenAmount: displayERC20TokensAmount,
          })}
        </div>,
      )}
    </>
  );
};
