import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useNetwork, useWalletClient } from "wagmi";
import {
  LoadingIndicator,
  SwapContext,
  TransactionResultModal,
} from "@/components/01-atoms";
import { creatingSwap } from "@/lib/service/creatingSwap";
import {
  ComposeNftSwap,
  CreateApprovalStatus,
  CreateSwapStatus,
  ICreateSwap,
} from "@/lib/client/blockchain-data";
import { ADDRESS_ZERO } from "@/lib/client/constants";
import cc from "classcat";
import toast from "react-hot-toast";
import { useSwaplace } from "@/lib/client/hooks/useSwaplace";
import { CloseIcon } from "../01-atoms/icons/CloseIcon";
import { useTheme } from "next-themes";
import { RightIcon } from "../01-atoms/icons/RightIcon";
import { ProgressBar } from "../01-atoms/ProgressBar";
import { NftsCardApprovedList } from "../01-atoms/NftsCardApprovedList";
import { LeftIcon } from "../01-atoms/icons/LeftIcon";

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
    nftInputUser,
    nftAuthUser,
    validatedAddressToSwap,
    timeDate,
    allSelectedNftsAproved,
    authedUserSelectedNftsApprovalStatus,
    setCreateApprovalStatus,
    createApprovalStatus,
    createSwapStatus,
    setCreateSwapStatus,
  } = useContext(SwapContext);

  const [continueSwapModal, setContinueSwapModal] = useState(false);
  const [transactionResult, displayTransactionResultModal] =
    useState<null | TransactionResult>(null);

  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const { theme } = useTheme();

  const { updateNftsToSwapApprovalStatus } = useSwaplace();

  useEffect(() => {
    if (!open) {
      setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
      setContinueSwapModal(false);
    }
  }, [open]);

  useEffect(() => {
    if (createSwapStatus === CreateSwapStatus.WALLET_APPROVED) {
      setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
      setCreateSwapStatus(CreateSwapStatus.CREATE_SWAP);
    }

    const fetchApprove = async () => {
      await updateNftsToSwapApprovalStatus();
    };
    fetchApprove();
  }, [nftAuthUser, allSelectedNftsAproved]);

  if (!authenticatedUserAddress?.address || !nftInputUser || !nftAuthUser) {
    onClose();
    return null;
  }

  let chainId: number;

  const nftsInputUser = ComposeNftSwap(nftInputUser);
  const nftsAuthUser = ComposeNftSwap(nftAuthUser);
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
      setCreateSwapStatus(CreateSwapStatus.WAITING_WALLET_APPROVAL);

      if (allSelectedNftsAproved) {
        const transactionReceipt = await creatingSwap(swapData);
        if (transactionReceipt != undefined) {
          setCreateSwapStatus(CreateSwapStatus.WALLET_APPROVED);
        } else {
          setCreateSwapStatus(CreateSwapStatus.CREATE_SWAP);
          toast.error("Create Swap Failed");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const validateApprovedTokensSwap = () => {
    console.log("allSelectedNftsAproved", allSelectedNftsAproved);
    if (!allSelectedNftsAproved) {
      toast.error("You must approve the Tokens to create Swap.");
      return;
    } else {
      setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
      handleSwap();
      console.log("allSelectedNftsAproved", allSelectedNftsAproved);
    }
  };

  const authedUserSelectedApprovedItemsLenght =
    authedUserSelectedNftsApprovalStatus.filter(
      (item) => item.approved !== ADDRESS_ZERO,
    ).length;

  const authedUserSelectedApprovalLenght =
    authedUserSelectedNftsApprovalStatus.length;

  const handleToggleContinueSwap = () => {
    if (allSelectedNftsAproved) {
      if (continueSwapModal) {
        setContinueSwapModal(false);
      } else setContinueSwapModal(true);
    }
  };
  return (
    <>
      <Transition
        show={open}
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="z-40 fixed inset-0 bg-black/30 backdrop-blur-sm" />
      </Transition>
      <Dialog open={open} onClose={onClose}>
        <Transition
          show={open}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          className="fixed left-1/2 top-1/2 z-50 bg-[#f8f8f8] dark:bg-[#212322] -translate-x-1/2 -translate-y-1/2 rounded-[20px] border-[#353836] "
        >
          <Dialog.Panel
            className={
              " flex flex-col md:min-w-[350px] md:max-w-[480px] md:max-h-[620px] border border-[#353836] rounded-[20px] shadow"
            }
          >
            <div className="border-b border-[#353836]">
              <Dialog.Title
                className={
                  "dark:text-white text-black text-xl font-bold h-[76px] justify-between flex p-6"
                }
              >
                <p className="items-center flex dark:title-h3-normal-dark title-h3-normal">
                  Swap offer confirmation
                </p>
                <div
                  className="w-7 h-7 rounded-[100px] shadow border border-[#353836] justify-center items-center inline-flex dark:bg-[#282a29]"
                  role="button"
                  onClick={onClose}
                >
                  <CloseIcon
                    fill={cc([theme == "light" ? "black" : "white"])}
                  />
                </div>
              </Dialog.Title>
            </div>
            {!continueSwapModal ? (
              <div className="w-[300px] md:w-full">
                <div className="flex flex-col gap-6 p-6">
                  <div className="flex">
                    <Dialog.Description>
                      <p className="dark:p-normal-2-dark p-normal-2">
                        Before sending your offer, please approve the assets you
                        want to trade by clicking on them.
                      </p>
                    </Dialog.Description>
                  </div>

                  <div>
                    <NftsCardApprovedList />
                  </div>
                </div>

                <div className="flex justify-between items-center w-full p-6 border-t border-[#353836]">
                  <div className="flex gap-2 md:w-[200px] justify-center items-center">
                    <div className="flex">
                      <p>
                        {authedUserSelectedApprovedItemsLenght +
                          "/" +
                          authedUserSelectedApprovalLenght}
                      </p>
                    </div>
                    <div className="flex w-full">
                      <ProgressBar
                        currentStep={authedUserSelectedApprovedItemsLenght}
                        numberOfItems={authedUserSelectedApprovalLenght}
                      />
                    </div>
                  </div>

                  <div className="flex">
                    <button
                      disabled={!allSelectedNftsAproved}
                      className={cc([
                        "border border-[#353836] bg-[#282B29] rounded-[10px] px-4 py-2 dark:p-medium p-medium-dark ",

                        !allSelectedNftsAproved
                          ? "cursor-not-allowed"
                          : "bg-[#DDF23D] ",
                      ])}
                      onClick={() => handleToggleContinueSwap()}
                    >
                      <div className="flex justify-center items-center gap-3">
                        <p
                          className={cc([
                            !allSelectedNftsAproved
                              ? "p-medium-bold"
                              : "p-medium-bold-dark !text-black",
                          ])}
                        >
                          Continue
                        </p>
                        <RightIcon />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-[300px] md:w-full">
                <div className="flex flex-col gap-6 p-6">
                  <div className="flex">
                    <Dialog.Description>
                      <p className="dark:p-normal-2-dark p-normal-2">
                        Please review your final proposal.
                      </p>
                    </Dialog.Description>
                  </div>

                  <div>Offer expires in</div>
                  <div>NftCards</div>
                </div>

                <div className="flex  items-center w-full p-6 border-t border-[#353836]">
                  <div className="flex items-center gap-2 w-[200px] h-[24px]">
                    <button
                      className={cc([
                        "border border-[#353836] bg-[#DDF23D33] rounded-[10px] px-4 py-2 dark:p-medium p-medium-dark ",
                      ])}
                      onClick={() => handleToggleContinueSwap()}
                    >
                      <div className="flex justify-center items-center gap-2">
                        <LeftIcon />
                        <p
                          className={cc([
                            !allSelectedNftsAproved
                              ? "p-medium-bold"
                              : "p-medium-bold-dark !text-[#DDF23D] ",
                          ])}
                        >
                          Back
                        </p>
                      </div>
                    </button>
                  </div>

                  <div
                    className={cc([
                      "flex",
                      {
                        "cursor-not-allowed": !allSelectedNftsAproved,
                      },
                    ])}
                  >
                    <button
                      disabled={!allSelectedNftsAproved}
                      className={cc([
                        "border border-[#353836] bg-[#282B29] rounded-[10px] px-4 py-2 dark:p-medium p-medium-dark disabled:pointer-events-none",

                        !allSelectedNftsAproved
                          ? "cursor-not-allowed"
                          : "bg-[#DDF23D] ",
                      ])}
                      onClick={validateApprovedTokensSwap}
                    >
                      <div className="flex justify-center items-center gap-3">
                        {createApprovalStatus ===
                          CreateApprovalStatus.WAITING_WALLET_APPROVAL ||
                        createSwapStatus ===
                          CreateSwapStatus.WAITING_WALLET_APPROVAL ? (
                          <LoadingIndicator />
                        ) : createSwapStatus ===
                          CreateSwapStatus.CREATE_SWAP ? (
                          <p
                            className={cc([
                              !allSelectedNftsAproved
                                ? "p-medium-bold"
                                : "p-medium-bold-dark !text-black",
                            ])}
                          >
                            Create Offer
                          </p>
                        ) : createSwapStatus ===
                          CreateSwapStatus.WALLET_APPROVED ? (
                          <p
                            className={cc([
                              !allSelectedNftsAproved
                                ? "p-medium-bold"
                                : "p-medium-bold-dark !text-black",
                            ])}
                          >
                            Swap Created
                          </p>
                        ) : null}
                        <RightIcon />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </Transition>
      </Dialog>

      <TransactionResultModal
        onClose={onClose}
        transactionResult={transactionResult}
      />
    </>
  );
};
