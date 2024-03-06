import { ChainInfo, TokensQueryStatus } from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import {
  getERC721TokensFromAddress,
  getERC20TokensFromAddress,
} from "@/lib/client/blockchain-utils";
import { EthereumAddress, Token } from "@/lib/shared/types";
import { TokensList } from "@/components/02-molecules";
import { SelectUserIcon, SwapContext } from "@/components/01-atoms";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useNetwork } from "wagmi";
/* eslint-disable react-hooks/exhaustive-deps */

export enum TokensShelfVariant {
  Your,
  Their,
}

interface TokensShelfProps {
  address: EthereumAddress | null;
  variant: TokensShelfVariant;
}

/**
 *
 * The Shelf component display the tokens of a given address.
 * @param address
 *
 * @returns Tokens Shelf based in status of given address
 */
export const TokensShelf = ({ address, variant }: TokensShelfProps) => {
  const { chain } = useNetwork();
  const [allTokensList, setAllTokensList] = useState<Token[]>([]);
  const [tokensQueryStatus, setTokensQueryStatus] = useState<TokensQueryStatus>(
    TokensQueryStatus.EMPTY_QUERY,
  );
  const { theme } = useTheme();

  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { validatedAddressToSwap, inputAddress, destinyChain } =
    useContext(SwapContext);

  const getUserTokens = async () => {
    const chainId = authenticatedUserAddress?.equals(address)
      ? chain?.id
      : ChainInfo[destinyChain].id;

    let queriedTokens: Token[] = [];
    let tokensCount = allTokensList.length;

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
            setAllTokensList(queriedTokens);
            setTokensQueryStatus(TokensQueryStatus.WITH_RESULTS);
          }
        });
    }
  };

  useEffect(() => {
    getUserTokens();
  }, [address, chain, destinyChain]);

  const conditionallyCleanTokensList = (condition: boolean) => {
    if (condition) {
      setAllTokensList([]);
      setTokensQueryStatus(TokensQueryStatus.EMPTY_QUERY);
    }
  };

  useEffect(() => {
    conditionallyCleanTokensList(
      !authenticatedUserAddress && variant === TokensShelfVariant.Your,
    );
  }, [authenticatedUserAddress]);

  useEffect(() => {
    conditionallyCleanTokensList(
      !!authenticatedUserAddress &&
        !!address &&
        authenticatedUserAddress.equals(address) &&
        variant === TokensShelfVariant.Their,
    );
  }, [variant]);

  useEffect(() => {
    conditionallyCleanTokensList(
      !!authenticatedUserAddress &&
        !!address &&
        authenticatedUserAddress.equals(address),
    );
  }, [destinyChain]);

  useEffect(() => {
    conditionallyCleanTokensList(
      !authenticatedUserAddress?.equals(address) &&
        variant === TokensShelfVariant.Their,
    );
  }, [chain]);

  useEffect(() => {
    conditionallyCleanTokensList(
      !authenticatedUserAddress?.equals(address) &&
        !validatedAddressToSwap?.equals(authenticatedUserAddress),
    );
  }, [inputAddress]);

  useEffect(() => {
    conditionallyCleanTokensList(
      !validatedAddressToSwap && variant === TokensShelfVariant.Their,
    );
  }, [validatedAddressToSwap]);

  return (
    <div className="w-full h-[360px] lg:h-[400px] flex border-1 border-gray-200 border-t-0 rounded-2xl rounded-t-none overflow-auto bg-[#f8f8f8] dark:bg-[#212322] lg:max-w-[580px]">
      {tokensQueryStatus == TokensQueryStatus.WITH_RESULTS && allTokensList ? (
        <div className="w-full h-full py-4 overflow-y-auto">
          <TokensList
            ownerAddress={address}
            tokensList={allTokensList}
            variant={variant}
          />
        </div>
      ) : tokensQueryStatus == TokensQueryStatus.EMPTY_QUERY || !address ? (
        <div className="flex w-full overflow-y-auto bg-[#f8f8f8] dark:bg-[#212322] p-4 justify-center items-center">
          <div className="flex-col flex items-center space-y-4">
            <div className="w-[80px] h-[80px] flex items-center border-[3px] rounded-full dark:border-[#DDF23D] border-[#A3A9A5]">
              <SelectUserIcon
                className="w-[100px]"
                fill={theme == "dark" ? "#DDF23D" : "#A3A9A5"}
              />
            </div>
            <p className="dark:text-[#F6F6F6] font-onest font-medium text-[16px] leading-[20px]">
              {variant === TokensShelfVariant.Their
                ? "No user selected yet"
                : "No wallet is connected yet"}
            </p>
            <p className="dark:text-[#A3A9A5] font-onest font-normal text-[14px] leading-[20px]">
              {variant === TokensShelfVariant.Their
                ? "Search for a user to start swapping items"
                : "Sign in to see your tokens"}
            </p>
          </div>
        </div>
      ) : tokensQueryStatus == TokensQueryStatus.NO_RESULTS ? (
        <div className="flex justify-center w-full bg-[#f8f8f8] dark:bg-[#212322] p-4">
          <div className="flex items-center">
            <p className="dark:text-[#F6F6F6] font-onest font-medium text-[16px] leading-[20px]">
              Given address has no tokens associated in the given network
            </p>
          </div>
        </div>
      ) : tokensQueryStatus == TokensQueryStatus.LOADING ? (
        <div className="flex justify-center w-full bg-[#f8f8f8] dark:bg-[#212322] p-4">
          <div className="flex items-center">
            <p className="dark:text-[#F6F6F6] font-onest font-medium text-[16px] leading-[20px]">
              Loading tokens of {address.getEllipsedAddress()}...
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
