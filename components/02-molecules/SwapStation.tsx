import { useContext, useEffect, useState } from "react";
import { OfferSummary } from "@/components/02-molecules";
import { PaperPlane, SwapContext } from "@/components/01-atoms";
import cc from "classcat";

export const SwapStation = () => {
  const [isValidSwap, setIsValidSwap] = useState<boolean>(false);

  const { nftAuthUser, nftInputUser, validatedAddressToSwap } =
    useContext(SwapContext);

  useEffect(() => {
    setIsValidSwap(
      !!nftAuthUser.length && !!nftInputUser.length && !!validatedAddressToSwap
    );
  }, [nftAuthUser, nftInputUser, validatedAddressToSwap]);

  return (
    <div className="mx-auto w-[95%] lg:w-[400px] rounded p-5 flex flex-col justify-between items-center gap-16 bg-[#f8f8f8] border-2 border-[#E5E4E4]">
      <div className="w-full flex flex-col justify-start ">
        <h3 className="font-light text-xl text-[#333] mb-7">Swap offer</h3>
        <OfferSummary forAuthedUser={true} />
        <OfferSummary forAuthedUser={false} />
      </div>
      <div className="w-[95%] flex flex-col justify-center items-center">
        <button
          disabled={!isValidSwap}
          className={cc([
            "rounded w-full disabled:bg-gray-100 bg-green-400 border-green-500 disabled:border-gray-200 border-2 py-3 px-5 items-center flex justify-center gap-2 font-semibold text-base disabled:text-gray-300 text-green-900 disabled:cursor-not-allowed",
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
  );
};
