/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import {
  SwapModalLayout,
  SwapContext,
  ApprovedTokenCards,
  SwapModalButton,
  ButtonVariant,
  OfferExpiryConfirmSwap,
} from "@/components/01-atoms";
import { ProgressStatus } from "@/components/02-molecules";
import { SwapUserConfiguration, createSwap } from "@/lib/service/createSwap";
import {
  ButtonClickPossibilities,
  packingData,
  toastBlockchainTxError,
} from "@/lib/client/blockchain-utils";
import { CreateTokenOffer } from "@/components/03-organisms";
import { fromTokensToAssets, getSwapConfig } from "@/lib/client/swap-utils";
import { SWAPLACE_SMART_CONTRACT_ADDRESS } from "@/lib/client/constants";
import { publicClient } from "@/lib/wallet/wallet-config";
import { SwapModalSteps } from "@/lib/client/ui-utils";
import { SwaplaceAbi } from "@/lib/client/abi";
import { EthereumAddress } from "@/lib/shared/types";
import { type WalletClient, useNetwork, useWalletClient } from "wagmi";
import { useContext, useEffect } from "react";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import { getContract } from "viem";

interface ConfirmSwapApprovalModalProps {
  open: boolean;
  onClose: () => void;
}

export const ConfirmSwapModal = ({
  open,
  onClose,
}: ConfirmSwapApprovalModalProps) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const {
    timeDate,
    authenticatedUserTokensList,
    searchedUserTokensList,
    approvedTokensCount,
    validatedAddressToSwap,
    currentSwapModalStep,
    updateSwapStep,
    clearSwapData,
  } = useContext(SwapContext);

  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const { theme } = useTheme();

  useEffect(() => {
    if (currentSwapModalStep === SwapModalSteps.CREATING_SWAP) {
      handleSwap();
    }
  }, [currentSwapModalStep]);

  useEffect(() => {
    if (!open) {
      updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);
    }
  }, [open]);

  useEffect(() => {
    updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);
  }, [authenticatedUserTokensList]);

  if (
    (!authenticatedUserAddress?.address ||
      !searchedUserTokensList ||
      !authenticatedUserTokensList) &&
    open
  ) {
    onClose();
    return null;
  }

  let chainId: number;
  let userWalletClient: WalletClient;

  const handleSwap = async () => {
    if (typeof chain?.id != "undefined" && walletClient != undefined) {
      chainId = chain?.id;
      userWalletClient = walletClient;
    } else {
      throw new Error("Chain ID is undefined");
    }

    if (!validatedAddressToSwap)
      throw new Error("No Swap offer receiver is defined");

    // Franco TODO: Review this need
    const SwaplaceContract = getContract({
      address: SWAPLACE_SMART_CONTRACT_ADDRESS[chainId] as `0x${string}`,
      publicClient: publicClient({ chainId: chain.id }),
      abi: SwaplaceAbi,
    });
    const packedData = await packingData(
      SwaplaceContract,
      validatedAddressToSwap,
      timeDate,
    );

    const authenticatedUserAssets = await fromTokensToAssets(
      authenticatedUserTokensList,
    );
    const searchedUserAssets = await fromTokensToAssets(searchedUserTokensList);

    const swapConfig = await getSwapConfig(
      new EthereumAddress(userWalletClient.account.address),
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

  const validateTokensAreApproved = () => {
    if (approvedTokensCount) {
      if (currentSwapModalStep === SwapModalSteps.APPROVE_TOKENS) {
        updateSwapStep(ButtonClickPossibilities.NEXT_STEP);
      }
    } else {
      toast.error("You must approve the Tokens to Swap.");
    }
  };

  const ConfirmSwapModalStep: Partial<Record<SwapModalSteps, JSX.Element>> = {
    [SwapModalSteps.APPROVE_TOKENS]: (
      <SwapModalLayout
        toggleCloseButton={{ open: open, onClose: onClose }}
        text={{
          title: "Swap offer confirmation",
          description:
            "Before sending your offer, please approve the assets you want to trade by clicking on them.",
        }}
        body={<ApprovedTokenCards />}
        footer={
          <div className="flex w-full justify-between items-center">
            <ProgressStatus />
            <SwapModalButton
              label={"Continue"}
              disabled={
                approvedTokensCount !== authenticatedUserTokensList.length
              }
              onClick={validateTokensAreApproved}
              aditionalStyle={theme === "light" ? "text-black" : "text-yellow"}
            />
          </div>
        }
      />
    ),
    [SwapModalSteps.CREATE_SWAP]: (
      <SwapModalLayout
        toggleCloseButton={{ open: open, onClose: onClose }}
        text={{
          title: "Swap offer confirmation",
          description: "Please review your final proposal.",
        }}
        body={
          <div className="flex flex-col gap-2 flex-grow">
            <OfferExpiryConfirmSwap expireTime={"3 weeks"} />
            <CreateTokenOffer />
          </div>
        }
        footer={
          <div className="flex w-full justify-end gap-3">
            <SwapModalButton
              label={"Back"}
              variant={ButtonVariant.ALTERNATIVE}
              onClick={() => {
                updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);
              }}
            />

            <SwapModalButton
              label={"Confirm and send"}
              disabled={!approvedTokensCount}
              variant={ButtonVariant.SECONDARY}
              onClick={() => {
                updateSwapStep(ButtonClickPossibilities.NEXT_STEP);
              }}
            />
          </div>
        }
      />
    ),
    [SwapModalSteps.CREATING_SWAP]: (
      <SwapModalLayout
        toggleCloseButton={{ open: open, onClose: onClose }}
        text={{
          title: "Swap offer confirmation",
          description: "Please review your final proposal.",
        }}
        body={
          <div className="flex flex-col gap-2 flex-grow">
            <OfferExpiryConfirmSwap expireTime={"3 weeks"} />
            <CreateTokenOffer />
          </div>
        }
        footer={
          <div className="flex w-full justify-end gap-3">
            <SwapModalButton
              label={"Waiting wallet approval..."}
              variant={ButtonVariant.SECONDARY}
              disabled={true}
              isLoading={true}
            />
          </div>
        }
      />
    ),
    [SwapModalSteps.CREATED_SWAP]: (
      <SwapModalLayout
        toggleCloseButton={{ open: open, onClose: onClose }}
        text={{
          title: "Swap offer confirmed!",
          description: "Congrats, your swap offer was submitted.",
        }}
        body={
          <div className="flex flex-col gap-2 flex-grow">
            <OfferExpiryConfirmSwap expireTime={"3 weeks"} />
            <CreateTokenOffer />
          </div>
        }
        footer={
          <div className="flex w-full justify-end gap-3">
            <SwapModalButton
              label={"Close"}
              variant={ButtonVariant.SECONDARY}
              onClick={() => {
                clearSwapData();
                onClose();
              }}
            />
          </div>
        }
      />
    ),
  };

  return ConfirmSwapModalStep[currentSwapModalStep];
};
