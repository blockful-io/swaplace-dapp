import { useState } from "react";
import cc from "classcat";

export const StatusOffers = () => {

  const [OfferIsActive, setOfferIsActive] = useState(0);

  enum FilterOptions {
    ALL_OFFERS = "All offers",
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

  return (
    <>
      {Object.keys(OffersFilter).map((key, index) => {
        const filterOption = key as FilterOptions;
        const { id, name } = OffersFilter[filterOption];

        return (
          <div
            className={ cc(["h-11 shadow border border-solid border-[#353836] flex justify-between items-center px-3 bg-[#F2F2F2] group rounded-[10px] dark:bg-[#212322] mb-3 dark:hover:bg-[#282B29] font-onest leading-5 ",
             OfferIsActive === index && "dark:shadow-[0px_0px_8px_1px_#83980026] dark:border-[#505150] dark:bg-[#212322]"])}
            key={index} onClick={()=> setOfferIsActive(index)}
          >
            <div className={cc(["dark:group-hover:text-[#F6F6F6]",
            OfferIsActive === index ? "dark:text-[#DDF23D]" : "dark:text-[#A3A9A5]"])}>
              {name}
            </div>
            <div className={cc(["bg-[#c7c7c7] rounded px-2 w-9 h-6 flex justify-center items-center dark:p-small-dark p-small dark:group-hover:bg-[#353836]",
            OfferIsActive === index ? "dark:bg-[#353836]" : "dark:bg-[#282B29]"])}>
              {id}
            </div>
          </div>
        );
      })}
    </>
  );
};
