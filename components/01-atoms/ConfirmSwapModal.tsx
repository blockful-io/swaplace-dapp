import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { NftCard, NftCardActionType, SwapContext, SwapIcon } from ".";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";

interface ConfirmSwapModalProps {
  open: boolean;
  onClose: () => void;
}

export const ConfirmSwapModal = ({ open, onClose }: ConfirmSwapModalProps) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { nftInputUser, nftAuthUser, validatedAddressToSwap } =
    useContext(SwapContext);

  if (!authenticatedUserAddress?.address || !nftInputUser || !nftAuthUser) {
    onClose();
    return null;
  }

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
          className="fixed left-1/2 top-1/2 z-50 bg-[#1A1B1F] -translate-x-1/2 -translate-y-1/2 rounded-lg"
        >
          <Dialog.Panel className={"p-6 flex flex-col min-w-[350px]"}>
            <Dialog.Title className={"text-white text-xl font-bold"}>
              Confirm Swap Offer creation
            </Dialog.Title>
            <Dialog.Description className={"text-white text-base mt-2"}>
              Please confirm the data below is correct:
            </Dialog.Description>
            <div className="flex justify-between items-center">
              <div className="flex flex-col my-8 space-y-3">
                <div className="text-white text-sm">You are offering</div>
                <div className="border-green-500 border-2 rounded-md">
                  <NftCard
                    withSelectionValidation={false}
                    onClickAction={NftCardActionType.SHOW_NFT_DETAILS}
                    ownerAddress={authenticatedUserAddress.address}
                    nftData={nftAuthUser[0]}
                  />
                </div>
              </div>
              <SwapIcon className="w-12 h-12 mt-6" />
              <div className="flex flex-col my-8 space-y-3">
                <div className="text-white text-sm">You are asking for</div>
                <div className="border-green-500 border-2 rounded-md">
                  <NftCard
                    withSelectionValidation={false}
                    onClickAction={NftCardActionType.SHOW_NFT_DETAILS}
                    ownerAddress={validatedAddressToSwap}
                    nftData={nftInputUser[0]}
                  />
                </div>
              </div>
            </div>
            <Dialog.Description className={"text-gray-500 text-sm mb-6"}>
              Tip: you can click on the NFT card <br /> to copy its metadata to
              your clipboard!
            </Dialog.Description>

            <Dialog.Description className={"text-white text-base mt-2"}>
              Are you sure you want to create this Swap Offer?
            </Dialog.Description>
            <button className="mt-4 rounded w-full disabled:bg-gray-100 bg-green-400 border-green-500 disabled:border-gray-200 border-2 py-3 px-5 items-center flex justify-center gap-2 font-semibold text-base disabled:text-gray-300 text-green-900">
              Create offer
            </button>
          </Dialog.Panel>
        </Transition>
      </Dialog>
    </>
  );
};
