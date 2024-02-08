import { NFT } from "@/lib/client/constants";
import { SwapContext } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { EthereumAddress } from "@/lib/shared/types";
import React, { useContext, useEffect, useState } from "react";
import cc from "classcat";
import toast from "react-hot-toast";

interface INftCard {
  nftData: NFT;
  ownerAddress: string | null;
  onClickAction?: NftCardActionType;
  withSelectionValidation?: boolean;
  styleType?: NftCardStyleType;
}

/**
 *
 * This component receives the data of an nft and create a card NFT
 * @param nftData
 * @param ownerAddress
 *
 * @returns NftCard
 */

export enum NftCardActionType {
  "SELECT_NFT_FOR_SWAP",
  "SHOW_NFT_DETAILS",
  "NFT_ONCLICK",
}

export enum NftCardStyleType {
  "SMALL",
  "NORMAL",
  "LARGE",
}

export const NftCard = ({
  nftData,
  ownerAddress,
  withSelectionValidation = true,
  onClickAction = NftCardActionType.SELECT_NFT_FOR_SWAP,
  styleType,
}: INftCard) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { setNftAuthUser, setNftInputUser, nftAuthUser, nftInputUser } =
    useContext(SwapContext);
  const [currentNftIsSelected, setCurrentNftIsSelected] = useState(false);
  const [couldntLoadNftImage, setCouldntLoadNftImage] = useState(false);

  useEffect(() => {
    const currentNftIsFromAuthedUser = ownerAddress
      ? authenticatedUserAddress?.equals(new EthereumAddress(ownerAddress))
      : false;

    if (currentNftIsFromAuthedUser) {
      setCurrentNftIsSelected(
        nftAuthUser.some((selectedNft) => selectedNft.id === nftData.id),
      );
    } else {
      setCurrentNftIsSelected(
        nftInputUser.some((selectedNft) => selectedNft.id === nftData.id),
      );
    }
  }, [
    authenticatedUserAddress,
    ownerAddress,
    nftAuthUser,
    nftInputUser,
    nftData,
  ]);

  useEffect(() => {
    setCouldntLoadNftImage(false);
  }, [nftData]);

  if (!nftData || !nftData.id || !nftData.contract || !ownerAddress)
    return null;

  const setNftAsActiveOne = () => {
    if (onClickAction === NftCardActionType.SELECT_NFT_FOR_SWAP) {
      const ownerEthAddress = new EthereumAddress(ownerAddress);

      if (authenticatedUserAddress?.equals(ownerEthAddress)) {
        const isSelected = nftAuthUser.some(
          (selectedNft) => selectedNft.id === nftData.id,
        );

        if (isSelected) {
          setNftAuthUser((prevNftAuthUser) =>
            prevNftAuthUser.filter(
              (selectedNft) => selectedNft.id !== nftData.id,
            ),
          );
        } else {
          setNftAuthUser((prevNftAuthUser) => [...prevNftAuthUser, nftData]);
        }
      } else {
        const isSelected = nftInputUser.some(
          (selectedNft) => selectedNft.id === nftData.id,
        );

        if (isSelected) {
          setNftInputUser((prevNftInputUser) =>
            prevNftInputUser.filter(
              (selectedNft) => selectedNft.id !== nftData.id,
            ),
          );
        } else {
          setNftInputUser((prevNftInputUser) => [...prevNftInputUser, nftData]);
        }
      }
    } else if (onClickAction === NftCardActionType.SHOW_NFT_DETAILS) {
      navigator.clipboard.writeText(JSON.stringify(nftData));
      toast.success("NFT data copied to your clipboard");
    } else if (onClickAction === NftCardActionType.NFT_ONCLICK) {
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
          styleType === NftCardStyleType.SMALL
            ? "card-nft-small"
            : styleType === NftCardStyleType.LARGE
            ? "card-nft-large"
            : "card-nft",
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

  return nftData.metadata?.image && !couldntLoadNftImage ? (
    <>
      {ButtonLayout(
        <img
          onError={handleImageLoadError}
          src={nftData.metadata?.image}
          alt={nftData.metadata?.name}
          className="static z-10 w-full overflow-y-auto rounded-xl"
        />,
      )}
    </>
  ) : nftData.metadata?.name ? (
    <>
      {ButtonLayout(
        <div className="text-center text-[10px] mt-2 font-medium max-h-[40px] oveflow-y-scroll">
          {nftData.metadata?.name}
        </div>,
      )}
    </>
  ) : nftData.contract.name && nftData.id.tokenId ? (
    <>
      {ButtonLayout(
        <div className="text-center text-[10px] mt-2 font-medium max-h-[40px] oveflow-y-scroll">
          {nftData.metadata?.name}
        </div>,
      )}
    </>
  ) : nftData.contractMetadata?.name && nftData.id.tokenId ? (
    <>
      {ButtonLayout(
        <div className="text-center text-[10px] mt-2 font-medium max-h-[40px] oveflow-y-scroll ">
          {nftData.contractMetadata?.name}
        </div>,
      )}
    </>
  ) : null;
};
