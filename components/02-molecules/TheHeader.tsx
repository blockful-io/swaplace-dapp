import { useScreenSize } from "@/lib/client/hooks/useScreenSize";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import {
  ConnectWallet,
  ENSAvatar,
  SwappingIcons,
  Tooltip,
} from "@/components/01-atoms";
import { SwaplaceIcon, WalletIcon } from "@/components/01-atoms/icons/";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import cc from "classcat";

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
      <div className="md:flex-col ">
        <div className="flex justify-center">
          {currentTheme === "dark" ? (
            <button className="bg-black-500" onClick={() => setTheme("light")}>
              light
            </button>
          ) : (
            <button className="bg-black-500 " onClick={() => setTheme("dark")}>
              dark
            </button>
          )}
        </div>
        <div className="h-10 w-10">
          {isWideScreen ? (
            <>
              {!!authenticatedUserAddress ? (
                <Tooltip position={"right"} content={"Your wallet"}>
                  <button className="rounded-[10px] bg-[#DDF23D] flex items-center justify-center">
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
                  <button className="rounded-[10px] bg-[#DDF23D] flex items-center justify-center">
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
  );
};
