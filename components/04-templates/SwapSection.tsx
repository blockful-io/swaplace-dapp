import { SearchBar } from "@/components/01-atoms";
import { SwappingShelfs } from "@/components/03-organisms";
import { SwapStation } from "@/components/02-molecules";

export const SwapSection = () => {
  return (
    <div className="w-full flex flex-col justify-center space-y-6 lg:flex-row lg:space-x-6 lg:space-y-0 mb-16">
      <section className="lg:w-[615px] w-full h-full flex flex-col items-center space-y-6">
        <SearchBar />
        <SwappingShelfs />
      </section>
      <SwapStation />
    </div>
  );
};
