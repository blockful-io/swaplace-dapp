import cc from "classcat";
import { useContext } from "react";
import { SwapContext } from ".";

export const SearchBar = () => {
  const { setInputAddress, inputAddress, validatedAddressToSwap } =
    useContext(SwapContext);

  return (
    <div className={cc(["h-auto bg-[#f2f2f2] p-5 gap-3 flex flex-col "])}>
      <div className="flex font-semibold text-[20px]">
        Who are you swapping with today?
      </div>
      <div className={cc(["flex"])}>
        <input
          id="search"
          name="search"
          type="search"
          className={cc([
            "w-full h-5 px-4 py-3 border",
            {
              "bg-[#bbf7d0]": validatedAddressToSwap && inputAddress,
              "border-red-500": inputAddress && !validatedAddressToSwap,
            },
          ])}
          placeholder="Search username, address or ENS"
          onChange={(e) => setInputAddress(e.target.value)}
        />
      </div>
    </div>
  );
};
