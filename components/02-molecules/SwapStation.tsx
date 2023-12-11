import { useContext, useEffect, useState } from "react";
import { OfferSummary } from "@/components/02-molecules";
import {
  ConfirmSwapModal,
  PaperPlane,
  SwapContext,
} from "@/components/01-atoms";
import cc from "classcat";
import toast from "react-hot-toast";

export const SwapStation = () => {
  const [isValidSwap, setIsValidSwap] = useState<boolean>(false);

  const { nftAuthUser, nftInputUser, validatedAddressToSwap } =
    useContext(SwapContext);

  useEffect(() => {
    setIsValidSwap(
      !!nftAuthUser.length && !!nftInputUser.length && !!validatedAddressToSwap
    );
  }, [nftAuthUser, nftInputUser, validatedAddressToSwap]);

  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);

  const validateSwapSending = () => {
    if (!isValidSwap) {
      if (!validatedAddressToSwap) {
        toast.error("You must select a destiny wallet to swap NFTs with");
        return;
      }

      if (!nftAuthUser.length) {
        toast.error("You must select at least one NFT from yours to swap");
        return;
      }

      if (!nftInputUser.length) {
        toast.error(
          "You must select at least one NFT from the destiny wallet to swap"
        );
        return;
      }
    } else {
      setOpenConfirmationModal(true);
    }
  };

  return (
    <div className="mx-auto w-[95%] lg:w-[400px] rounded p-5 flex flex-col justify-between items-center gap-16 bg-[#f8f8f8] border-2 border-[#E5E4E4]">
      <div className="w-full flex flex-col justify-start ">
        <h3 className="font-light text-xl text-[#333] mb-7">Swap offer</h3>
        <OfferSummary forAuthedUser={true} />
        <OfferSummary forAuthedUser={false} />
      </div>
      <div className="w-[95%] flex flex-col justify-center items-center">
        <div
          role="button"
          onClick={validateSwapSending}
          className={cc([
            "w-full",
            {
              "cursor-not-allowed": !isValidSwap,
            },
          ])}
        >
          <button
            disabled={!isValidSwap}
            className={cc([
              "pointer-events-none rounded w-full disabled:bg-gray-100 bg-green-400 border-green-500 disabled:border-gray-200 border-2 py-3 px-5 items-center flex justify-center gap-2 font-semibold text-base disabled:text-gray-300 text-green-900",
            ])}
          >
            <PaperPlane
              className="w-6"
              fill={isValidSwap ? "green" : "rgb(209,213,219)"}
            />
            Send swap
          </button>
        </div>
      </div>

      <ConfirmSwapModal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
      />
    </div>
  );
};
