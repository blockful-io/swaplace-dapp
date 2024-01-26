import { useContext, useEffect } from "react";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useNetwork, useWalletClient } from "wagmi";
import {
  ButtonVariant,
  NftsCardApprovedList,
  SwapContext,
  SwapModalButton,
  SwapModalLayout,
} from "@/components/01-atoms";
import { ProgressStatus } from "@/components/02-molecules";
import { createSwap } from "@/lib/service/createSwap";
import {
  ButtonClickPossibilities,
  ComposeNftSwap,
  ICreateSwap,
  SwapModalSteps,
} from "@/lib/client/blockchain-data";
import toast from "react-hot-toast";
import { updateNftsToSwapApprovalStatus } from "@/lib/client/swap-utils";
import { useTheme } from "next-themes";

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
    currentSwapModalStep,
    updateSwapStep,
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

  const nftsInputUser = ComposeNftSwap(nftInputUser);
  const nftsAuthUser = ComposeNftSwap(nftAuthUser);

  useEffect(() => {
    updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);

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
          toast.error("Create Swap Failed");
          updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);
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
                  <SwapModalButton
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
                <SwapModalButton
                  label={"Back"}
                  variant={ButtonVariant.ALTERNATIVE}
                  onClick={() => {
                    updateSwapStep(ButtonClickPossibilities.PREVIOUS_STEP);
                  }}
                />

                <SwapModalButton
                  label={"Confirm and send"}
                  disabled={!allSelectedNftsApproved}
                  variant={ButtonVariant.SECONDARY}
                  onClick={() => {
                    updateSwapStep(ButtonClickPossibilities.NEXT_STEP);
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
                <SwapModalButton
                  label={"Waiting wallet approval..."}
                  variant={ButtonVariant.SECONDARY}
                  disabled={true}
                  isLoading={true}
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
                <SwapModalButton
                  label={"Close"}
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
