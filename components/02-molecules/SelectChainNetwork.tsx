import { NetworkDropdown, SwapIcon } from "@/components/01-atoms";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";

export const SelectChainNetwork = () => {
  const { isMobile } = useScreenSize();
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h2 className="p-normal-2-light dark:p-normal-2-dark">
          Which network do you want to connect to?
        </h2>
      </div>
      <div className="flex md:flex-row flex-col gap-3 items-center">
        <NetworkDropdown forAuthedUser={true} />
        <div className="w-[16px] h-[16px]">
          {isMobile ? (
            <SwapIcon
              variant={"vertical"}
              props={{ className: "text-[#707572] " }}
            />
          ) : (
            <SwapIcon
              variant={"horizontal"}
              props={{ className: "text-[#707572] " }}
            />
          )}
        </div>
        <NetworkDropdown forAuthedUser={false} />
      </div>
    </div>
  );
};
