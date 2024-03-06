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
      <header className="bg-[#F2F2F2] dark:bg-[#212322] dark:border-[#353836] border rounded-2xl z-40 w-full h-auto xl:w-[62px] py-6 flex xl:flex-col justify-between items-center xl:px-0 px-8 xl:pb-4 font-medium dark:shadow-swap-station">
        <div className="flex">
          <Link href="https://swaplace.xyz/">
            <SwaplaceIcon
              className="w-10 mt-5"
              fill={cc([theme == "dark" ? "#DDF23D" : "#4F4F4F"])}
            />
          </Link>
        </div>
        <div className="xl:flex-col flex-row flex">
          <SwappingIcons />
        </div>
        <div className="flex xl:flex-col gap-[16px]">
          <div className="flex justify-center">
            {isDark ? (
              <Tooltip
                position={window.innerWidth > 1440 ? "right" : "bottom"}
                content={"Light Mode"}
              >
                <button
                  className="cursor-pointer bg-black-500 hover:bg-[#353836] transition-colors duration-200 rounded-[10px]"
                  onClick={() => setTheme("light")}
                >
                  <SunIcon className="w-10 p-2 text-[#f6f6f6]" />
                </button>
              </Tooltip>
            ) : (
              <Tooltip
                position={window.innerWidth > 1440 ? "right" : "bottom"}
                content={"Dark Mode"}
              >
                <button
                  className="bg-black-500 outline-none hover:bg-[#E4E4E4] transition-colors duration-200 rounded-[10px]"
                  onClick={() => setTheme("dark")}
                >
                  <MoonIcon className="w-10 p-2 text-black" />
                </button>
              </Tooltip>
            )}
          </div>
          <div className="h-10 w-10">
            <>
              {!!authenticatedUserAddress ? (
                <Tooltip
                  position={window.innerWidth > 1440 ? "right" : "bottom"}
                  content={"Your wallet"}
                >
                  <button
                    onClick={() => toggleSidebar()}
                    className="rounded-[10px] bg-[#DDF23D] flex items-center justify-center"
                  >
                    <ENSAvatar avatarENSAddress={authenticatedUserAddress} />
                  </button>
                </Tooltip>
              ) : (
                <Tooltip
                  position={window.innerWidth > 1440 ? "right" : "bottom"}
                  content={"Connect a Wallet"}
                >
                  <div className="h-10 w-10 rounded-[10px] bg-[#DDF23D] flex items-center justify-center">
                    <ConnectWallet
                      customStyle="w-full flex justify-center items-center"
                      walletIcon={true}
                    />
                  </div>
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
