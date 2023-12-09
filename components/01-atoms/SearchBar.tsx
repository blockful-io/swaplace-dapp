import cc from "classcat";
import { useContext, useEffect } from "react";
import { MagnifyingGlassIcon, SelectChain, SwapContext } from ".";
import toast from "react-hot-toast";

export const SearchBar = () => {
  const {
    setInputAddress,
    inputAddress,
    validatedAddressToSwap,
    validateAddressToSwap,
    setInputIsTyping,
    inputIsTyping,
  } = useContext(SwapContext);

  useEffect(() => {
    setInputIsTyping(null);
  }, [inputAddress]);

  return (
    <div className="w-[95%] h-auto bg-[#f8f8f8] p-5 gap-3 flex flex-col rounded border-2 border-gray-200">
      <div className="w-full flex justify-between space-x-6">
        <h2 className="font-light text-xl">Who are you swapping with today?</h2>

        <div className="z-30 flex items-center justify-center py-1">
          <SelectChain />
        </div>
      </div>
      <div className={cc(["flex relative items-center"])}>
        <input
          id="search"
          name="search"
          type="search"
          className={cc([
            "w-full h-11 px-4 py-3 border-2 border-gray-100 focus:ring-0 focus:ring-transparent focus:outline-none focus-visible:border-gray-300 rounded",
            { "bg-white ": inputIsTyping == null },
            {
              "border-[#bbf7d0]": validatedAddressToSwap && inputAddress,
              "border-red-500":
                inputAddress &&
                !validatedAddressToSwap &&
                inputIsTyping == false,
            },
          ])}
          placeholder="Search username, address or ENS"
          onChange={(e) => setInputAddress(e.target.value)}
        />
        <div className="absolute right-2 justify-center items-center">
          <div
            role="button"
            onClick={() => {
              if (!inputAddress) toast.error("Please type some address");
              else validateAddressToSwap();
            }}
          >
            <button
              disabled={!inputAddress}
              className="pointer-events-none p-3 pr-1"
              type="submit"
            >
              <MagnifyingGlassIcon
                className="w-6"
                fill={inputAddress ? "black" : "#EEE"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
