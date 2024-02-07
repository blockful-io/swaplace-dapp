/* eslint-disable react-hooks/exhaustive-deps */
import { SwapContext } from "../01-atoms";
import { NFT } from "@/lib/client/constants";
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
}

export const NftCard = ({
  nftData,
  ownerAddress,
  withSelectionValidation = true,
  onClickAction = NftCardActionType.SELECT_NFT_FOR_SWAP,
}: INftCard) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { setNftAuthUser, setNftInputUser, nftAuthUser, nftInputUser } =
    useContext(SwapContext);
  const [couldntLoadNftImage, setCouldntLoadNftImage] = useState(false);
  const [currentNftIsSelected, setCurrentNftIsSelected] = useState(false);

  useEffect(() => {
    setCouldntLoadNftImage(false);
  }, [nftData]);

  useEffect(() => {
    const currentNftIsFromAuthedUser = ownerAddress
      ? authenticatedUserAddress?.equals(new EthereumAddress(ownerAddress))
      : null;

    if (currentNftIsFromAuthedUser) {
      if (nftAuthUser.length) {
        setCurrentNftIsSelected(nftAuthUser[0].id === nftData.id);
      } else {
        setCurrentNftIsSelected(false);
      }
    } else {
      if (nftInputUser.length) {
        setCurrentNftIsSelected(nftInputUser[0].id === nftData.id);
      } else {
        setCurrentNftIsSelected(false);
      }
    }
  }, [authenticatedUserAddress, ownerAddress, nftAuthUser, nftInputUser]);

  if (!nftData || !nftData.id || !nftData.contract || !ownerAddress)
    return null;

  const setNftAsActiveOne = () => {
    if (onClickAction === NftCardActionType.SELECT_NFT_FOR_SWAP) {
      const ownerEthAddress = new EthereumAddress(ownerAddress);

      if (authenticatedUserAddress?.equals(ownerEthAddress)) {
        if (nftAuthUser.length) {
          if (nftAuthUser[0].id === nftData.id) setNftAuthUser([]);
          else setNftAuthUser([nftData]);
        } else {
          setNftAuthUser([nftData]);
        }
      } else {
        if (nftInputUser.length) {
          if (nftInputUser[0].id === nftData.id) setNftInputUser([]);
          else setNftInputUser([nftData]);
        } else {
          setNftInputUser([nftData]);
        }
      }
    } else if (onClickAction === NftCardActionType.SHOW_NFT_DETAILS) {
      navigator.clipboard.writeText(JSON.stringify(nftData));
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
          "mx-auto w-24 h-24 md:h-28 md:w-28 relative rounded border-2 border-[#E0E0E0] bg-[#E0E0E0] flex flex-col justify-center items-center",
          {
            "border-green-500": currentNftIsSelected && withSelectionValidation,
          },
        ])}
      >
        {currentNftIsSelected && withSelectionValidation && (
          <div className="absolute left-0 top-0 w-full h-full bg-green-500 opacity-50 z-20"></div>
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
          className="static z-10 w-full overflow-y-auto"
        />
      )}
    </>
  ) : nftData.metadata?.name ? (
    <>
      {ButtonLayout(
        <div className="text-center text-[10px] mt-2 font-medium max-h-[40px] oveflow-y-scroll">
          {nftData.metadata?.name}
        </div>
      )}
    </>
  ) : nftData.contract.name && nftData.id.tokenId ? (
    <>
      {ButtonLayout(
        <div className="text-center text-[10px] mt-2 font-medium max-h-[40px] oveflow-y-scroll">
          {nftData.metadata?.name}
        </div>
      )}
    </>
  ) : null;
};
