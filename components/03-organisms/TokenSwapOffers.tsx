import { CardSwapOffer } from "../02-molecules/CardSwapOffer";
import {
  TokenOfferDetails,
  SwapIcon,
  TokensOfferSkeleton,
} from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { usePonder } from "@/lib/client/hooks/usePonder";
import { Token, TokenType } from "@/lib/shared/types";
import { retrieveDataFromTokensArray } from "@/lib/client/blockchain-utils";
import cc from "classcat";
import { useEffect, useState } from "react";

interface TokenOffersConfig {
  place?: string;
}

export const TokenSwapOffers = ({}: TokenOffersConfig) => {
  const { allSwaps, isPonderSwapsLoading } = usePonder();
  const [isLoading, setIsLoading] = useState(true);

  const [allTokensListByPonder, setAllTokensListByPonder] = useState<
    {
      bid: Token[];
      ask: Token[];
    }[]
  >([]);

  /**
   * The horizonalVariant from TokenOffers get the data from Ponder
   * This variant will handle the offers to the authenticatedUserAddress
   *
   * @returns
   */

  console.log("allSwaps ", allSwaps);

  TokenType.ERC20;
  console.log("allTokensListByPonder :", allTokensListByPonder);

  useEffect(() => {
    allSwaps && processSwaps();
  }, [allSwaps]);

  async function processSwaps() {
    setIsLoading(true);

    const tokensTokenizedPromises = allSwaps.map(async (swap) => {
      const formattedAskArray = await retrieveDataFromTokensArray(swap.ask);
      const formattedBidArray = await retrieveDataFromTokensArray(swap.bid);
      return {
        ask: formattedAskArray,
        bid: formattedBidArray,
      };
    });

    // Wait for all promises to resolve
    const tokensTokenized = await Promise.all(tokensTokenizedPromises);
    setIsLoading(false);
    setAllTokensListByPonder(tokensTokenized);
  }

  return isLoading || isPonderSwapsLoading ? (
    <TokensOfferSkeleton />
  ) : allTokensListByPonder.length === 0 ? (
    <div className="w-full ">
      <h1 className="text-center">
        You don&apos;t have any swaps in that category
      </h1>
    </div>
  ) : (
    <div className="flex flex-col gap-5">
      {allTokensListByPonder.map((swap, index) => {
        return (
          <TokenSwapOffer isLoading={isLoading} key={index} swapTokens={swap} />
        );
      })}
    </div>
  );
};

interface TokenSwapOfferProps {
  isLoading: boolean;
  swapTokens?: {
    bid: Token[];
    ask: Token[];
  };
}

const TokenSwapOffer = ({ swapTokens }: TokenSwapOfferProps) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();

  return (
    <div className="flex flex-col border border-[#353836] dark:shadow-add-manually-card dark:bg-[#282B29] rounded-lg ">
      <div className="flex flex-row border-b dark:border-[#353836] relative">
        <div className={cc(["border-r dark:border-[#353836]"])}>
          <CardSwapOffer
            tokens={swapTokens?.ask}
            address={authenticatedUserAddress}
          />
        </div>
        <div>
          <CardSwapOffer
            tokens={swapTokens?.bid}
            address={authenticatedUserAddress}
          />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#707572] bg-[#212322] rounded-[100px] w-[24px] h-[24px] items-center flex justify-center">
          <SwapIcon />
        </div>
      </div>
      <div className="flex-col">
        {/* expiry, status, and created by who  */}
        <TokenOfferDetails />
      </div>
    </div>
  );
};
