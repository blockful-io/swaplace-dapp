import {
  NetworkDropdown,
  SwapIcon,
  SwapIconVariant,
} from "@/components/01-atoms";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";

export const SelectChainNetwork = () => {
  const { isMobile } = useScreenSize();
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h2 className="p-normal-2-light dark:p-normal-2-dark contrast-50">
          Which network do you want to swap?
        </h2>
      </div>
      <div className="flex md:flex-row flex-col gap-3 items-center">
        <NetworkDropdown forAuthedUser={true} />
        <div className="w-[16px] h-[16px]">
          {isMobile ? (
            <SwapIcon
              variant={SwapIconVariant.VERTICAL}
              props={{ className: "text-[#707572] " }}
            />
          ) : (
            <SwapIcon
              variant={SwapIconVariant.HORIZONTAL}
              props={{ className: "text-[#707572] " }}
            />
          )}
        </div>
        <NetworkDropdown forAuthedUser={false} />
      </div>
    </div>
  );
};
