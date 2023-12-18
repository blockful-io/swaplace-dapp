import { SearchBar } from "@/components/01-atoms";
import { SwapStation } from "@/components/02-molecules";
import { SwappingShelfs } from "@/components/03-organisms";

export const SwapSection = () => {
  return (
    <div className="xl:w-[1115px] w-full flex flex-col justify-center space-y-6 xl:flex-row xl:space-x-6 xl:space-y-0 mb-16">
      <section className="lg:w-[615px] xl:w-[615px] w-full h-full flex flex-col items-center space-y-6 lg:mx-auto">
        <SearchBar />
        <SwappingShelfs />
      </section>
      <SwapStation />
    </div>
  );
};
