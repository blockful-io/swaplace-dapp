import cc from "classcat";
import { useState } from "react";
import { SearchBar, SelectChain } from "@/components/01-atoms";
import { ShelfTabSwap } from "@/components/03-organisms";

export const SwapSection = () => {
  const [inputState, setInputState] = useState("");

  return (
    <section className={cc(["w-full h-full flex flex-col items-center"])}>
      <div>
        <SearchBar onInputChange={(input) => setInputState(input)} />
        <SelectChain />
        <ShelfTabSwap input={inputState} />
      </div>
    </section>
  );
};
