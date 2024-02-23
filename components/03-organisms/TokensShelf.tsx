import { ChainInfo, TokensQueryStatus } from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import {
  getERC721TokensFromAddress,
  getERC20TokensFromAddress,
} from "@/lib/client/blockchain-data";
import { EthereumAddress, Token } from "@/lib/shared/types";
import { TokensList } from "@/components/02-molecules";
import { SelectUserIcon, SwapContext } from "@/components/01-atoms";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useNetwork } from "wagmi";
/* eslint-disable react-hooks/exhaustive-deps */

interface TokensShelfProps {
  address: string | null;
}

/**
 *
 * The Shelf component display the tokens of a given address.
 * @param address
 *
 * @returns Tokens Shelf based in status of given address
 */
export const TokensShelf = ({ address }: TokensShelfProps) => {
  const { chain } = useNetwork();
  const [tokenList, setTokensList] = useState<Token[]>([]);
  const [tokensQueryStatus, setTokensQueryStatus] = useState<TokensQueryStatus>(
    TokensQueryStatus.EMPTY_QUERY,
  );
  const { theme } = useTheme();

  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { validatedAddressToSwap, inputAddress, destinyChain } =
    useContext(SwapContext);

  useEffect(() => {
    const chainId =
      address === authenticatedUserAddress?.address
        ? chain?.id
        : ChainInfo[destinyChain].id;

    let queriedTokens = [...tokenList];
    let tokensCount = tokenList.length;

    if (address && chainId) {
      setTokensQueryStatus(TokensQueryStatus.LOADING);

      Promise.all([
        getERC721TokensFromAddress(address, chainId).then((tokens) => {
          queriedTokens = [...queriedTokens, ...tokens];
          tokensCount = tokensCount + tokens.length;
        }),
        getERC20TokensFromAddress(address, chainId).then((tokens) => {
          queriedTokens = [...queriedTokens, ...tokens];
          tokensCount = tokensCount + tokens.length;
        }),
      ])
        .catch(() => {
          setTokensQueryStatus(TokensQueryStatus.ERROR);
          queriedTokens = [];
        })
        .finally(() => {
          if (tokensCount === 0) {
            setTokensQueryStatus(TokensQueryStatus.NO_RESULTS);
          } else {
            console.log(queriedTokens);
            setTokensList(queriedTokens);
            setTokensQueryStatus(TokensQueryStatus.WITH_RESULTS);
          }
        });
    }
  }, [address, chain, destinyChain]);

  const conditionallyCleanTokensList = (condition: boolean) => {
    if (condition) {
      setTokensList([]);
      setTokensQueryStatus(TokensQueryStatus.EMPTY_QUERY);
    }
  };

  useEffect(() => {
    conditionallyCleanTokensList(
      !!authenticatedUserAddress &&
        !!address &&
        authenticatedUserAddress.equals(new EthereumAddress(address)),
    );
  }, [destinyChain]);

  useEffect(() => {
    conditionallyCleanTokensList(address !== authenticatedUserAddress?.address);
  }, [chain]);

  useEffect(() => {
    conditionallyCleanTokensList(
      address !== authenticatedUserAddress?.address &&
        validatedAddressToSwap !== authenticatedUserAddress?.address,
    );
  }, [inputAddress]);

  useEffect(() => {
    conditionallyCleanTokensList(!validatedAddressToSwap);
  }, [validatedAddressToSwap]);

  useEffect(() => {
    conditionallyCleanTokensList(!authenticatedUserAddress);
  }, [authenticatedUserAddress]);

  return (
    <div className="w-full  flex border-1 border-gray-200 border-t-0 rounded-2xl rounded-t-none overflow-auto bg-[#f8f8f8] dark:bg-[#212322] lg:max-w-[580px] md:h-[540px]">
      {tokensQueryStatus == TokensQueryStatus.WITH_RESULTS && tokenList ? (
        <div className="w-full h-full">
          <TokensList ownerAddress={address} tokensList={tokenList} />
        </div>
      ) : tokensQueryStatus == TokensQueryStatus.EMPTY_QUERY || !address ? (
        <div className="flex w-full h-full bg-[#f8f8f8] dark:bg-[#212322] p-4 justify-center items-center ">
          <div className="flex-col flex  items-center space-y-4">
            <div className="w-[80px] h-[80px] flex items-center border-[3px] rounded-full dark:border-[#DDF23D] border-[#A3A9A5] ">
              <SelectUserIcon
                className="w-[100px]"
                fill={theme == "dark" ? "#DDF23D" : "#A3A9A5"}
              />
            </div>
            <p className="dark:text-[#F6F6F6] font-onest font-medium text-[16px] leading-[20px]">
              No user selected yet
            </p>
            <p className="dark:text-[#A3A9A5] font-onest font-normal text-[14px] leading-[20px]">
              Search for a user to start swapping items
            </p>
          </div>
        </div>
      ) : tokensQueryStatus == TokensQueryStatus.NO_RESULTS ? (
        <div className="flex justify-center w-full h-[450px] bg-[#f8f8f8] dark:bg-[#212322] p-4">
          <div className="flex items-center">
            <p className="dark:text-[#F6F6F6] font-onest font-medium text-[16px] leading-[20px]">
              Given address has no tokens associated in the given network
            </p>
          </div>
        </div>
      ) : tokensQueryStatus == TokensQueryStatus.LOADING ? (
        <div className="flex justify-center w-full h-[450px] bg-[#f8f8f8] dark:bg-[#212322] p-4">
          <div className="flex items-center">
            <p className="dark:text-[#F6F6F6] font-onest font-medium text-[16px] leading-[20px]">
              Loading tokens of{" "}
              {new EthereumAddress(address).getEllipsedAddress()}...
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
