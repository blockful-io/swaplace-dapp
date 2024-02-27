/* eslint-disable import/no-named-as-default */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default-member */
import { MagnifyingGlassIcon, SwapContext } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useContext, useEffect } from "react";
import { useTheme } from "next-themes";
import { ENS } from "web3-eth-ens";
import cc from "classcat";
import Web3 from "web3";

export const SearchBar = () => {
  const {
    setInputAddress,
    inputAddress,
    validateAddressToSwap,
    setUserJustValidatedInput,
    setValidatedAddressToSwap
  } = useContext(SwapContext);

  const { authenticatedUserAddress } = useAuthenticatedUser();

  const { theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars

  const validateUser = (ensNameAddress: string | null) => {
    if (!authenticatedUserAddress) return;

    validateAddressToSwap(authenticatedUserAddress, ensNameAddress);
  };

  const getUserAddress = async () => {
    if (inputAddress) {
      if (!process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_HTTP) {
        throw new Error(
          "Cannot get ENS address without Alchemy Ethereum Mainnet API key",
        );
      }

      const provider = new Web3.providers.HttpProvider(
        process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_HTTP,
      );

      const ens = new ENS(undefined, provider);

      const formattedAddress = inputAddress.toLowerCase().includes(".")
        ? inputAddress.toLowerCase().includes(".eth")
          ? inputAddress.split(".")[1].length >= 3
            ? inputAddress
            : `${inputAddress.split(".")[0]}.eth`
          : inputAddress.split(".")[1].length >= 3
          ? inputAddress
          : `${inputAddress.split(".")[0]}.eth`
        : `${inputAddress}.eth`;

      try {
        const address: unknown = await ens.getOwner(formattedAddress);

        if (typeof address !== "string") return;
        validateUser(address);
      } catch (e) {
        console.error(e);
      } finally {
        setUserJustValidatedInput(true);
      }
    }
  };

  useEffect(() => {
    setValidatedAddressToSwap("");
    const requestDelay = setTimeout(() => {
      setUserJustValidatedInput(false);
      getUserAddress();
    }, 2000);
    return () => clearTimeout(requestDelay);
  }, [inputAddress]);

  return (
    <div className="w-[95%] h-auto py-5 gap-3 flex flex-col rounded  ">
      <div className="w-full flex justify-between space-x-6">
        <h2 className="title-h3-normal dark:title-h3-normal-dark">
          Who are you swapping with today?
        </h2>
      </div>
      <div
        className={cc([
          "flex items-center border rounded-xl pl-4 pr-3 gap-4 dark:bg-[#212322] dark:border-[#353836] dark:hover:border-[#edff6259] dark:shadow-[0_0_6px_1px_#0000004b] dark:hover:shadow-[0_0_6px_1px_#84980027]",
        ])}
      >
        <div className="justify-center items-center">
          <MagnifyingGlassIcon
            className="w-5"
            fill={cc([theme == "dark" ? "#353836" : "#EEE"])}
          />
        </div>
        <input
          id="search"
          name="search"
          type="search"
          className={cc([
            `h-11 w-full border-gray-100 focus:ring-0 focus:ring-transparent focus:outline-none focus-visible:border-gray-300 placeholder:p-small
             dark:border-none dark:bg-transparent`,
          ])}
          placeholder="Search username, address or ENS"
          onChange={({ target }) => setInputAddress(target.value)}
        />
      </div>
    </div>
  );
};