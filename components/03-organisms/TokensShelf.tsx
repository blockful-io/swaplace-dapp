import { ChainInfo, TokensQueryStatus } from "@/lib/client/constants";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import {
  getERC721TokensFromAddress,
  getERC20TokensFromAddress,
} from "@/lib/client/blockchain-utils";
import { TokensList } from "@/components/02-molecules";
import { SelectUserIcon } from "@/components/01-atoms";
import { useSupportedNetworks } from "@/lib/client/hooks/useSupportedNetworks";
import { Token } from "@/lib/shared/types";
import { ShelfContext } from "@/lib/client/contexts/ShelfContext";
import { SwapContext } from "@/lib/client/contexts";
import { useContext, useEffect, useState } from "react";
import { useNetwork } from "wagmi";
/* eslint-disable react-hooks/exhaustive-deps */

export enum ForWhom {
  Yours,
  Their,
}

/**
 *
 * The Shelf component display the tokens of a given address.
 * @param address
 *
 * @returns Tokens Shelf based in status of given address
 */
export const TokensShelf = ({ variant }: { variant: ForWhom }) => {
  const { chain } = useNetwork();
  const { isNetworkSupported } = useSupportedNetworks();
  const {
    yourTokensList,
    setYourTokensList,
    setTheirTokensList,
    theirTokensList,
    yourManuallyAddedTokensList,
    theirManuallyAddedTokensList,
  } = useContext(ShelfContext);
  const [tokensQueryStatus, setTokensQueryStatus] = useState<TokensQueryStatus>(
    theirTokensList.length > 0 || yourTokensList.length > 0
      ? TokensQueryStatus.WITH_RESULTS
      : TokensQueryStatus.EMPTY_QUERY,
  );

  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { validatedAddressToSwap, destinyChain } = useContext(SwapContext);

  const address =
    variant === ForWhom.Their
      ? validatedAddressToSwap
      : authenticatedUserAddress;

  const getUserTokens = async () => {
    const chainId = authenticatedUserAddress?.equals(address)
      ? chain?.id
      : ChainInfo[destinyChain].id;

    let queriedTokens: Token[] = [];
    let tokensCount =
      variant === ForWhom.Their
        ? theirTokensList.length
        : yourTokensList.length;

    if (address && chainId && !!authenticatedUserAddress) {
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
            variant === ForWhom.Their
              ? setTheirTokensList(queriedTokens)
              : setYourTokensList(queriedTokens);
            setTokensQueryStatus(TokensQueryStatus.WITH_RESULTS);
          }
        });
    }
  };

  /// Add Manually Token to TokensList & update Shelf
  useEffect(() => {
    setTheirTokensList([...theirTokensList, ...theirManuallyAddedTokensList]);
  }, [theirManuallyAddedTokensList]);

  useEffect(() => {
    setYourTokensList([...yourTokensList, ...yourManuallyAddedTokensList]);
  }, [yourManuallyAddedTokensList]);

  useEffect(() => {
    if (variant === ForWhom.Yours && yourTokensList.length === 0) {
      if (!!authenticatedUserAddress && isNetworkSupported) getUserTokens();
    }
  }, [yourTokensList, authenticatedUserAddress, isNetworkSupported]);

  useEffect(() => {
    if (variant === ForWhom.Their && theirTokensList.length === 0) {
      if (!!validatedAddressToSwap && isNetworkSupported && !!destinyChain) {
        getUserTokens();
      }
    }
  }, [
    theirTokensList,
    validatedAddressToSwap,
    isNetworkSupported,
    destinyChain,
  ]);

  useEffect(() => {
    conditionallyCleanTokensList(!!validatedAddressToSwap);
  }, [validatedAddressToSwap]);

  // useEffect(() => {
  //   conditionallyCleanTokensList(variant === ForWhom.Yours);
  // }, [authenticatedUserAddress]);

  const conditionallyCleanTokensList = (condition: boolean) => {
    if (condition) {
      if (variant === ForWhom.Their) {
        setTheirTokensList([]);
        setTokensQueryStatus(TokensQueryStatus.EMPTY_QUERY);
      } else {
        setYourTokensList([]);
        setTokensQueryStatus(TokensQueryStatus.EMPTY_QUERY);
      }
    }
  };

  // useEffect(() => {
  //   conditionallyCleanTokensList(
  //     !!authenticatedUserAddress &&
  //       !!address &&
  //       authenticatedUserAddress.equals(address) &&
  //       variant === ForWhom.Their,
  //   );
  //   console.log("resetou ao trocar a variante?");
  // }, [variant]);

  // useEffect(() => {
  //   conditionallyCleanTokensList(
  //     !!authenticatedUserAddress &&
  //       !!address &&
  //       authenticatedUserAddress.equals(address),
  //   );
  //   console.log("resetou trocar chain de destino");
  // }, [destinyChain]);

  // useEffect(() => {
  //   conditionallyCleanTokensList(
  //     !authenticatedUserAddress?.equals(address) && variant === ForWhom.Their,
  //   );
  //   console.log("resetou trocar chain dnvo");
  // }, [chain]);

  // useEffect(() => {
  //   conditionallyCleanTokensList(
  //     !authenticatedUserAddress?.equals(address) &&
  //       !validatedAddressToSwap?.equals(authenticatedUserAddress) &&
  //       variant === ForWhom.Their,
  //   );
  // }, [inputAddress]);

  // useEffect(() => {
  //   conditionallyCleanTokensList(!isNetworkSupported);
  //   console.log("resetou mais uma vez com troca de rede supported");
  // }, [isNetworkSupported]);

  const allTokensList =
    variant === ForWhom.Their ? theirTokensList : yourTokensList;

  return (
    <div className="w-full flex rounded-t-none overflow-y-auto lg:max-w-[600px] h-[356px] no-scrollbar">
      {tokensQueryStatus == TokensQueryStatus.WITH_RESULTS &&
      allTokensList.length > 0 ? (
        <div className="flex h-full w-full justify-center items-center no-scrollbar ">
          <TokensList
            ownerAddress={address}
            tokensList={allTokensList}
            variant={variant}
            isToken3D={true}
          />
        </div>
      ) : tokensQueryStatus == TokensQueryStatus.EMPTY_QUERY || !address ? (
        <div className="flex w-full h-full bg-inherit  justify-center items-center">
          <div className="flex-col flex items-center gap-5">
            <div className="w-[80px] h-[80px] flex items-center border-[3px] rounded-full dark:border-yellowGreen bordersageGray ">
              <SelectUserIcon className="w-[100px] dark:text-yellowGreen text-sageGray" />
            </div>
            <div className="flex items-center justify-center flex-col gap-1 text-center">
              <p className="p-normal-2-light dark:p-normal-2-dark contrast-50 text-[16px] leading-[20px]">
                {variant === ForWhom.Their && !!authenticatedUserAddress
                  ? "No user selected yet"
                  : "No wallet is connected yet"}
              </p>
              <p className="p-normal-2-light dark:p-normal-2-dark contrast-50 text-[14px] leading-[20px]">
                {variant === ForWhom.Their && !!authenticatedUserAddress
                  ? "Search for a user to start swapping items"
                  : variant === ForWhom.Their
                  ? "Sign in to search for users"
                  : "Sign in to see your tokens"}
              </p>
            </div>
          </div>
        </div>
      ) : tokensQueryStatus == TokensQueryStatus.NO_RESULTS ? (
        <div className="flex h-full w-full justify-center items-center no-scrollbar ">
          <TokensList
            ownerAddress={address}
            tokensList={allTokensList}
            variant={variant}
          />
        </div>
      ) : tokensQueryStatus == TokensQueryStatus.LOADING &&
        allTokensList.length === 0 ? (
        <div className="flex justify-center w-full h-full bg-faintGray dark:bg-midnightGreen p-4">
          <div className="flex items-center">
            <p className="dark:text-offWhite font-onest font-medium text-[16px] leading-[20px]">
              Loading tokens of {address.getEllipsedAddress()}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
