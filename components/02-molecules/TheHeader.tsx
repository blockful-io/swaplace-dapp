/* import { ENSAvatar } from "@/components/01-atoms"; */
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import {
  ConnectWallet,
  MoonIcon,
  NetworkDropdown,
  NetworkVariantPosition,
  PersonIcon,
  SunIcon,
  SwaplaceIcon,
  SwappingIcons,
  Tooltip,
} from "@/components/01-atoms";
import { useSidebar } from "@/lib/client/contexts/SidebarContext";
import { WalletSidebarTemplate } from "@/components/03-organisms";
import { SWAPLACE_WEBSITE } from "@/lib/client/constants";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

export const TheHeader = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { toggleSidebar, isSidebarOpen } = useSidebar();
  const { isWideScreen } = useScreenSize();
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const setThemeMode = (mode: "light" | "dark") => {
    const body = document.body;

    // Add the class to disable transitions
    body.classList.add("no-transition");

    setTheme(mode);

    // Use a timeout to re-enable transitions
    setTimeout(() => {
      body.classList.remove("no-transition");
    }, 0);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";
  return (
    <>
      <header className="lg:mt-0 mt-20 bg-offWhite dark:bg-midnightGreen dark:border-darkGray border-softGray border rounded-2xl z-40 w-full h-auto xl:w-[62px] py-4 flex xl:flex-col justify-between items-center xl:px-0 px-8  xl:pb-4 font-medium dark:shadow-swap-station shadow-swap-station-light">
        <div className="flex pr-4 xl:pr-0">
          <Link href={SWAPLACE_WEBSITE}>
            <SwaplaceIcon className="w-10 text-limeYellow dark:text-yellowGreen" />
          </Link>
        </div>
        <div className="xl:flex-col flex-row flex w-full">
          <SwappingIcons />
        </div>
        <div className="flex xl:flex-col gap-[16px]">
          <div className="flex justify-center">
            {isDark ? (
              <Tooltip position={"right"} content={"Light Mode"}>
                <button
                  className="cursor-pointer bg-black-500 hover:bg-darkGray transition-colors duration-200 rounded-[10px] group"
                  onClick={() => {
                    setThemeMode("light");
                  }}
                >
                  <SunIcon className="w-10 p-2 dark:text-[#767777] group-hover:text-offWhite" />
                </button>
              </Tooltip>
            ) : (
              <Tooltip position={"right"} content={"Dark Mode"}>
                <button
                  className="bg-black-500 outline-none hover:bg-lightSilver transition-colors duration-200 rounded-[10px]"
                  onClick={() => {
                    setThemeMode("dark");
                  }}
                >
                  <MoonIcon className="w-10 p-2 text-sageGray" />
                </button>
              </Tooltip>
            )}
          </div>
          <NetworkDropdown
            forAuthedUser={true}
            variant={NetworkVariantPosition.VERTICAL}
          />
          <div className="h-10 w-10">
            <>
              {!!authenticatedUserAddress ? (
                <Tooltip position={"left"} content={"Your wallet"}>
                  <button
                    onClick={() => toggleSidebar()}
                    className="rounded-[10px] flex items-center justify-center w-full h-full"
                  >
                    {/* <ENSAvatar avatarENSAddress={authenticatedUserAddress} /> */}
                    <PersonIcon
                      size={"20"}
                      className="h-full items-center justify-center flex w-full p-2 text-sageGray dark:text-mediumGray"
                    />
                  </button>
                </Tooltip>
              ) : (
                <Tooltip position={"right"} content={"Connect a Wallet"}>
                  <ConnectWallet
                    customStyle="w-full flex justify-center items-center h-10 w-10 rounded-[10px] bg-yellowGreen"
                    walletIcon={true}
                  />
                </Tooltip>
              )}
            </>
          </div>
        </div>
      </header>
      <WalletSidebarTemplate isOpen={isSidebarOpen} isMobile={!isWideScreen} />
    </>
  );
};
