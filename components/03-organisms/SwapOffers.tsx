import { SwapOfferCard } from "../02-molecules/SwapOfferCard";
import {
  TokenOfferDetails,
  SwapIcon,
  TokensOfferSkeleton,
} from "@/components/01-atoms";
import { usePonder } from "@/lib/client/hooks/usePonder";
import { EthereumAddress, Token } from "@/lib/shared/types";
import { retrieveDataFromTokensArray } from "@/lib/client/blockchain-utils";
import cc from "classcat";
import { useEffect, useState } from "react";

interface TokenOffersConfig {
  place?: string;
}

export interface SwapOfferInterface {
  status: string;
  expiryDate?: string;
  bid: {
    address?: EthereumAddress;
    tokens: Token[];
  };
  ask: {
    address?: EthereumAddress;
    tokens: Token[];
  };
}

export const SwapOffers = ({}: TokenOffersConfig) => {
  const { allSwaps, isPonderSwapsLoading } = usePonder();
  const [isLoading, setIsLoading] = useState(true);

  const [allTokensListByPonder, setAllTokensListByPonder] = useState<
    SwapOfferInterface[]
  >([]);

  /**
   * The horizonalVariant from TokenOffers get the data from Ponder
   * This variant will handle the offers to the authenticatedUserAddress
   *
   * @returns
   */

  useEffect(() => {
    allSwaps && processSwaps();
  }, [allSwaps]);

  async function processSwaps() {
    setIsLoading(true);

    const tokensTokenizedPromises = allSwaps.map(async (swap) => {
      const expiry = swap.expiry.toString();
      const allowed = new EthereumAddress(
        "0x" + BigInt(swap.allowed!).toString(16),
      );

      const owner = new EthereumAddress(swap.owner);

      const date = new Date(Number(expiry) * 1000);
      let isDateValid = true;

      console.log(expiry);

      // Check if the date is valid
      if (isNaN(date.getTime())) {
        isDateValid = false;
      }

      const day = date.getDate(); // Day of the month
      const month = date.toLocaleString("default", { month: "short" }); // Month abbreviation
      const year = date.getFullYear(); // Year

      // Format the date string
      const formattedDate = isDateValid ? `${day} ${month}, ${year}` : null;

      const formattedAskArray = await retrieveDataFromTokensArray(swap.ask);
      const formattedBidArray = await retrieveDataFromTokensArray(swap.bid);
      return {
        status: swap.status,
        expiryDate: formattedDate ?? "",
        ask: { address: owner, tokens: formattedAskArray },
        bid: { address: allowed, tokens: formattedBidArray },
      };
    });
    EthereumAddress;
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
        return <SwapOffer key={index} swap={swap} />;
      })}
    </div>
  );
};

interface SwapOfferProps {
  swap: SwapOfferInterface;
}

const SwapOffer = ({ swap }: SwapOfferProps) => {
  return (
    <div className="flex flex-col border border-[#353836] dark:shadow-add-manually-card dark:bg-[#282B29] rounded-lg ">
      <div className="flex flex-row border-b dark:border-[#353836] relative">
        <div className={cc(["border-r dark:border-[#353836]"])}>
          <SwapOfferCard
            tokens={swap?.ask.tokens}
            address={swap?.ask.address ?? null}
          />
        </div>
        <div>
          <SwapOfferCard
            tokens={swap?.bid.tokens}
            address={swap?.bid.address ?? null}
          />
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#707572] bg-[#212322] rounded-[100px] w-[24px] h-[24px] items-center flex justify-center">
          <SwapIcon />
        </div>
      </div>
      <div className="flex-col">
        <TokenOfferDetails swap={swap} />
      </div>
    </div>
  );
};
