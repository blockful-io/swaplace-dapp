import { TokenOfferVariant, TokenOffers } from "@/components/03-organisms";
import { FilterOffers, TheHeader } from "@/components/02-molecules";

export const OfferSection = () => {
  return (
    <div className="max-w-[1280px] max-h-[720px] w-full flex xl:flex-row flex-col lg:justify-center h-full">
      <TheHeader />
      <section className="flex items-center  xl:px-[60px] xl:pt-[32px] xl:flex-row flex-col">
        <div className="flex xl:flex-row flex-col h-full xl:w-[1098px] w-[95%] justify-between xl:items-start md:items-center">
          <div className="flex flex-col">
            <FilterOffers />
          </div>
          <div className="flex xl:flex-col ">
            <TokenOffers variant={TokenOfferVariant.HORIZONTAL} />
          </div>
        </div>
      </section>
    </div>
  );
};
