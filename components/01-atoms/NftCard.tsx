import { NFT } from "@/lib/client/constants";
import React, { useContext, useEffect, useState } from "react";
import { SwapContext } from ".";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { EthereumAddress } from "@/lib/shared/types";
import cc from "classcat";

interface INftCard {
  nftData: NFT;
  ownerAddress: string | null;
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

export const NftCard = ({
  nftData,
  ownerAddress,
  withSelectionValidation = true,
}: INftCard) => {
  if (!nftData || !nftData.id || !nftData.contract || !ownerAddress)
    return null;

  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { setNftAuthUser, setNftInputUser, nftAuthUser, nftInputUser } =
    useContext(SwapContext);

  const setNftAsActiveOne = () => {
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
  };

  const [currentNftIsSelected, setCurrentNftIsSelected] = useState(false);
  useEffect(() => {
    const currentNftIsFromAuthedUser = authenticatedUserAddress?.equals(
      new EthereumAddress(ownerAddress)
    );

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

  return (
    <button
      onClick={setNftAsActiveOne}
      className={cc([
        "w-20 lg:w-28 h-20 lg:h-28 relative rounded border-2 border-[#E0E0E0] flex flex-col justify-center items-center",
        {
          "border-[#b1ca37]": currentNftIsSelected && withSelectionValidation,
        },
      ])}
    >
      {currentNftIsSelected && withSelectionValidation && (
        <div className="absolute left-0 top-0 w-full h-full bg-[#b1ca37] opacity-50 z-20"></div>
      )}
      {nftData.metadata?.image ? (
        <img
          src={nftData.metadata?.image}
          alt={nftData.metadata?.name}
          className="static z-10"
        />
      ) : nftData.metadata?.name ? (
        <div className="text-center text-[10px] mt-2 font-medium max-h-[40px] oveflow-y-scroll">
          {nftData.metadata?.name}
        </div>
      ) : null}
    </button>
  );
};
