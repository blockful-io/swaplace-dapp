/* eslint-disable react-hooks/exhaustive-deps */
import { TokensShelf, TokensShelfVariant } from "@/components/03-organisms";
import {
  SearchItemsShelf,
  SwapContext,
  SwappingShelfID,
  TokensShelfTab,
} from "@/components/01-atoms/";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useContext, useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import cc from "classcat";

/**
 * SwappingShelfs Component
 *
 * React component that display of tokens swapping shelves.
 *
 * @return The rendered SwappingShelfs component.
 */
export const SwappingShelfs = () => {
  const { chain } = useNetwork();
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const [activeSwappingShelfID, setActiveSwappingShelfID] =
    useState<SwappingShelfID>(SwappingShelfID.THEIR_ITEMS);

  const {
    setAuthenticatedUserTokensList,
    setSearchedUserTokensList,
    setInputAddress,
  } = useContext(SwapContext);

  useEffect(() => {
    setAuthenticatedUserTokensList([]);
    setSearchedUserTokensList([]);
    setInputAddress("");
  }, [chain, authenticatedUserAddress]);

  return (
    <div className="w-full h-full dark:bg-[#212322] dark:border-[#353836] border border-[#D6D5D5] rounded-2xl dark:shadow-swap-station shadow-swap-station-light">
      <div className="flex items-center justify-between max-h-[48px] border-b dark:border-[#313131] pr-2">
        <div className="flex max-w-[224px]">
          <TokensShelfTab
            setActiveSwappingShelfID={(input) =>
              setActiveSwappingShelfID(input)
            }
          />
        </div>
        <div>
          <SearchItemsShelf />
        </div>
      </div>
      <div className="p-5">
        <div className={cc([activeSwappingShelfID ? "hidden" : "block"])}>
          <TokensShelf variant={TokensShelfVariant.Their} />
        </div>
        <div className={cc([activeSwappingShelfID ? "block" : "hidden"])}>
          <TokensShelf variant={TokensShelfVariant.Your} />
        </div>
      </div>
    </div>
  );
};
