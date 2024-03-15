/* eslint-disable react-hooks/exhaustive-deps */
import { SwapContext, SwaplaceIcon } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import {
  ERC20,
  ERC721,
  EthereumAddress,
  Token,
  TokenType,
} from "@/lib/shared/types";
import { getTokenName } from "@/lib/client/ui-utils";
import React, { useContext, useEffect, useState } from "react";
import cc from "classcat";
import toast from "react-hot-toast";

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

export const TokenCard = ({
  tokenData,
  ownerAddress,
  openTokenAmountSelectionModal,
  withSelectionValidation = true,
  displayERC20TokensAmount = false,
  styleType = TokenCardStyleType.NORMAL,
  onClickAction = TokenCardActionType.SELECT_TOKEN_FOR_SWAP,
}: TokenCardProps) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const {
    setAuthenticatedUserSelectedTokensList,
    setSearchedUserSelectedTokensList,
    authenticatedUserSelectedTokensList,
    searchedUserSelectedTokensList,
  } = useContext(SwapContext);
  const [currentNftIsSelected, setCurrentNftIsSelected] = useState(false);
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
          displayableData.image = (tokenData as ERC721).metadata
            ?.image as string;
        } else {
          displayableData.image = "";
        }
        if ((tokenData as ERC721).id) {
          displayableData.id = (tokenData as ERC721).id as string;
        }
    }

    setDisplayableData(displayableData);
  }, [tokenData]);

  useEffect(() => {
    const currentNftIsFromAuthedUser = ownerAddress
      ? authenticatedUserAddress?.equals(ownerAddress)
      : false;

    if (currentNftIsFromAuthedUser) {
      setCurrentNftIsSelected(
        authenticatedUserSelectedTokensList.some(
          (selectedNft) => selectedNft.id === tokenData.id,
        ),
      );
    } else {
      setCurrentNftIsSelected(
        searchedUserSelectedTokensList.some(
          (selectedNft) => selectedNft.id === tokenData.id,
        ),
      );
    }
  }, [
    authenticatedUserAddress,
    authenticatedUserSelectedTokensList,
    searchedUserSelectedTokensList,
    ownerAddress,
    tokenData,
  ]);

  const onCardClick = () => {
    if (
      onClickAction === TokenCardActionType.SELECT_TOKEN_FOR_SWAP &&
      ownerAddress
    ) {
      const ownerEthAddress = ownerAddress;

      if (authenticatedUserAddress?.equals(ownerEthAddress)) {
        const isSelected = authenticatedUserSelectedTokensList.some(
          (selectedNft) => selectedNft.id === tokenData.id,
        );

        if (isSelected) {
          setAuthenticatedUserSelectedTokensList((prevNftAuthUser) =>
            prevNftAuthUser.filter((selectedNft) => {
              return selectedNft.id !== tokenData.id;
            }),
          );
        } else {
          setAuthenticatedUserSelectedTokensList((prevNftAuthUser) => [
            ...prevNftAuthUser,
            tokenData,
          ]);

          if (tokenData.tokenType === TokenType.ERC20) {
            openTokenAmountSelectionModal?.(ownerEthAddress, tokenData);
          }
        }
      } else {
        const isSelected = searchedUserSelectedTokensList.some(
          (selectedNft) => selectedNft.id === tokenData.id,
        );

        if (isSelected) {
          setSearchedUserSelectedTokensList((prevNftInputUser) => {
            return prevNftInputUser.filter((selectedNft) => {
              return selectedNft.id !== tokenData.id;
            });
          });
        } else {
          setSearchedUserSelectedTokensList((prevNftInputUser) => [
            ...prevNftInputUser,
            tokenData,
          ]);

          if (tokenData.tokenType === TokenType.ERC20) {
            openTokenAmountSelectionModal?.(ownerEthAddress, tokenData);
          }
        }
      }
    } else if (onClickAction === TokenCardActionType.SHOW_NFT_DETAILS) {
      navigator.clipboard.writeText(JSON.stringify(tokenData));
      toast.success("NFT data copied to your clipboard");
    }
  };

  const handleImageLoadError = () => {
    setCouldntLoadNftImage(true);
  };

  const ButtonLayout = (children: React.ReactNode) => {
    return (
      <button
        onClick={onCardClick}
        className={cc([
          TokenSizeClassNames[styleType],
          {
            "border-green-500": currentNftIsSelected && withSelectionValidation,
            "cursor-auto": onClickAction === TokenCardActionType.NO_ACTION,
          },
        ])}
      >
        {currentNftIsSelected && withSelectionValidation && (
          <div className="flex items-end justify-end absolute bottom-0 right-0 w-full h-full rounded-xl z-20">
            <div className=" dark:bg-[#212322] bg-[#F6F6F6] translate-x-[1px] translate-y-[1px] p-1 rounded-tl-xl">
              <SwaplaceIcon className="text-[#AABE13] dark:text-[#DDF23D] w-4 h-4" />
            </div>
          </div>
        )}
        {children}
      </button>
    );
  };

  return tokenDisplayableData.image && !couldntLoadNftImage ? (
    <>
      {ButtonLayout(
        <img
          onError={handleImageLoadError}
          src={tokenDisplayableData.image}
          alt={getTokenName(tokenData)}
          className="text-center static z-10 w-full h-full overflow-y-auto rounded-xl"
        />,
      )}
    </>
  ) : (
    <>
      {ButtonLayout(
        <div className="flex justify-center items-center w-full h-full text-[10px] font-medium oveflow-y-scroll break-all">
          {getTokenName(tokenData, {
            withAmountPrefix: tokenData.tokenType === TokenType.ERC20,
            displayTokenAmount: displayERC20TokensAmount,
          })}
        </div>,
      )}
    </>
  );
};
