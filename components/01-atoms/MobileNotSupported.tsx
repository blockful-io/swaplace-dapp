import { ErrorIcon, SwaplaceIcon } from "@/components/01-atoms";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";

export const WarningScreenSizeNotSupported = () => {
  const { isMobile, isTablet } = useScreenSize();
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center py-8 px-6 gap-6">
      <div className="flex gap-1">
        <SwaplaceIcon className="w-9 text-[#AABE13] dark:text-[#DDF23D]" />
        <p>swaplace</p>
      </div>
      <div className="w-full h-full px-5 border border-[#353836] dark:bg-[#212322] bg-[#F6F6F6] rounded-lg flex flex-col justify-center items-center gap-6">
        <div className="flex ">
          <ErrorIcon />
        </div>
        <div className="flex flex-col text-center items-center">
          <p className="dark:p-medium-bold-2-dark p-medium-bold-2-dark-variant-black ">
            {isTablet ? (
              <p>Oh no, tablet isn&apos;t available yet!</p>
            ) : isMobile ? (
              <p>Oh no, mobile isn&apos;t available yet!</p>
            ) : null}
          </p>
          <p className="p-small dark:!text-[#A3A9A5] !text-[#212322] ">
            Please try our desktop version to get a better experience
          </p>
        </div>
      </div>
    </div>
  );
};
