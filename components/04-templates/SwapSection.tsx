import { SearchBar } from "@/components/01-atoms";
import { SwappingShelfs } from "@/components/03-organisms";
import { SwapStation } from "@/components/02-molecules";

export const SwapSection = () => {
  return (
    <section className="max-w-[615px] w-full h-full flex flex-col items-center space-y-6">
      <SearchBar />
      <SwappingShelfs />
      <SwapStation />
    </section>
  );
};
