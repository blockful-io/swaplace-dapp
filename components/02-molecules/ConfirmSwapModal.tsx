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
import { ConfirmSwapModalLayout } from "../01-atoms/ConfirmSwapModalLayout";
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
      updateSwapStep(ButtonClickPossibilities.PREVIOUS_SET);
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
      setCreateSwapStatus(TransactionStatus.WAITING_WALLET_APPROVAL);

      if (allSelectedNftsApproved) {
        setCreateSwapStatus(TransactionStatus.TRANSACTION_APPROVED);

        const transactionReceipt = await createSwap(swapData);
        if (transactionReceipt != undefined) {
          toast.success("Created Swap");
          setCreateSwapStatus(TransactionStatus.SUCCESSFUL_TRANSACTION);
        } else {
          setCreateSwapStatus(TransactionStatus.SEND_TRANSACTION);
          toast.error("Create Swap Failed");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validateAllTokensApprovalSwap = () => {
    if (!allSelectedNftsApproved) {
      toast.error("You must approve the Tokens to create Swap.");
      return;
    } else {
      setCreateSwapStatus(TransactionStatus.SEND_TRANSACTION);
      handleSwap();
    }
  };

  const handleContinueSwapProcess = () => {
    switch (currentSwapModalStep) {
      case SwapModalSteps.APPROVE_NFTS:
        if (allSelectedNftsApproved) {
          updateSwapStep(ButtonClickPossibilities.NEXT_STEP);
        } else {
          toast.error("You must approve the Tokens to create Swap.");
        }
      case SwapModalSteps.CREATE_SWAP:
        updateSwapStep(ButtonClickPossibilities.PREVIOUS_SET);
    }
  };

  const ConfirmSwapModalStep: Partial<Record<SwapModalSteps, JSX.Element>> = {
    [SwapModalSteps.APPROVE_NFTS]: (
      <ConfirmSwapModalLayout
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
              <div className="flex w-full justify-between">
                <ProgressStatus />
                <GenericButton
                  label={"Continue"}
                  onClick={() => handleContinueSwapProcess()}
                  aditionalStyle={
                    theme === "light" ? "text-black" : "text-yellow"
                  }
                />
              </div>
            </>
          ),
        }}
      />
    ),
    [SwapModalSteps.CREATE_SWAP]: (
      <ConfirmSwapModalLayout
        toggleCloseButton={{ open: open, onClose: onClose }}
        text={{
          title: "Swap offer confirmation",
          description: "Please review your final proposal.",
        }}
        body={{
          component: <NftsCardApprovedList />,
        }}
        footer={{
          component: (
            <>
              <div className="flex w-full justify-end gap-3">
                <GenericButton
                  label={"Back"}
                  onClick={() => handleContinueSwapProcess()}
                  variant={ButtonVariant.ALTERNATIVE}
                />

                <GenericButton
                  label={"Confirm and send"}
                  disabled={!allSelectedNftsApproved}
                  onClick={() => {
                    validateAllTokensApprovalSwap();
                  }}
                  variant={ButtonVariant.SECONDARY}
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
