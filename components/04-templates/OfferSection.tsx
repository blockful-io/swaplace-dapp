import { TokenOffers } from "@/components/03-organisms";
import { FilterOffers } from "@/components/02-molecules";

export const OfferSection = () => {
  return (
    <section className="w-full h-full flex xl:flex-row flex-col items-center justify-center ">
      <div className="flex">
        <FilterOffers />
      </div>
      <div className="flex flex-col justify-center items-center">
        <TokenOffers />
      </div>
    </section>
  );
};
