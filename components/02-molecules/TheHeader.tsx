import React from "react";
import { ConnectWallet } from "@/components/01-atoms";

export const TheHeader = () => {
  return (
    <header className="w-full py-6 flex justify-between px-20 font-medium bg-green-200 shadow">
      <h1>Swaplace dApp</h1>
      <ConnectWallet />
    </header>
  );
};
