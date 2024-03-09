import { useState, useContext, useEffect } from "react";
import cc from "classcat";
import { getGraphQuery } from "@/lib/client/hooks/ponderQueries";
import { SwapContext } from ".";

export const StatusOffers = () => {
  const { inputAddress } = useContext(SwapContext);
  const [offerIsActive, setOfferIsActive] = useState<number>(0);
  const [allSwaps, setAllSwaps] = useState<Swap[]>([]);

  enum FilterOptions {
    ALL_OFFERS = "All Offers",
    CREATED = "Created",
    RECEIVED = "Received",
    ACCEPTED = "Accepted",
    CANCELED = "Canceled",
    EXPIRED = "Expired",
  }

  interface IFilterOffers {
    id: number;
    name: FilterOptions;
  }

  interface Swap {
    swapId: string;
    status: string;
    owner: string;
    allowed: string | null;
    expiry: bigint;
    bid: string;
    ask: string;
    swapAccepted: string | null;
    swapCanceled: string | null;
    swapCreated: string | null;
  }

  const OffersFilter: Record<FilterOptions, IFilterOffers> = {
    [FilterOptions.ALL_OFFERS]: {
      id: 1,
      name: FilterOptions.ALL_OFFERS,
    },
    [FilterOptions.CREATED]: {
      id: 2,
      name: FilterOptions.CREATED,
    },
    [FilterOptions.RECEIVED]: {
      id: 3,
      name: FilterOptions.RECEIVED,
    },
    [FilterOptions.ACCEPTED]: {
      id: 4,
      name: FilterOptions.ACCEPTED,
    },
    [FilterOptions.CANCELED]: {
      id: 5,
      name: FilterOptions.CANCELED,
    },
    [FilterOptions.EXPIRED]: {
      id: 6,
      name: FilterOptions.EXPIRED,
    },
  };

  useEffect(() => {
    const fetchAllSwaps = async () => {
      try {
        const results = await getGraphQuery(inputAddress);
        setAllSwaps(results);
      } catch (error) {
        console.error("Failed to fetch swaps:", error);
      }
    };

    fetchAllSwaps();
  }, [inputAddress]);

  const handleFilterClick = (filterOption: FilterOptions, index: number) => {
    setOfferIsActive(index);
    console.log("All Swaps:", allSwaps);

    let filtered: any[] = [];
    switch (filterOption) {
      case FilterOptions.CREATED:
        filtered = allSwaps.filter((swap) => swap.status === "created");
        break;

      case FilterOptions.RECEIVED:
         filtered = allSwaps.filter((swap) => {
          swap.allowed === inputAddress && !swap.swapAccepted;
        });
        break;

      case FilterOptions.ACCEPTED:
        filtered = allSwaps.filter(
          (swap) => swap.swapAccepted === inputAddress,
        );
        break;

      case FilterOptions.CANCELED:
        filtered = allSwaps.filter((swap) => swap.status === "canceled");
        break;
      default:
        filtered = allSwaps;
    }

    console.log(
      "swapOwner",
      allSwaps[0].owner && allSwaps[0].owner.toUpperCase(),
    );
    console.log("InputAddress:", inputAddress.toUpperCase());
    console.log("filtered", filtered);
  };

  return (
    <>
      {Object.keys(OffersFilter).map((key, index) => {
        const filterOption = key as FilterOptions;
        const { id, name } = OffersFilter[filterOption];

        return (
          <div
            className={cc([
              "h-11 dark:shadow-swap-station border border-solid border-[#353836] flex justify-between items-center px-3 bg-[#F2F2F2] group rounded-[10px] dark:bg-[#212322] mb-3 font-onest leading-5",
              offerIsActive === index
                ? "dark:shadow-[0px_0px_8px_1px_#83980026] dark:border-[#505150] dark:bg-[#212322]"
                : "dark:hover:bg-[#282B29]",
            ])}
            key={index}
            onClick={() => handleFilterClick(filterOption, index)}
          >
            <div
              className={cc([
                offerIsActive === index
                  ? "dark:text-[#DDF23D]"
                  : "dark:text-[#A3A9A5] dark:group-hover:text-[#F6F6F6]",
              ])}
            >
              {name}
            </div>
            <div
              className={cc([
                "bg-[#c7c7c7] rounded px-2 w-9 h-6 flex justify-center items-center dark:p-small-dark p-small dark:group-hover:bg-[#353836]",
                offerIsActive === index
                  ? "dark:bg-[#353836]"
                  : "dark:bg-[#282B29]",
              ])}
            >
              {id}
            </div>
          </div>
        );
      })}
    </>
  );
};
