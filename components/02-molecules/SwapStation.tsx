import { useContext, useEffect, useState } from "react";
import { ConfirmSwapModal, SwapContext } from "@/components/01-atoms";
import { PaperPlane } from "@/components/01-atoms/icons";
import { OfferSummary } from "@/components/02-molecules";
import cc from "classcat";
import toast from "react-hot-toast";

export const SwapStation = () => {
  const [isValidSwap, setIsValidSwap] = useState<boolean>(false);

  const { nftAuthUser, nftInputUser, validatedAddressToSwap } =
    useContext(SwapContext);

  useEffect(() => {
    setIsValidSwap(
      !!nftAuthUser.length && !!nftInputUser.length && !!validatedAddressToSwap,
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
          "You must select at least one NFT from the destiny wallet to swap",
        );
        return;
      }
    } else {
      setOpenConfirmationModal(true);
    }
  };

  return (
    <div className="mx-auto w-[95%] xl:w-[500px] lg:w-[615px]  p-4 flex flex-col justify-between items-center bg-[#f8f8f8] dark:bg-[#212322] xl:gap-0  gap-4  dark:border rounded-2xl dark:border-[#353836]">
      <div className="w-full flex flex-col justify-start ">
        <h3 className="dark:title-h3-normal-dark title-h3-normal mb-7">
          Swap offer
        </h3>
        <div className="flex flex-col gap-4">
          <OfferSummary forAuthedUser={true} />
          <OfferSummary forAuthedUser={false} />
        </div>
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
              "pointer-events-none rounded-xl w-full disabled:bg-gray-100 dark:disabled:bg-[#353836]  dark:hover:bg-[#4b514d] bg-green-400 border-green-500 disabled:border-gray-200  dark:disabled:border-[#434443]  border-2 py-3 px-5 items-center flex justify-center gap-2 font-semibold text-base disabled:text-gray-300 text-green-900 ",
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
