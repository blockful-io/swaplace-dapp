/* eslint-disable import/no-named-as-default */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default-member */
import { MagnifyingGlassIcon, SwapContext } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useContext, useEffect } from "react";
import { ENS } from "web3-eth-ens";
import cc from "classcat";
import Web3 from "web3";
import toast from "react-hot-toast";

export const SearchBar = () => {
  const {
    setInputAddress,
    inputAddress,
    validateAddressToSwap,
    setUserJustValidatedInput,
  } = useContext(SwapContext);

  const { authenticatedUserAddress } = useAuthenticatedUser();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars

  const validateUser = (ensNameAddress: string | null) => {
    validateAddressToSwap(authenticatedUserAddress, ensNameAddress);
  };

  const getUserAddress = async () => {
    if (inputAddress && authenticatedUserAddress) {
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
    } else if (inputAddress && !authenticatedUserAddress) {
      toast.error("Cannot get ENS address without connect your wallet");
    }
  };

  useEffect(() => {
    const requestDelay = setTimeout(() => {
      setUserJustValidatedInput(false);
      getUserAddress();
    }, 1500);
    return () => clearTimeout(requestDelay);
  }, [inputAddress]);

  return (
    <div className="gap-2 xl:w-full max-h-[72px] flex flex-col rounded">
      <div className="w-full flex justify-between space-x-6">
        <h2 className="p-normal-2-light dark:p-normal-2-dark contrast-50">
          Who are you swapping with today?
        </h2>
      </div>
      <div
        className={cc([
          "flex items-center border rounded-xl pl-4 pr-3 gap-4 bg-[#F6F6F6] hover:bg-[#F0EEEE75] hover:shadow-[0_0_6px_1px_#00000014] dark:bg-[#212322] border-[#E4E4E4] hover:border-[#AABE13] dark:border-[#353836] focus:border-[#FFFFFF] dark:hover:border-[#edff6259] dark:shadow-swap-station shadow-swap-connection-light transition duration-300 ease-in-out",
        ])}
      >
        <div className="justify-center items-center">
          <MagnifyingGlassIcon className="w-5 text-[#A3A9A5] dark:text-[#353836]" />
        </div>
        <input
          id="search"
          name="search"
          type="search"
          className={cc([
            `h-11 w-full border-gray-100 focus:ring-0 focus:ring-transparent focus:outline-none focus-visible:border-gray-300 placeholder:p-small text-ellipsis bg-inherit
             border-none dark:border-none bg-transparent dark:bg-transparent contrast-50`,
          ])}
          placeholder="Search username, address or ENS"
          onChange={({ target }) => setInputAddress(target.value)}
        />
      </div>
    </div>
  );
};
