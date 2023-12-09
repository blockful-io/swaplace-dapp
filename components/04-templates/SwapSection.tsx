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
        <div className="flex items-center justify-center py-1">
          <SelectChain />
        </div>
        <ShelfTabSwap />
      </div>
    </section>
  );
};
