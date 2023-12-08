import cc from "classcat";
import { useContext, useState } from "react";
import { SearchBar, SelectChain, SwapContext } from "@/components/01-atoms";
import { ShelfTabSwap } from "@/components/03-organisms";

export const SwapSection = () => {
  const { validateAddressToSwap, inputAddress } = useContext(SwapContext);

  return (
    <section className={cc(["w-full h-full flex flex-col items-center"])}>
      <div>
        <SearchBar />
        <button
          disabled={!inputAddress}
          className="disabled:bg-gray-200 disabled:text-gray-700 p-3 rounded-md pt-2"
          onClick={() => validateAddressToSwap()}
          type="submit"
        >
          Query NFTs
        </button>
        <SelectChain />
        <ShelfTabSwap />
      </div>
    </section>
  );
};
