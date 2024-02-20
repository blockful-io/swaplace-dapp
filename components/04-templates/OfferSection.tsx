import { FilterOffers, SwapOffersLayout } from "@/components/02-molecules";

export const OfferSection = () => {
  return (
    <section className="w-full h-full flex xl:flex-row flex-col items-center justify-center ">
      <div className="flex">
        <FilterOffers />
      </div>
      <div className="flex justify-center items-center">
        <SwapOffersLayout variant={"error"} />
      </div>
    </section>
  );
};
