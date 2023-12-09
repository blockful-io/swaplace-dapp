import cc from "classcat";
import { useContext, useEffect } from "react";
import { SwapContext } from ".";

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
            "w-full h-5 px-4 py-3 border focus-visible:outline-[#f2f2f2] ",
            { "bg-slate-100 ": inputIsTyping == null },
            {
              "bg-[#bbf7d0]": validatedAddressToSwap && inputAddress,
              "border-red-500":
                inputAddress &&
                !validatedAddressToSwap &&
                inputIsTyping == false,
            },
          ])}
          placeholder="Search username, address or ENS"
          onChange={(e) => setInputAddress(e.target.value)}
        />
        <div className="flex justify-center items-center rounded-md">
          <button
            disabled={!inputAddress}
            className="disabled:bg-gray-200 disabled:text-gray-700 p-3  "
            onClick={() => {
              validateAddressToSwap();
            }}
            type="submit"
            style={{
              backgroundImage: "url('/Search.svg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
              width: "50%",
              height: "50%",
            }}
          />
        </div>
      </div>
    </div>
  );
};
