import { SearchBar } from "@/components/01-atoms";
import { TheHeader } from "@/components/02-molecules";
import { SwapStation, SwappingShelfs } from "@/components/03-organisms";

export const SwapSection = () => {
  return (
    <div className="xl:w-[1280px] xl:h-[720px]  w-full flex flex-col justify-center xl:flex-row">
      <TheHeader />
      <section className="flex items-center xl:px-[60px] xl:py-[32px]">
        <div className="xl:h-[656px] bg-red-500 xl:w-[1098px] flex xl:gap-[20px]">
          <div className="flex flex-col xl:w-[600px] bg-yellow-500 ">
            <SearchBar />
            <SwappingShelfs />
          </div>
          <div className="flex xl:w-[438px] ">
            <SwapStation />
          </div>
        </div>
      </section>
    </div>
  );
};
