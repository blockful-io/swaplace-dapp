import { SearchBar } from "@/components/01-atoms";
import { TheHeader } from "@/components/02-molecules";
import { SwapStation, SwappingShelfs } from "@/components/03-organisms";

export const SwapSection = () => {
  return (
      <div className="xl:w-[1115px] w-full flex flex-col justify-center space-y-6 xl:flex-row xl:space-x-6 xl:space-y-0 mb-16">
      <div className="flex justify-center items-center xl:w-[62px] ml-4">
        <TheHeader />
      </div>
        <section className="lx:w-[650px] xl:w-full w-full h-full flex flex-col items-center space-y-6 lg:mx-auto">
          <SearchBar />
          <SwappingShelfs />
        </section>
        <SwapStation />
      </div>
  );
};
