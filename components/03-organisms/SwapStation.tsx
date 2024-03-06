import {
  PaperPlane,
  SwapContext,
  SwapExpireTime,
  SwapIcon,
  Tooltip,
} from "@/components/01-atoms";
import { ConfirmSwapModal, OfferSummary } from "@/components/02-molecules";
import { useContext, useEffect, useState } from "react";
import cc from "classcat";
import { toast } from "react-hot-toast";

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
    <div className="w-full p-5 bg-[#F6F6F6] dark:bg-[#212322] border rounded-2xl dark:border-[#353836] border-[#D6D5D5] dark:shadow-swap-station shadow-swap-station-light ">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between max-h-[36px]">
          <h3 className="dark:title-h3-normal-dark title-h3-normal mb-7 contrast-50">
            Swap Station
          </h3>
          <SwapExpireTime />
        </div>
        <div className="flex flex-col gap-2 relative">
          <OfferSummary forAuthedUser={false} />
          <OfferSummary forAuthedUser={true} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border dark:border-[#353836]  border-[#E4E4E4] dark:bg-[#212322] bg-[#F6F6F6] rounded-[100px] w-[36px] h-[36px] items-center flex justify-center">
            <SwapIcon
              variant={"vertical"}
              props={{ className: "text-[#A3A9A5] dark:text-[#F6F6F6]" }}
            />
          </div>
        </div>
        <Tooltip
          position="top"
          content={!isValidSwap ? "Select items to swap" : null}
        >
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
                "pointer-events-none rounded-xl w-full disabled:bg-[#F0EEEE] dark:disabled:bg-[#282B29]  dark:hover:bg-[#4b514d] bg-green-400 border-green-500 disabled:border-gray-200  dark:disabled:border-[#353836]  border-2 py-3 px-5 items-center flex justify-center gap-2 font-semibold text-[16px] leading-[20.4px] disabled:text-[#A3A9A5] disabled:dark:text-[#707572] text-green-900 dark:shadow-button-swap-station-offer ",
              ])}
            >
              <PaperPlane
                className={cc([
                  "w-6",
                  isValidSwap
                    ? "text-green"
                    : "dark:text-[#707572] text-[#A3A9A5]",
                ])}
              />
              Swap
            </button>
          </div>
        </Tooltip>
      </div>

      <ConfirmSwapModal
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
      />
    </div>
  );
};
