import {
  AddTokenOrSwapManuallyModal,
  AddTokenOrSwapManuallyModalVariant,
} from ".";
import { ErrorIcon, NoSwapsIcon } from "@/components/01-atoms";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import cc from "classcat";
import { useRouter } from "next/router";

interface EmptyLayoutOffersProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  button: React.ReactNode;
}

const EmptyLayoutOffers = ({
  icon,
  title,
  description,
  button,
}: EmptyLayoutOffersProps) => {
  return (
    <div className="md:w-[676px] md:h-[656px] w-[95%] h-full py-10 px-5 border border-[#353836] dark:bg-[#212322] bg-[#F6F6F6] rounded-lg flex flex-col justify-center items-center gap-5">
      <div className="flex ">{icon}</div>
      <div className="flex flex-col text-center items-center">
        <p className="dark:p-medium-bold-2-dark p-medium-bold-2-dark-variant-black ">
          {title}
        </p>
        <p className="p-small dark:!text-[#A3A9A5] !text-[#212322] ">
          {description}
        </p>
      </div>
      <div className="flex">{button}</div>
    </div>
  );
};

export enum SwapOffersDisplayVariant {
  ERROR = "error",
  NO_SWAPS_CREATED = "swapless",
}

type Variant = SwapOffersDisplayVariant | "error" | "swapless";

interface SwapOffersLayoutProps {
  variant: Variant;
}

export const SwapOffersLayout = ({ variant }: SwapOffersLayoutProps) => {
  const { theme } = useTheme();
  const [toggleManually, setToggleManually] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      {variant === SwapOffersDisplayVariant.ERROR ? (
        <EmptyLayoutOffers
          icon={<ErrorIcon fill={cc([{ black: theme === "light" }])} />}
          title={<> Sorry, we couldn&apos;t load your swaps</>}
          description={<> Please try again later or add your swaps manually</>}
          button={
            <>
              <button
                className="p-medium-bold-variant-black bg-[#DDF23D] border rounded-[10px] py-2 px-4 h-[38px]"
                onClick={() => setToggleManually(!toggleManually)}
              >
                Add swap manually
              </button>
              <AddTokenOrSwapManuallyModal
                open={toggleManually}
                onClose={() => {
                  setToggleManually(false);
                }}
                variant={AddTokenOrSwapManuallyModalVariant.SWAP}
              />
            </>
          }
        />
      ) : (
        <EmptyLayoutOffers
          icon={<NoSwapsIcon fill={cc([{ black: theme === "light" }])} />}
          title={<> No swaps here. Let&apos;s fill it up!</>}
          description={
            <div className="flex w-[293px]">
              You haven&apos;t made or received any proposals. Time to jump in
              and start trading.
            </div>
          }
          button={
            <button
              className="p-medium-bold-variant-black bg-[#DDF23D] border rounded-[10px] py-2 px-4 h-[38px]"
              onClick={() => router.push("/")}
            >
              Start swapping
            </button>
          }
        />
      )}
    </>
  );
};
