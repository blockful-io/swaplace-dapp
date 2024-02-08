import React, { useEffect, useState } from "react";
import cc from "classcat";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useTheme } from "next-themes";
import { ConnectWallet, SwappingIcons, Tooltip } from "@/components/01-atoms";
import { SwaplaceIcon, WalletIcon } from "@/components/01-atoms/icons/";
import Link from "next/link";
import { SunIcon } from "../01-atoms/icons/SunIcon";
import { MoonIcon } from "../01-atoms/icons/MoonIcon";

export const TheHeader = () => {
  const { isDesktop } = useScreenSize();
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const [showFullNav, setShowFullNav] = useState(
    !isDesktop && !!authenticatedUserAddress?.address,
  );

  const { isWideScreen } = useScreenSize();

  useEffect(() => {
    setShowFullNav(!isDesktop);
  }, [isDesktop]);

  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark"

  return (
    <header className="bg-[#F2F2F2] dark:bg-[#212322] z-40 w-screen h-auto xl:w-[62px] xl:h-screen py-6 flex xl:flex-col justify-between items-center xl:items-center  xl:px-0 md:px-8 xl:pt-5 xl:pb-4 font-medium shadow-lg absolute left-0 top-0">
      <div className="flex">
        <Link href="/">
          <SwaplaceIcon
            className="w-10 mt-5"
            fill={cc([theme == "dark" ? "#DDF23D" : "#4F4F4F"])}
          />
        </Link>
        <div className={cc([showFullNav ? "block" : "hidden"])}>
          <ConnectWallet />
        </div>
      </div>
      <div className="xl:flex-col flex-row flex">
        <SwappingIcons />
      </div>
      <div className="flex md:flex-col gap-[16px]">
        <div className="flex justify-center">
          {isDark ? (
            <Tooltip position={"right"} content={"Light Mode"}>
              <button className="cursor-pointer bg-black-500 hover:bg-[#353836] transition-colors duration-200 rounded-[10px]" onClick={() => setTheme("light")}>
                <SunIcon className="w-10 p-2 text-[#f6f6f6]" />
              </button>
            </ Tooltip>
          ) : (
            <Tooltip position={"right"} content={"DarK Mode"}>
              <button className="bg-black-500 outline-none hover:bg-[#E4E4E4] transition-colors duration-200 rounded-[10px]" onClick={() => setTheme("dark")}>
                <MoonIcon className="w-10 p-2 text-black" />
              </button>
            </Tooltip>
          )}
        </div>
        <div>
          {isWideScreen ? (
            <Tooltip position={"right"} content={"Connect a Wallet"}>
              <button className="h-10 w-10  rounded-[10px] bg-[#DDF23D] flex items-center justify-center">
                <WalletIcon />
              </button>
            </Tooltip>
          ) : (
            <Tooltip position={"left"} content={"Connect a Wallet"}>
              <button className="h-10 w-10  rounded-[10px] bg-[#DDF23D] flex items-center justify-center">
                <WalletIcon />
              </button>
            </Tooltip>
          )}
        </div>
      </div>
    </header>
  );
};
