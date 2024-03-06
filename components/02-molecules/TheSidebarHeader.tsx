import { CloseCTA } from "../01-atoms/icons/CloseCTA";
import { DisconnectWallet } from "../01-atoms/DisconnectWallet";
import { useSidebar } from "@/lib/client/contexts/SidebarContext.tsx";
import React from "react";
import cc from "classcat";
import { useTheme } from "next-themes";

export const TheSidebarHeader = () => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";
  const { toggleSidebar } = useSidebar();

  return (
    <div className="w-full gap-5 flex flex-col">
      <div
        className={cc([
          "rounded-full w-7 h-7 flex items-center justify-center",
          isDark
            ? "border-[#353836] bg-[#282B29]"
            : "border-[#D6D6D6] bg-[#F6F6F6]",
        ])}
      >
        <CloseCTA
          onClick={() => toggleSidebar()}
          className={cc([isDark ? "text-[#F6F6F1]" : "text-[#A3A9A5]"])}
        />
      </div>
      <div className="w-full flex justify-between">
        <h3
          className={cc([
            "text-xl",
            isDark ? "text-[#F6F6F6]" : "text-[#181A19]",
          ])}
        >
          Your wallet
        </h3>
        <DisconnectWallet />
      </div>
    </div>
  );
};
