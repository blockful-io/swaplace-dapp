import { SwapOfferInterface } from "../03-organisms/SwapOffers";
import {
  DoneIcon,
  OfferTag,
  SwapContext,
  ThreeDotsCardOffersOptions,
} from "@/components/01-atoms";
import { SwaplaceAbi } from "@/lib/client/abi";
import {
  ButtonClickPossibilities,
  packingData,
  toastBlockchainTxError,
} from "@/lib/client/blockchain-utils";
import { SWAPLACE_SMART_CONTRACT_ADDRESS } from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { fromTokensToAssets, getSwapConfig } from "@/lib/client/swap-utils";
import { SwapUserConfiguration, createSwap } from "@/lib/service/createSwap";
import { publicClient } from "@/lib/wallet/wallet-config";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { type WalletClient, getContract } from "viem";
import { useNetwork, useWalletClient } from "wagmi";

interface TokenOfferDetailsInterface {
  swap: SwapOfferInterface;
}

export const TokenOfferDetails = ({ swap }: TokenOfferDetailsInterface) => {
  // TODO: Create acceptSwap function
  const { timeDate, approvedTokensCount, updateSwapStep } =
    useContext(SwapContext);

  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const { authenticatedUserAddress } = useAuthenticatedUser();

  let chainId: number;
  let userWalletClient: WalletClient;

  const handleSwap = async () => {
    if (typeof chain?.id != "undefined" && walletClient != undefined) {
      chainId = chain?.id;
      userWalletClient = walletClient;
    } else {
      throw new Error("Chain ID is undefined");
    }

    if (!swap.bid.address) throw new Error("No Swap offer receiver is defined");

    // Franco TODO: Review this need
    const SwaplaceContract = getContract({
      address: SWAPLACE_SMART_CONTRACT_ADDRESS[chainId] as `0x${string}`,
      publicClient: publicClient({ chainId: chain.id }),
      abi: SwaplaceAbi,
    });

    const packedData = await packingData(
      SwaplaceContract,
      swap.bid.address,
      timeDate,
    );

    const authenticatedUserAssets = await fromTokensToAssets(swap.bid.tokens);
    const searchedUserAssets = await fromTokensToAssets(swap.ask.tokens);

    const swapConfig = await getSwapConfig(
      authenticatedUserAddress!,
      packedData,
      timeDate,
      authenticatedUserAssets,
      searchedUserAssets,
      chainId,
    );

    const configurations: SwapUserConfiguration = {
      walletClient: userWalletClient,
      chain: chainId,
    };

    try {
      if (approvedTokensCount) {
        const transactionReceipt = await createSwap(swapConfig, configurations);

        if (transactionReceipt != undefined) {
          toast.success("Successfully created swap offer!");
          updateSwapStep(ButtonClickPossibilities.NEXT_STEP);
        } else {
          toastBlockchainTxError("Create swap failed");
          updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);
        }
      } else {
        toast.error("You must approve the Tokens to Swap.");
        updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);
      }
    } catch (error) {
      toastBlockchainTxError(String(error));
      updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);
      console.error(error);
    }
  };

  const displayStatus = status;

  // TODO: Include status, owner and expiryDate
  return (
    <div className="flex w-full justify-between items-center py-2 px-3">
      <div>
        <ul className="flex p-small dark:!text-[#A3A9A5] items-center gap-2">
          {displayStatus && <OfferTag status={displayStatus} />}
          <li className="flex items-center gap-2">
            <div className=" w-1 h-1 bg-neutral-600 rounded-full shadow-inner" />
            Expires on {swap.expiryDate}
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 bg-neutral-600 rounded-full shadow-inner" />
            Created by {swap.ask.address?.getEllipsedAddress()}
          </li>
        </ul>
      </div>
      <div className="flex gap-2 justify-center items-center ">
        {authenticatedUserAddress?.address !== swap.ask.address?.address && (
          <div>
            <button
              onClick={handleSwap}
              className="disabled:pointer-events-none rounded-lg w-full h-[28px] shadow-tag bg-[#d8f035] py-1 px-3 items-center flex justify-center gap-2"
            >
              <DoneIcon className="text-[#181A19]" />
              <p className="p-medium-bold-variant-black">Accept</p>
            </button>
          </div>
        )}

        <ThreeDotsCardOffersOptions />
      </div>
    </div>
  );
};
