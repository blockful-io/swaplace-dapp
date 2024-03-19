import {
  AccountBalanceWalletSidebar,
  EnsNameAndAddressWallet,
} from "@/components/02-molecules";
import React from "react";

export const UserInfo = () => {
  return (
    <div>
      <EnsNameAndAddressWallet />
      <AccountBalanceWalletSidebar />
    </div>
  );
};
