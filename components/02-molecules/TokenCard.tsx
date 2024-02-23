/* eslint-disable react-hooks/exhaustive-deps */
import { getTokenName } from "@/lib/client/tokens";
import { SwapContext } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import {
  ERC20,
  ERC721,
  EthereumAddress,
  Token,
  TokenType,
} from "@/lib/shared/types";
import React, { useContext, useEffect, useState } from "react";
import cc from "classcat";
import toast from "react-hot-toast";

interface TokenCardProps {
  tokenData: Token;
  ownerAddress: string | null;
  onClickAction?: NftCardActionType;
  withSelectionValidation?: boolean;
  styleType?: StyleVariant;
}

/**
 *
 * This component receives the data of an nft and create a card NFT
 * @param tokenData
 * @param ownerAddress
 *
 * @returns TokenCard
 */

export enum NftCardActionType {
  "SELECT_NFT_FOR_SWAP",
  "SHOW_NFT_DETAILS",
  "NFT_ONCLICK",
}

export enum NftCardStyleType {
  SMALL = "small",
  NORMAL = "normal",
  MEDIUM = "medium",
  LARGE = "large",
}

type StyleVariant = NftCardStyleType | "small" | "normal" | "medium" | "large";

const NftSizeClassNames = {
  [NftCardStyleType.SMALL]: "card-nft-small",
  [NftCardStyleType.NORMAL]: "card-nft-normal",
  [NftCardStyleType.MEDIUM]: "card-nft-medium",
  [NftCardStyleType.LARGE]: "card-nft-large",
};

export const TokenCard = ({
  tokenData,
  ownerAddress,
  withSelectionValidation = true,
  styleType = NftCardStyleType.NORMAL,
  onClickAction = NftCardActionType.SELECT_NFT_FOR_SWAP,
}: TokenCardProps) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const {
    setAuthenticatedUsedTokensList,
    setSearchedUserTokensList,
    authenticatedUserTokensList,
    searchedUserTokensList,
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
        }
        if ((tokenData as ERC20).id) {
          displayableData.id = (tokenData as ERC20).id as string;
        }
      case TokenType.ERC721:
        if ((tokenData as ERC721).metadata?.image) {
          displayableData.image = (tokenData as ERC721).metadata
            ?.image as string;
        }
        if ((tokenData as ERC721).id) {
          displayableData.id = (tokenData as ERC721).id as string;
        }
    }

    setDisplayableData(displayableData);
  }, [tokenData]);

  useEffect(() => {
    const currentNftIsFromAuthedUser = ownerAddress
      ? authenticatedUserAddress?.equals(new EthereumAddress(ownerAddress))
      : false;

    if (currentNftIsFromAuthedUser) {
      setCurrentNftIsSelected(
        authenticatedUserTokensList.some(
          (selectedNft) => selectedNft.id === tokenData.id,
        ),
      );
    } else {
      setCurrentNftIsSelected(
        searchedUserTokensList.some(
          (selectedNft) => selectedNft.id === tokenData.id,
        ),
      );
    }
  }, [
    authenticatedUserAddress,
    authenticatedUserTokensList,
    searchedUserTokensList,
    ownerAddress,
    tokenData,
  ]);

  useEffect(() => {
    setCouldntLoadNftImage(false);
  }, [tokenData]);

  const setNftAsActiveOne = () => {
    if (
      onClickAction === NftCardActionType.SELECT_NFT_FOR_SWAP &&
      ownerAddress
    ) {
      const ownerEthAddress = new EthereumAddress(ownerAddress);

      if (authenticatedUserAddress?.equals(ownerEthAddress)) {
        const isSelected = authenticatedUserTokensList.some(
          (selectedNft) => selectedNft.id === tokenData.id,
        );

        if (isSelected) {
          setAuthenticatedUsedTokensList((prevNftAuthUser) =>
            prevNftAuthUser.filter(
              (selectedNft) => selectedNft.id !== tokenData.id,
            ),
          );
        } else {
          setAuthenticatedUsedTokensList((prevNftAuthUser) => [
            ...prevNftAuthUser,
            tokenData,
          ]);
        }
      } else {
        const isSelected = searchedUserTokensList.some(
          (selectedNft) => selectedNft.id === tokenData.id,
        );

        if (isSelected) {
          setSearchedUserTokensList((prevNftInputUser) =>
            prevNftInputUser.filter(
              (selectedNft) => selectedNft.id !== tokenData.id,
            ),
          );
        } else {
          setSearchedUserTokensList((prevNftInputUser) => [
            ...prevNftInputUser,
            tokenData,
          ]);
        }
      }
    } else if (onClickAction === NftCardActionType.SHOW_NFT_DETAILS) {
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
        onClick={setNftAsActiveOne}
        className={cc([
          NftSizeClassNames[styleType],
          {
            "border-green-500": currentNftIsSelected && withSelectionValidation,
          },
        ])}
      >
        {currentNftIsSelected && withSelectionValidation && (
          <div className="absolute left-0 top-0 w-full h-full bg-green-500 rounded-xl opacity-50 z-20"></div>
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
          className="text-center static z-10 w-full overflow-y-auto rounded-xl"
        />,
      )}
    </>
  ) : (
    <>
      {ButtonLayout(
        <div className="flex justify-center items-center w-full h-full text-[10px] font-medium oveflow-y-scroll break-all">
          {getTokenName(tokenData)}
        </div>,
      )}
    </>
  );
};
