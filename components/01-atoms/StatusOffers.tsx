export const StatusOffers = () => {
  enum FilterOptions {
    ALL_OFFERS = "All offers",
    ACTIVE = "Active",
    ACCEPTED = "Accepted",
    REJECTED = "Rejected",
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
    [FilterOptions.ACTIVE]: {
      id: 2,
      name: FilterOptions.ACTIVE,
    },
    [FilterOptions.ACCEPTED]: {
      id: 3,
      name: FilterOptions.ACCEPTED,
    },
    [FilterOptions.REJECTED]: {
      id: 4,
      name: FilterOptions.REJECTED,
    },
    [FilterOptions.EXPIRED]: {
      id: 5,
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
            className="h-11 shadow border hover:border-[#505150] group border-[#353836] rounded-[10px] flex justify-between items-center px-3 dark:bg-[#212322] bg-[#F2F2F2] mb-3 dark:active:shadow-[rgba(131,152,0,.15)] dark:active:shadow-[0_0_8px_1px]"
            key={index}
          >
            <div className="dark:group-hover:text-[#DDF23D] group-hover:text-[#212322] dark:p-medium-bold-2-dark p-medium-bold-2">
              {name}
            </div>
            <div className=" dark:bg-[#353836] bg-[#c7c7c7] rounded px-2 w-9 h-6 flex justify-center items-center dark:p-small-dark p-small  ">
              {id}
            </div>
          </div>
        );
      })}
    </>
  );
};
