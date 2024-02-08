/* eslint-disable import/no-named-as-default */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-named-as-default-member */
import { MagnifyingGlassIcon } from "@/components/01-atoms/icons";
import { SwapContext } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { ENS } from "web3-eth-ens";
import cc from "classcat";
import Web3 from "web3";

export const SearchBar = () => {
  const { setInputAddress, inputAddress, validateAddressToSwap } =
    useContext(SwapContext);

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
  const { theme } = useTheme();

  const [ensNameAddress, setEnsNameAddress] = useState("");
  const [loadingENSaddress, setLoadingENSaddress] = useState(false);
  useEffect(() => {
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
            : `${inputAddress}.eth`,
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
    <div className="w-[95%] h-auto p-5 gap-3 flex flex-col rounded  ">
      <div className="w-full flex justify-between space-x-6">
        <h2 className="title-h3-normal dark:title-h3-normal-dark">
          Who are you swapping with today?
        </h2>
      </div>
      <div className={cc(["flex relative items-center"])}>
        <input
          id="search"
          name="search"
          type="search"
          className={cc([
            "dark:bg-[#212322] w-full h-11 px-4 py-3 border-2 border-gray-100 dark:border-[#353836]   focus:ring-0 focus:ring-transparent focus:outline-none focus-visible:border-gray-300 rounded-xl placeholder:p-small dark:placeholder:p-small ",
          ])}
          placeholder="Search username, address or ENS"
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
                fill={cc([
                  theme == "light"
                    ? !!inputAddress && theme == "light"
                      ? "black"
                      : "#EEE"
                    : !!inputAddress && theme == "dark"
                    ? "#EEE"
                    : "black",
                ])}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
