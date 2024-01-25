import { useContext, useEffect, useState } from "react";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useNetwork, useWalletClient } from "wagmi";
import { SwapContext } from "@/components/01-atoms";
import { createSwap } from "@/lib/service/createSwap";
import {
  ButtonClickPossibilities,
  ComposeNftSwap,
  ICreateSwap,
  SwapModalSteps,
  TransactionStatus,
} from "@/lib/client/blockchain-data";
import toast from "react-hot-toast";
import { NftsCardApprovedList } from "../01-atoms/NftsCardApprovedList";
import { updateNftsToSwapApprovalStatus } from "@/lib/client/swap-utils";
import { ProgressStatus } from "./ProgressStatus";
import { SwapModalLayout } from "../01-atoms/SwapModalLayout";
import { ButtonVariant, GenericButton } from "../01-atoms/GenericButton";
import { useTheme } from "next-themes";

export enum TransactionResult {
  "LOADING" = "LOADING",
  "SUCCESS" = "SUCCESS",
  "FAILURE" = "FAILURE",
}

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
    nftAuthUser,
    nftInputUser,
    allSelectedNftsApproved,
    validatedAddressToSwap,
    setAuthedUserNftsApprovalStatus,
    setAllSelectedNftsAreApproved,
    setCreateApprovalStatus,
    setCreateSwapStatus,
    createSwapStatus,
    currentSwapModalStep,
    updateSwapStep,
  } = useContext(SwapContext);

  const [transactionResult, displayTransactionResultModal] =
    useState<null | TransactionResult>(null);

  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const { theme } = useTheme();

  useEffect(() => {
    if (!open) {
      updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);
      setCreateApprovalStatus(TransactionStatus.SEND_TRANSACTION);
    }
  }, [open]);

  const nftsInputUser = ComposeNftSwap(nftInputUser);
  const nftsAuthUser = ComposeNftSwap(nftAuthUser);

  useEffect(() => {
    if (createSwapStatus === TransactionStatus.TRANSACTION_APPROVED) {
      setCreateApprovalStatus(TransactionStatus.SEND_TRANSACTION);
      setCreateSwapStatus(TransactionStatus.SEND_TRANSACTION);
    }

    const fetchApprove = async () => {
      await updateNftsToSwapApprovalStatus(
        nftAuthUser,
        setAuthedUserNftsApprovalStatus,
        setAllSelectedNftsAreApproved,
      );
    };
    fetchApprove();
  }, [nftAuthUser, allSelectedNftsApproved]);

  if (!authenticatedUserAddress?.address || !nftInputUser || !nftAuthUser) {
    onClose();
    return null;
  }

  let chainId: number;

  const handleSwap = async () => {
    if (typeof chain?.id != "undefined") {
      chainId = chain?.id;
    } else {
      throw new Error("Chain ID is undefined");
    }

    const swapData: ICreateSwap = {
      walletClient: walletClient,
      expireDate: timeDate,
      nftInputUser: nftsInputUser,
      nftAuthUser: nftsAuthUser,
      validatedAddressToSwap: validatedAddressToSwap,
      authenticatedUserAddress: authenticatedUserAddress,
      chain: chainId,
    };

    try {
      if (allSelectedNftsApproved) {
        const transactionReceipt = await createSwap(swapData);

        if (transactionReceipt != undefined) {
          toast.success("Created Swap");
          updateSwapStep(ButtonClickPossibilities.NEXT_STEP);
        } else {
          updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);
          toast.error("Create Swap Failed");
        }
      } else {
        toast.error("You must approve the Tokens to create Swap.");
        updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);
      }
    } catch (error) {
      toast.error("You must approve the Tokens to create Swap.");
      updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);
      console.error(error);
    }
  };

  const validateTokensAreApproved = () => {
    if (allSelectedNftsApproved) {
      if (currentSwapModalStep === SwapModalSteps.APPROVE_NFTS) {
        updateSwapStep(ButtonClickPossibilities.NEXT_STEP);
      }
    } else {
      toast.error("You must approve the Tokens to create Swap.");
    }
  };

  const ConfirmSwapModalStep: Partial<Record<SwapModalSteps, JSX.Element>> = {
    [SwapModalSteps.APPROVE_NFTS]: (
      <SwapModalLayout
        toggleCloseButton={{ open: open, onClose: onClose }}
        text={{
          title: "Swap offer confirmation",
          description:
            "Before sending your offer, please approve the assets you want to trade by clicking on them.",
        }}
        body={{
          component: <NftsCardApprovedList />,
        }}
        footer={{
          component: (
            <>
              <div className="flex w-full justify-between items-center">
                <div>
                  <ProgressStatus />
                </div>
                <div>
                  <GenericButton
                    label={"Continue"}
                    onClick={validateTokensAreApproved}
                    aditionalStyle={
                      theme === "light" ? "text-black" : "text-yellow"
                    }
                  />
                </div>
              </div>
            </>
          ),
        }}
      />
    ),
    [SwapModalSteps.CREATE_SWAP]: (
      <SwapModalLayout
        toggleCloseButton={{ open: open, onClose: onClose }}
        text={{
          title: "Swap offer confirmation",
          description: "Please review your final proposal.",
        }}
        body={{
          component: "",
        }}
        footer={{
          component: (
            <>
              <div className="flex w-full justify-end gap-3">
                <GenericButton
                  label={"Back"}
                  variant={ButtonVariant.ALTERNATIVE}
                  onClick={() =>
                    updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP)
                  }
                />

                <GenericButton
                  label={"Confirm and send"}
                  disabled={!allSelectedNftsApproved}
                  variant={ButtonVariant.SECONDARY}
                  onClick={() => {
                    updateSwapStep(ButtonClickPossibilities.NEXT_STEP);
                    handleSwap();
                  }}
                />
              </div>
            </>
          ),
        }}
      />
    ),
    [SwapModalSteps.CREATING_SWAP]: (
      <SwapModalLayout
        toggleCloseButton={{ open: open, onClose: onClose }}
        text={{
          title: "Swap offer confirmation",
          description: "Please review your final proposal.",
        }}
        body={{
          component: "",
        }}
        footer={{
          component: (
            <>
              <div className="flex w-full justify-end gap-3">
                {/* 
                  TODO > Replace variant names with context related names
                  e.g. GenericButton -> SwapModalButton
                */}
                <GenericButton
                  label={"Waiting wallet approval..."}
                  variant={ButtonVariant.SECONDARY}
                  disabled={true}
                />
              </div>
            </>
          ),
        }}
      />
    ),
    [SwapModalSteps.CREATED_SWAP]: (
      <SwapModalLayout
        toggleCloseButton={{ open: open, onClose: onClose }}
        text={{
          title: "Swap offer confirmed!",
          description: "Congrats, your swap offer was submitted.",
        }}
        body={{
          component: "",
        }}
        footer={{
          component: (
            <>
              <div className="flex w-full justify-end gap-3">
                <GenericButton
                  label={"Close swap modal"}
                  variant={ButtonVariant.SECONDARY}
                  onClick={onClose}
                />
              </div>
            </>
          ),
        }}
      />
    ),
  };

  return ConfirmSwapModalStep[currentSwapModalStep];
};
