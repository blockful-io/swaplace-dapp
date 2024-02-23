import { useWalletBalance } from "@/lib/client/hooks/useWalletBalance";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import React from "react";
import cc from "classcat";
import { useTheme } from "next-themes";
import { useNetwork } from "wagmi";

export const AccountBalanceWalletSidebar = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();

  const { chain } = useNetwork();

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  const { balance } = useWalletBalance({
    walletAddress: authenticatedUserAddress,
  });

  const match = balance?.match(/^(\d+\.\d{1,3})|\d+/);
  const displayBalance = match ? match[0] : balance;

  return (
    <div
      className={cc([
        "flex flex-col pt-5 border-t",
        isDark ? "border-[#353836]" : "border-[#E4E4E4]",
      ])}
    >
      <p className={cc([isDark ? "text-[#A3A9A5]" : "text-[#505150]"])}>
        Current balance
      </p>
      <div className="flex items-end gap-2">
        <h2 className="text-3xl font-medium">{displayBalance || "0"}</h2>
        <p className="text-base	font-medium">{chain?.nativeCurrency.symbol}</p>
      </div>
    </div>
  );
};
