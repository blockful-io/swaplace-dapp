import React, { useEffect, useState } from "react";
import cc from "classcat";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { useTheme } from "next-themes";
import { ConnectWallet } from "@/components/01-atoms";
import { SwaplaceIcon, WalletIcon } from "@/components/01-atoms/icons/";

export const TheHeader = () => {
  const { isDesktop } = useScreenSize();
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const [showFullNav, setShowFullNav] = useState(
    !isDesktop && !!authenticatedUserAddress?.address
  );

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
    <header className="bg-[#F2F2F2] dark:bg-[#212322] z-40 w-screen h-auto xl:w-auto xl:h-screen py-6 flex xl:flex-col justify-between items-center px-8 xl:pt-5 xl:pb-4 font-medium shadow-lg absolute left-0 top-0 xl:items-start">
      <SwaplaceIcon
        className="w-10"
        fill={cc([theme == "dark" ? "#DDF23D" : "#4F4F4F"])}
      />
      <div className={cc([showFullNav ? "block" : "hidden"])}>
        <ConnectWallet />
      </div>
      <div>
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
        <div>
          <button className="h-10 w-10  rounded-[10px] bg-[#DDF23D] flex items-center justify-center">
            <WalletIcon />
          </button>
        </div>
      </div>
    </header>
  );
};
