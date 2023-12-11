import cc from "classcat";
import { useContext, useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  SelectAuthedUserChain,
  SelectDestinyChain,
  SwapContext,
} from ".";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { ENS } from "web3-eth-ens";
import Web3 from "web3";

export const SearchBar = () => {
  const {
    setInputAddress,
    inputAddress,
    validatedAddressToSwap,
    validateAddressToSwap,
    userJustValidatedInput,
  } = useContext(SwapContext);

  const { authenticatedUserAddress } = useAuthenticatedUser();

  const [validateAfterENSaddressLoads, setValidateAfterENSaddressLoads] =
    useState(false);
  const validateInput = () => {
    if (authenticatedUserAddress) {
      if (loadingENSaddress) {
        setValidateAfterENSaddressLoads(true);
      } else {
        validateAddressToSwap(authenticatedUserAddress, ensNameAddress);
      }
    }
  };

  const [ensNameAddress, setEnsNameAddress] = useState("");
  const [loadingENSaddress, setLoadingENSaddress] = useState(false);
  useEffect(() => {
    if (inputAddress) {
      if (!process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_HTTP) {
        throw new Error(
          "Cannot get ENS address without Alchemy Ethereum Mainnet API key"
        );
      }

      const provider = new Web3.providers.HttpProvider(
        process.env.NEXT_PUBLIC_ALCHEMY_ETHEREUM_HTTP
      );

      const ens = new ENS(undefined, provider);

      ens
        .getOwner(
          inputAddress.toLowerCase().includes(".")
            ? inputAddress.toLowerCase().includes(".eth")
              ? inputAddress.split(".")[1].length >= 3
                ? inputAddress
                : `${inputAddress.split(".")[0]}.eth`
              : inputAddress.split(".")[1].length >= 3
              ? inputAddress
              : `${inputAddress.split(".")[0]}.eth`
            : `${inputAddress}.eth`
        )
        .then((address: unknown) => {
          if (typeof address == "string") {
            setEnsNameAddress(address);
            setLoadingENSaddress(false);
          } else {
            setEnsNameAddress("");
            setLoadingENSaddress(false);
          }
        })
        .catch(() => {
          setEnsNameAddress("");
          setLoadingENSaddress(false);
        });
    }
  }, [inputAddress]);

  useEffect(() => {
    if (!loadingENSaddress && validateAfterENSaddressLoads) {
      validateInput();
      setValidateAfterENSaddressLoads(false);
    }
  }, [loadingENSaddress]);

  return (
    <div className="w-[95%] h-auto bg-[#f8f8f8] p-5 gap-3 flex flex-col rounded border-2 border-gray-200">
      <div className="w-full flex justify-between space-x-6">
        <h2 className="font-light text-xl">Who are you swapping with today?</h2>
      </div>
      <div className={cc(["flex relative items-center"])}>
        <input
          id="search"
          name="search"
          type="search"
          className={cc([
            "w-full h-11 px-4 py-3 border-2 border-gray-100 focus:ring-0 focus:ring-transparent focus:outline-none focus-visible:border-gray-300 rounded",
            { "bg-white ": !userJustValidatedInput },
            {
              "!border-green-500":
                validatedAddressToSwap &&
                inputAddress &&
                userJustValidatedInput,
              "border-red-500":
                (inputAddress &&
                  !validatedAddressToSwap &&
                  userJustValidatedInput) ||
                (userJustValidatedInput && !inputAddress),
            },
          ])}
          placeholder="Search for an address or ENS name"
          onChange={(e) => setInputAddress(e.target.value)}
        />
        <div className="absolute right-2 justify-center items-center">
          <div
            role="button"
            onClick={validateInput}
            className={cc([!inputAddress && "cursor-not-allowed"])}
          >
            <button
              disabled={!inputAddress}
              className="pointer-events-none p-3 pr-1"
              type="submit"
            >
              <MagnifyingGlassIcon
                className="w-6"
                fill={!!inputAddress ? "black" : "#EEE"}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full z-40 flex items-center justify-between py-1">
        <div className="flex flex-col space-y-2">
          <p className="font-medium">Your network:</p>
          <SelectAuthedUserChain />
        </div>
        <div className="flex flex-col space-y-2">
          <p className="font-medium">Searched address network:</p>
          <div className="ml-auto">
            <SelectDestinyChain />
          </div>
        </div>
      </div>
    </div>
  );
};
