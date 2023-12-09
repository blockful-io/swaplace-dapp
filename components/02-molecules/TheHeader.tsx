import React, { useEffect, useState } from "react";
import { ConnectWallet, SwaplaceIcon } from "@/components/01-atoms";
import cc from "classcat";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";

export const TheHeader = () => {
  const { isDesktop } = useScreenSize();
  const [showFullNav, setShowFullNav] = useState(!isDesktop);

  useEffect(() => {
    setShowFullNav(!isDesktop);
  }, [isDesktop]);

  return (
    <header
      onMouseEnter={() => setShowFullNav(true)}
      onMouseLeave={() => isDesktop && setShowFullNav(false)}
      className="bg-[#F2F2F2] z-40 w-screen h-auto lg:w-auto lg:h-screen py-6 flex lg:flex-col justify-between items-center px-8 font-medium shadow-lg fixed left-0 top-0 lg:items-start"
    >
      <SwaplaceIcon className="w-10" />
      <div className={cc([showFullNav ? "block" : "hidden"])}>
        <ConnectWallet />
      </div>
    </header>
  );
};
