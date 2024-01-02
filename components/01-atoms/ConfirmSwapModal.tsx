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
import { NftCard, NftCardActionType } from "../02-molecules";
import { hexToNumber } from "viem";
import { NFT } from "@/lib/client/constants";
import cc from "classcat";
import toast from "react-hot-toast";

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
  const { nftInputUser, nftAuthUser, validatedAddressToSwap, timeDate } =
    useContext(SwapContext);
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

  const [allSelectedNftsAproved, setAllSelectedNftsAproved] =
    useState<boolean>(false);

  useEffect(() => {
    if (!open) {
      setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
    }
  }, [open]);

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
      chain: chainId,
      spender: authenticatedUserAddress.address,
      nftUser: nft.contract?.address,
      amountOrId: BigInt(hexToNumber(nft.id?.tokenId)),
    };

    try {
      setCreateApprovalStatus(CreateApprovalStatus.WAITING_WALLET_APPROVAL);
      const transactionReceipt = await approveSwap(swapData);
      if (transactionReceipt != undefined) {
        setCreateApprovalStatus(CreateApprovalStatus.WALLET_APPROVED);
        return transactionReceipt;
      } else {
        setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
      }
    } catch (error) {
      setCreateApprovalStatus(CreateApprovalStatus.CREATE_APPROVAL);
      console.error(error);
    }
  };

  const nftsInputUser = ComposeNftSwap(nftInputUser);
  const nftsAuthUser = ComposeNftSwap(nftAuthUser);
  const handleSwap = () => {
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
      creatingSwap(swapData);
    } catch (error) {
      console.error(error);
    }
  };

  const validateApprovedTokensSwap = () => {
    if (!allSelectedNftsAproved) {
      toast.error("You must approve the Tokens to create Swap.");
      return;
    } else {
      setCreateSwapStatus(CreateSwapStatus.CREATE_SWAP);
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
          className="fixed left-1/2 top-1/2 z-50 bg-[#f8f8f8] dark:bg-[#1A1B1F] -translate-x-1/2 -translate-y-1/2 rounded-lg "
        >
          <Dialog.Panel className={"p-6 flex flex-col min-w-[350px]"}>
            <Dialog.Title
              className={"dark:text-white text-black text-xl font-bold"}
            >
              <p className="items-center justify-center flex">
                Approve Tokens below
              </p>
            </Dialog.Title>

            <div className="flex justify-center items-center">
              <div className="grid grid-cols-4 gap-8 mt-6">
                {nftAuthUser.map((nft, index) => (
                  <div className={cc(["flex justify-center items-center"])}>
                    <div
                      role="button"
                      onClick={() => {
                        handleApprove(nft).then((hashTransaction) => {
                          console.log("hashTransaction = ", hashTransaction);
                        });
                      }}
                    >
                      <NftCard
                        withSelectionValidation={false}
                        onClickAction={NftCardActionType.NFT_ONCLICK}
                        ownerAddress={authenticatedUserAddress.address}
                        nftData={nftAuthUser[index]}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Dialog.Description
              className={
                "dark:text-white text-black text-base mt-2 flex justify-center "
              }
            >
              <p>Are you sure you want to create this Swap?</p>
            </Dialog.Description>
            <div
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
                className="disabled:pointer-events-none mt-4 rounded w-full disabled:bg-gray-100 bg-green-400 border-green-500 disabled:border-gray-200 border-2 py-3 px-5 items-center flex justify-center gap-2 font-semibold text-base disabled:text-gray-300 text-green-900"
              >
                {createApprovalStatus ===
                CreateApprovalStatus.WAITING_WALLET_APPROVAL ? (
                  <LoadingIndicator />
                ) : createSwapStatus === CreateSwapStatus.CREATE_SWAP ? (
                  <p>Create Swap</p>
                ) : null}
              </button>
            </div>
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
