import { useScreenSize } from "@/lib/client/hooks/useScreenSize";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import {
  ConnectWallet,
  ENSAvatar,
  MoonIcon,
  SunIcon,
  SwaplaceIcon,
  SwappingIcons,
  Tooltip,
  WalletSidebarTemplate,
} from "@/components/01-atoms";
import { useSidebar } from "@/lib/client/contexts/SidebarContext.tsx";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import cc from "classcat";

export const TheHeader = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { toggleSidebar, isSidebarOpen } = useSidebar();
  const { isWideScreen } = useScreenSize();
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <>
      <header className="bg-[#F2F2F2] dark:bg-[#212322]
      fixed z-40 w-screen h-auto md:h-[52px] sm:h-[52px]
      xl:w-[62px] xl:h-screen py-6 flex xl:flex-col
      justify-between items-center xl:items-center
      xl:px-0 md:px-8 xl:pt-5 xl:pb-4 font-medium
      shadow-lg left-0 top-0">
        <div className="flex items-center">
          <Link href="https://swaplace.xyz/" className="flex items-center">
            <SwaplaceIcon
              className="w-10"
              fill={cc([theme == "dark" ? "#DDF23D" : "#4F4F4F"])}
            />
          </Link>
        </div>
        <div className="xl:flex-col flex-row flex">
          <SwappingIcons />
        </div>
        <div className="flex xl:flex-col gap-[16px] xl:items-center">
          <div className="flex justify-center">
            {isDark ? (
              <Tooltip position={"right"} content={"Light Mode"}>
                <button
                  className="cursor-pointer bg-black-500 hover:bg-[#353836] transition-colors duration-200 rounded-[10px]"
                  onClick={() => setTheme("light")}
                >
                  <SunIcon className="w-10 p-2 text-[#f6f6f6]" />
                </button>
              </Tooltip>
            ) : (
              <Tooltip position={"right"} content={"Dark Mode"}>
                <button
                  className="bg-black-500 outline-none hover:bg-[#E4E4E4] transition-colors duration-200 rounded-[10px]"
                  onClick={() => setTheme("dark")}
                >
                  <MoonIcon className="w-10 p-2 text-black" />
                </button>
              </Tooltip>
            )}
          </div>
          <div className="flex h-10 w-10">
            {isWideScreen ? (
              <>
                {!!authenticatedUserAddress ? (
                  <Tooltip position={"right"} content={"Your wallet"}>
                    <button
                      onClick={toggleSidebar}
                      className="rounded-[10px] bg-[#DDF23D] flex items-center justify-center"
                    >
                      <ENSAvatar avatarENSAddress={authenticatedUserAddress} />
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip position={"right"} content={"Connect a Wallet"}>
                    <div className="h-10 w-10 rounded-[10px] bg-[#DDF23D] flex items-center justify-center">
                      <ConnectWallet
                        customStyle="w-full flex justify-center items-center"
                        walletIcon={true}
                      />
                    </div>
                  </Tooltip>
                )}
              </>
            ) : (
              <>
                {!!authenticatedUserAddress ? (
                  <Tooltip position={"right"} content={"Your wallet"}>
                    <button
                      onClick={toggleSidebar}
                      className="rounded-[10px] bg-[#DDF23D] flex items-center justify-center"
                    >
                      <ENSAvatar avatarENSAddress={authenticatedUserAddress} />
                    </button>
                  </Tooltip>
                ) : (
                  <Tooltip position={"left"} content={"Connect a Wallet"}>
                    <div className="h-10 w-10 rounded-[10px] bg-[#DDF23D] flex items-center justify-center">
                      <ConnectWallet
                        customStyle="w-full flex justify-center items-center"
                        walletIcon={true}
                      />
                    </div>
                  </Tooltip>
                )}
              </>
            )}
          </div>
        </div>
      </header>
      <WalletSidebarTemplate isOpen={isSidebarOpen} isMobile={!isWideScreen} />
    </>
  );
};
