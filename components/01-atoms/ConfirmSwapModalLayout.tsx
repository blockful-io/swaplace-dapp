import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment, useEffect, useContext, useState } from "react";
import { CloseIcon } from "./icons/CloseIcon";
import {
  ButtonClickPossibilities,
  SwapModalSteps,
  TransactionStatus,
} from "@/lib/client/blockchain-data";
import { LoadingIndicator, SwapContext } from "@/components/01-atoms";
import cc from "classcat";
import { useTheme } from "next-themes";
import { ProgressStatus } from "../02-molecules/ProgressStatus";
import { NftsCardApprovedList } from "./NftsCardApprovedList";
import { LeftIcon } from "./icons/LeftIcon";
import { RightIcon } from "./icons/RightIcon";

interface ConfirmSwapModalToggle {
  open: boolean;
  onClose: () => void;
}

interface ConfirmSwapModalText {
  title: string;
  description?: string;
}

interface ConfirmSwapApprovalModalBody {
  component: React.ReactNode;
}

interface ConfirmSwapApprovalModalFooter {
  component: React.ReactNode;
}

interface IConfirmSwapModalLayout {
  toggleCloseButton: ConfirmSwapModalToggle;
  text: ConfirmSwapModalText;
  body: ConfirmSwapApprovalModalBody;
  footer: ConfirmSwapApprovalModalFooter;
}

export const ConfirmSwapModalLayout = ({
  toggleCloseButton,
  text,
  body,
  footer,
}: IConfirmSwapModalLayout) => {
  const { theme } = useTheme();

  const {
    allSelectedNftsApproved,
    setCreateApprovalStatus,
    updateSwapStep,
    currentSwapModalStep,
  } = useContext(SwapContext);

  useEffect(() => {
    if (!open) {
      setCreateApprovalStatus(TransactionStatus.SEND_TRANSACTION);
      updateSwapStep(ButtonClickPossibilities.PREVIOUS_SET);
    }
  }, [open]);

  const handleContinueSwapProcess = () => {
    switch (currentSwapModalStep) {
      case SwapModalSteps.APPROVE_NFTS:
        if (allSelectedNftsApproved) {
          updateSwapStep(ButtonClickPossibilities.NEXT_STEP);
        }
      case SwapModalSteps.CREATE_SWAP:
    }
  };

  return (
    <>
      <Transition
        show={toggleCloseButton.open}
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
      <Dialog open={toggleCloseButton.open} onClose={toggleCloseButton.onClose}>
        <Transition
          show={toggleCloseButton.open}
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
                  {text.title}
                </p>
                <div
                  className="w-7 h-7 rounded-[100px] shadow border border-[#353836] justify-center items-center inline-flex dark:bg-[#282a29]"
                  role="button"
                  onClick={toggleCloseButton.onClose}
                >
                  <CloseIcon
                    fill={cc([theme == "light" ? "black" : "white"])}
                  />
                </div>
              </Dialog.Title>
            </div>
            {
              <div className="w-[300px] md:w-full">
                <div className="flex flex-col gap-6 p-6">
                  <div className="flex">
                    <Dialog.Description>
                      <p className="dark:p-normal-2-dark p-normal-2">
                        {text.description}
                      </p>
                    </Dialog.Description>
                  </div>

                  <div>{body.component}</div>
                </div>

                <div className="flex justify-between items-center w-full p-6 border-t border-[#353836]">
                  {footer.component}

                  <div className="flex">
                    <button
                      disabled={!allSelectedNftsApproved}
                      className={cc([
                        "border border-[#353836] bg-[#282B29] rounded-[10px] px-4 py-2 dark:p-medium p-medium-dark ",

                        !allSelectedNftsApproved
                          ? "cursor-not-allowed"
                          : "bg-[#DDF23D] ",
                      ])}
                      onClick={() => handleContinueSwapProcess()}
                    >
                      <div className="flex justify-center items-center gap-3">
                        <p
                          className={cc([
                            !allSelectedNftsApproved
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
              // (
              //   <div className="w-[300px] md:w-full">
              //     <div className="flex flex-col gap-6 p-6">
              //       <div className="flex">
              //         <Dialog.Description>
              //           <p className="dark:p-normal-2-dark p-normal-2">
              //             {text.title}
              //           </p>
              //         </Dialog.Description>
              //       </div>

              //       <div>{text.description}</div>
              //       <div>NftCards</div>
              //     </div>

              //     <div className="flex  items-center w-full p-6 border-t border-[#353836]">
              //       <div className="flex items-center gap-2 w-[200px] h-[24px]">
              //         <button
              //           className={cc([
              //             "border border-[#353836] bg-[#DDF23D33] rounded-[10px] px-4 py-2 dark:p-medium p-medium-dark ",
              //           ])}
              //           // onClick={() => handleToggleContinueSwap()}
              //         >
              //           <div className="flex justify-center items-center gap-2">
              //             <LeftIcon />
              //             <p
              //               className={cc([
              //                 !allSelectedNftsApproved
              //                   ? "p-medium-bold"
              //                   : "p-medium-bold-dark !text-[#DDF23D] ",
              //               ])}
              //             >
              //               Back
              //             </p>
              //           </div>
              //         </button>
              //       </div>

              //       <div
              //         className={cc([
              //           "flex",
              //           {
              //             "cursor-not-allowed": !allSelectedNftsApproved,
              //           },
              //         ])}
              //       >
              //         <button
              //           disabled={!allSelectedNftsApproved}
              //           className={cc([
              //             "border border-[#353836] bg-[#282B29] rounded-[10px] px-4 py-2 dark:p-medium p-medium-dark disabled:pointer-events-none",

              //             !allSelectedNftsApproved
              //               ? "cursor-not-allowed"
              //               : "bg-[#DDF23D] ",
              //           ])}
              //           // onClick={validateApprovedTokensSwap}
              //         >
              //           <div className="flex justify-center items-center gap-3">
              //             {createApprovalStatus ===
              //               CreateApprovalStatus.WAITING_WALLET_APPROVAL ||
              //             createSwapStatus ===
              //               CreateSwapStatus.WAITING_WALLET_APPROVAL ? (
              //               <LoadingIndicator />
              //             ) : createSwapStatus ===
              //               CreateSwapStatus.CREATE_SWAP ? (
              //               <p
              //                 className={cc([
              //                   !allSelectedNftsApproved
              //                     ? "p-medium-bold"
              //                     : "p-medium-bold-dark !text-black",
              //                 ])}
              //               >
              //                 Create Offer
              //               </p>
              //             ) : createSwapStatus ===
              //               CreateSwapStatus.WALLET_APPROVED ? (
              //               <p
              //                 className={cc([
              //                   !allSelectedNftsApproved
              //                     ? "p-medium-bold"
              //                     : "p-medium-bold-dark !text-black",
              //                 ])}
              //               >
              //                 Swap Created
              //               </p>
              //             ) : null}
              //             <RightIcon />
              //           </div>
              //         </button>
              //       </div>
              //     </div>
              //   </div>
              // )
            }
          </Dialog.Panel>
        </Transition>
      </Dialog>
    </>
  );
};
