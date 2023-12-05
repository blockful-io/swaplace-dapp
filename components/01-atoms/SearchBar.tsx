import { EthereumAddress } from "@/lib/shared/types";
import React, { useState } from "react";
import cc from "classcat";

export const SearchBar = () => {
  const [inputIsValid, setInputIsValid] = useState(false);

  const validateAddress = (searchInput: string) => {
    setInputIsValid(true);

    try {
      const ethAddress = new EthereumAddress(searchInput);
    } catch (event) {
      setInputIsValid(false);
    }
  };

  const handleInputChange = (event: { target: { value: string } }) => {
    validateAddress(event.target.value);
  };

  return (
    <div
      className={cc([
        "w-[1120px]  h-[120px] bg-[#f2f2f2] p-5 gap-3 flex flex-col ",
      ])}
    >
      <div className="flex font-semibold text-[20px]">
        Who are you swapping with today?
      </div>
      <div className={cc(["flex"])}>
        <input
          type="search"
          className={cc([
            "w-full border focus:none",
            inputIsValid ? "bg-[#bbf7d0]" : "border-[#e20e0e]",
          ])}
          placeholder="Search username, address or ENS"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
