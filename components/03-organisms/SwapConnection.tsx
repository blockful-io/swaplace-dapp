import { SearchBar } from "@/components/01-atoms";
import { SelectChainNetwork } from "@/components/02-molecules";

export const SwapConnection = () => {
  return (
    <>
      <div className="lg:max-h-[184px] flex flex-col gap-5">
        <div>
          <SearchBar />
        </div>
        <div>
          <SelectChainNetwork />
        </div>
      </div>
    </>
  );
};
