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
import { approveSwap } from "@/lib/service/approveSwap";
import {
  ComposeNftSwap,
  CreateApprovalStatus,
  CreateSwapStatus,
  IApproveSwap,
  ICreateSwap,
} from "@/lib/client/blockchain-data";
import { NftCard, NftCardActionType, NftCardStyleType } from "../02-molecules";
import { hexToNumber } from "viem";
import {
  ADDRESS_ZERO,
  NFT,
  SWAPLACE_SMART_CONTRACT_ADDRESS,
} from "@/lib/client/constants";
import cc from "classcat";
import toast from "react-hot-toast";
import { useSwaplace } from "@/lib/client/hooks/useSwaplace";
import { CloseIcon } from "./icons/CloseIcon";
import { useTheme } from "next-themes";
import { RightIcon } from "./icons/RightIcon";

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
    setAuthedUserNftsApprovalStatus,
    setAllSelectedNftsAreApproved,
  } = useContext(SwapContext);
  const [createApprovalStatus, setCreateApprovalStatus] = useState(
    CreateApprovalStatus.CREATE_APPROVAL,
  );
  const [createSwapStatus, setCreateSwapStatus] = useState(
    CreateSwapStatus.CREATE_SWAP,
  );
  const [transactionResult, displayTransactionResultModal] =
    useState<null | TransactionResult>(null);

  const { chain } = useNetwork();
  const { data: walletClient } = useWalletClient();
  const { theme } = useTheme();

  const { updateNftsToSwapApprovalStatus } = useSwaplace();

  useEffect(() => {
    if (!open) {
      setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
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
  const handleApprove = async (nft: NFT) => {
    if (typeof chain?.id != "undefined") {
      chainId = chain?.id;
    }

    const swapData: IApproveSwap = {
      walletClient: walletClient,
      spender: SWAPLACE_SMART_CONTRACT_ADDRESS[chainId] as `0x${string}`,
      tokenContractAddress: nft.contract?.address,
      amountOrId: BigInt(hexToNumber(nft.id?.tokenId)),
    };

    try {
      setCreateApprovalStatus(CreateApprovalStatus.WAITING_WALLET_APPROVAL);
      const transactionReceipt = await approveSwap(swapData);
      if (transactionReceipt != undefined) {
        setCreateApprovalStatus(CreateApprovalStatus.WALLET_APPROVED);
        setCreateSwapStatus(CreateSwapStatus.CREATE_SWAP);
        return transactionReceipt;
      } else {
        setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
        toast.error("Approval Failed");
      }
    } catch (error) {
      setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
      console.error(error);
    }
  };

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
      console.log("allSelectedNftsAproved", allSelectedNftsAproved);
    }
  };

  const validateApprovalTokens = (arraynftApproval: any[]) => {
    const isValidApproved = !arraynftApproval.some((token) => {
      return token.approved != SWAPLACE_SMART_CONTRACT_ADDRESS[chainId];
    });

    console.log("isValidApproved", isValidApproved);
    setAllSelectedNftsAreApproved(isValidApproved);
  };

  const approveNftForSwapping = async (nft: NFT, index: number) => {
    if (typeof chain?.id != "undefined") {
      chainId = chain?.id;
    }
    if (
      authedUserSelectedNftsApprovalStatus[index]?.approved ===
      SWAPLACE_SMART_CONTRACT_ADDRESS[chainId]
    ) {
      toast.error("Token already approved.");
    } else {
      await handleApprove(nft).then((result) => {
        if (result != undefined) {
          setAuthedUserNftsApprovalStatus(
            (authedUserSelectedNftsApprovalStatus[index].approved =
              SWAPLACE_SMART_CONTRACT_ADDRESS[chainId] as any),
          );
        }
        validateApprovalTokens(authedUserSelectedNftsApprovalStatus);
      });
    }
  };

  // const percentageValue =
  //   (authedUserSelectedNftsApprovalStatus.filter(
  //     (item) => item.approved !== ADDRESS_ZERO,
  //   ).length /
  //     authedUserSelectedNftsApprovalStatus.length) *
  //   100;
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
          className="fixed left-1/2 top-1/2 z-50 bg-[#f8f8f8] dark:bg-[#1A1B1F] -translate-x-1/2 -translate-y-1/2 rounded-[20px] border-[#353836] "
        >
          <Dialog.Panel
            className={
              " flex flex-col min-w-[350px] max-w-[432px] max-h-[620px] border border-[#353836] rounded-[20px] shadow"
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

            <div className="flex flex-col gap-6 p-6">
              <div className="flex">
                <Dialog.Description>
                  <p className="dark:p-normal-2-dark p-normal-2">
                    Before sending your offer, please approve the assets you
                    want to trade by clicking on them.
                  </p>
                </Dialog.Description>
              </div>

              <div className="flex justify-center items-center overflow-y-auto  max-h-[250px]">
                <div className="grid grid-cols-1 w-[100%] gap-3 ">
                  {nftAuthUser.map((nft, index) => (
                    <div
                      className={cc([
                        "flex p-4 items-center gap-4 h-[68px]",
                        authedUserSelectedNftsApprovalStatus[index]
                          ?.approved === ADDRESS_ZERO
                          ? "bg-[#353836] z-20 rounded-xl"
                          : "dark:bg-[#DDF23D] bg-[#97a529] z-20 rounded-xl disabled cursor-not-allowed",
                      ])}
                      role="button"
                      onClick={() => approveNftForSwapping(nft, index)}
                    >
                      <div>
                        <NftCard
                          withSelectionValidation={false}
                          onClickAction={NftCardActionType.NFT_ONCLICK}
                          ownerAddress={authenticatedUserAddress.address}
                          nftData={nftAuthUser[index]}
                          styleType={NftCardStyleType.SMALL}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex">
                          {authedUserSelectedNftsApprovalStatus[index]
                            ?.approved === ADDRESS_ZERO ? (
                            <p className="p-medium-2-dark">
                              {nftAuthUser[index].contractMetadata?.name}
                            </p>
                          ) : (
                            <p className="p-medium-2">
                              {nftAuthUser[index].contractMetadata?.name}
                            </p>
                          )}
                        </div>
                        <div className="flex p-semibold-dark">
                          {authedUserSelectedNftsApprovalStatus[index]
                            ?.approved === ADDRESS_ZERO ? (
                            <p className=" bg-[#505150] px-1 w-fit flex rounded-[4px]">
                              PENDING APPROVAL
                            </p>
                          ) : (
                            <div className="bg-[#505150] px-1 w-fit opacity-30 rounded-[4px]">
                              <p className="text-white">APPROVED</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between w-full p-6 border-t border-[#353836]">
              <div>
                {
                  authedUserSelectedNftsApprovalStatus.filter(
                    (item) => item.approved !== ADDRESS_ZERO,
                  ).length
                }
                /{authedUserSelectedNftsApprovalStatus.length}
              </div>
              {/* <div className="w-full bg-slate-500  rounded-full h-1.5 mb-4 dark:bg-gray-200">
                <div
                  className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                  style={{ width: percentageValue }}
                ></div>
              </div> */}
              <div>
                <button className="border border-[#353836] bg-[#282B29] rounded-[10px] px-4 py-2 dark:p-medium p-medium-dark">
                  <div className="flex justify-center items-center gap-3">
                    <p>Continue</p>
                    <RightIcon />
                  </div>
                </button>
              </div>
            </div>

            {/* <div
              role="button"
              onClick={validateApprovedTokensSwap}
              className={cc([
                "w-full",
                {
                  "cursor-not-allowed": !allSelectedNftsAproved,
                },
              ])}
            >
              <button
                onClick={handleSwap}
                disabled={!allSelectedNftsAproved}
                className="disabled:pointer-events-none mt-4 rounded w-full disabled:bg-gray-100 dark:disabled:bg-[#353836] bg-green-400 border-green-500  border-2 py-3 px-5 items-center flex justify-center gap-2 font-semibold text-base disabled:border-gray-200  dark:disabled:border-[#434443] disabled:text-gray-300 text-green-900"
              >
                {createApprovalStatus ===
                  CreateApprovalStatus.WAITING_WALLET_APPROVAL ||
                createSwapStatus ===
                  CreateSwapStatus.WAITING_WALLET_APPROVAL ? (
                  <LoadingIndicator />
                ) : createSwapStatus === CreateSwapStatus.CREATE_SWAP ? (
                  <p>Create Swap</p>
                ) : createSwapStatus === CreateSwapStatus.WALLET_APPROVED ? (
                  <p>Swap Created</p>
                ) : null}
              </button>
            </div> */}
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
