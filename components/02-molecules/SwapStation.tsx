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
    <div className="w-[95%] lg:w-[400px] rounded p-5 flex flex-col justify-start items-center gap-16 bg-[#f8f8f8] border-2 border-[#E5E4E4]">
      <div className="w-full flex flex-col justify-start ">
        <h3 className="font-light text-xl text-[#333] mb-7">Swap offer</h3>
        <OfferSummary forAuthedUser={true} />
        <OfferSummary forAuthedUser={false} />
      </div>
      <div className="w-[95%] flex flex-col justify-center items-center">
        <button
          disabled={!isValidSwap}
          className={cc([
            "w-[50%] h-10 rounded-xl lg:w-[70%] md:w-[40%] bg-[#DDF23D] border-2 border-[#E0E0E0]  py-2 px-5 items-center flex justify-center gap-2 font-semibold text-base disabled:bg-[#8a9825]",
          ])}
        >
          <PaperPlane
            className="w-6"
            fill={isValidSwap ? "black" : "#444444"}
          />
          Send swap
        </button>
      </div>
    </div>
  );
};
