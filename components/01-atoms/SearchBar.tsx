import cc from "classcat";
import { useState } from "react";
import { EthereumAddress } from "@/lib/shared/types";

interface ISearchBar {
  onInputChange: (_: string) => void;
}

export const SearchBar = ({ onInputChange }: ISearchBar) => {
  const [inputIsValid, setInputIsValid] = useState(false);

  const validateAddress = (searchInput: string) => {
    setInputIsValid(true);

    try {
      const ethAddress = new EthereumAddress(searchInput);
    } catch (event: any) {
      setInputIsValid(false);
    }
  };

  const handleInputChange = (event: { target: { value: string } }) => {
    validateAddress(event.target.value);
    onInputChange(event.target.value);
  };

  return (
    <div
      className={cc([
        "w-[1120px]  h-auto bg-[#f2f2f2] p-5 gap-3 flex flex-col ",
      ])}
    >
      <div className="flex font-semibold text-[20px]">
        Who are you swapping with today?
      </div>
      <div className={cc(["flex"])}>
        <input
          id="search"
          name="search"
          type="search"
          className={cc([
            "w-full h-5 px-4 py-3 border ",
            inputIsValid ? "bg-[#bbf7d0]" : "border-red-500",
          ])}
          placeholder="Search username, address or ENS"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
