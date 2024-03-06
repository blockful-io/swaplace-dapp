import {
  PaperPlane,
  SwapContext,
  SwapExpireTime,
  SwapIcon,
} from "@/components/01-atoms";
import { ConfirmSwapModal, OfferSummary } from "@/components/02-molecules";
import { TokensShelfVariant } from "@/components/03-organisms";
import { useContext, useEffect, useState } from "react";
import cc from "classcat";
import toast from "react-hot-toast";

export const SwapStation = () => {
  const [isValidSwap, setIsValidSwap] = useState<boolean>(false);

  const {
    authenticatedUserTokensList,
    searchedUserTokensList,
    validatedAddressToSwap,
  } = useContext(SwapContext);

  useEffect(() => {
    setIsValidSwap(
      !!authenticatedUserTokensList.length &&
        !!searchedUserTokensList.length &&
        !!validatedAddressToSwap,
    );
  }, [
    authenticatedUserTokensList,
    searchedUserTokensList,
    validatedAddressToSwap,
  ]);

  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);

  const validateSwapSending = () => {
    if (!isValidSwap) {
      if (!validatedAddressToSwap) {
        toast.error("You must select a destiny wallet to swap tokens with");
        return;
      }

      if (!authenticatedUserTokensList.length) {
        toast.error("You must select at least one NFT from yours to swap");
        return;
      }

      if (!searchedUserTokensList.length) {
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
    <div className="w-full p-5 bg-[#f8f8f8] dark:bg-[#212322] dark:border rounded-2xl dark:border-[#353836] dark:shadow-swap-station ">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between max-h-[36px]">
          <h3 className="dark:title-h3-normal-dark title-h3-normal mb-7">
            Swap Station
          </h3>
          <SwapExpireTime />
        </div>
        <div className="flex flex-col gap-2 relative">
          <OfferSummary variant={TokensShelfVariant.Your} />
          <OfferSummary variant={TokensShelfVariant.Their} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#707572] dark:bg-[#212322] rounded-[100px] w-[36px] h-[36px] items-center flex justify-center">
            <SwapIcon variant={"vertical"} />
          </div>
        </div>
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
              "pointer-events-none rounded-xl w-full disabled:bg-gray-100 dark:disabled:bg-[#282B29]  dark:hover:bg-[#4b514d] bg-green-400 border-green-500 disabled:border-gray-200  dark:disabled:border-[#353836]  border-2 py-3 px-5 items-center flex justify-center gap-2 font-semibold text-base disabled:text-[#707572] text-green-900 dark:shadow-button-swap-station-offer ",
            ])}
          >
            <PaperPlane
              className="w-6"
              fill={isValidSwap ? "green" : "#707572"}
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
