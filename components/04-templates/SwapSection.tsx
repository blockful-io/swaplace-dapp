import { SearchBar } from "@/components/01-atoms";
import { TheHeader } from "@/components/02-molecules";
import { SwapStation, SwappingShelfs } from "@/components/03-organisms";

export const SwapSection = () => {
  return (
    // <div className="xl:w-[1280px] xl:h-[720px] w-full flex flex-col justify-center ">
    //   <TheHeader />
    //   <section className="lx:w-[650px] xl:w-full w-full h-full flex flex-col items-center space-y-6 lg:mx-auto">
    //     <SearchBar />
    //     <SwappingShelfs />
    //   </section>
    //   <SwapStation />
    // </div>

    <div className="xl:w-[1280px] xl:h-[720px] bg-red-500 w-full flex flex-col justify-center xl:flex-row">
      <TheHeader />
      <section className=" flex items-center xl:px-[60px] xl:py-[32px] ">
        <div className="xl:h-[656px] xl:w-[1098px] flex xl:gap-[20px]">
          <div className="flex flex-col bg-blue-500 xl:w-[600px] ">
            <SearchBar />
            <SwappingShelfs />
          </div>
          <div className="flex bg-yellow-500 xl:w-[438px] ">
            <SwapStation />
          </div>
        </div>
      </section>
    </div>
  );
};
