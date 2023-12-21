import { FilterOffers } from "@/components/02-molecules";

export const OfferSection = () => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex">
        <FilterOffers />
        <div className="w-[716px] h-[232px] border border-[#353836] rounded-lg"></div>
      </div>
    </section>
  );
};
