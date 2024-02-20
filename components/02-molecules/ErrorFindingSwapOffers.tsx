import { ErrorIcon, SwapAddManuallyModalLayout } from "@/components/01-atoms";
import cc from "classcat";
import { useTheme } from "next-themes";
import { useState } from "react";

export const ErrorFindingSwapOffers = () => {
  const { theme } = useTheme();
  const [toggleManually, setToggleManually] = useState<boolean>(false);
  return (
    <div className="md:w-[676px] md:h-[656px] w-[95%] h-full py-10 px-5 border border-[#353836] dark:bg-[#212322] bg-[#F6F6F6] rounded-lg flex flex-col justify-center items-center gap-5">
      <div className="flex ">
        <ErrorIcon fill={cc([{ black: theme === "light" }])} />
      </div>
      <div className="flex flex-col text-center items-center">
        <p className="dark:p-medium-bold-2-dark p-medium-bold-2-dark-variant-black ">
          Sorry, we couldn&apos;t load your swaps
        </p>
        <p className="p-small dark:!text-[#A3A9A5] !text-[#212322]">
          Please try again later or add your swaps manually
        </p>
      </div>
      <div className="flex">
        <button
          className="p-medium-bold-variant-black bg-[#DDF23D] border rounded-[10px] py-2 px-4 h-[38px]"
          onClick={() => setToggleManually(!toggleManually)}
        >
          Add swap manually
        </button>
        <SwapAddManuallyModalLayout
          open={toggleManually}
          onClose={() => {
            setToggleManually(false);
          }}
          variant="swap"
        />
      </div>
    </div>
  );
};
