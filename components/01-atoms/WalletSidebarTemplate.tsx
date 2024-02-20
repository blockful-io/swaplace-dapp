import { TheSidebarHeader } from "../02-molecules/TheSidebarHeader";
import { UserInfo } from "../02-molecules";
import React from "react";
import cc from "classcat";
import { useTheme } from "next-themes";

interface WalletSidebarTemplateProps {
  isOpen: boolean;
  isMobile: boolean;
}

export const WalletSidebarTemplate = ({
  isOpen,
  isMobile,
}: WalletSidebarTemplateProps) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <>
      <div
        className={cc([
          "fixed left-0 top-0 w-full h-full z-30 backdrop-blur-sm transition-all duration-300",
          isOpen ? "opacity-100 inset-0" : "opacity-0 z-[-1]",
        ])}
      />

      <div
        className={cc([
          "z-50 h-full absolute right-0 top-0 rounded-tl-[20px] border-l border-t transition-transform duration-300 ease-in-out",
          isDark
            ? "bg-[#212322] border-[#353836] shadow-sidebarDark"
            : "bg-[#F6F6F6] border-[#F0EEEE] shadow-sidebarLight",
          isOpen ? "translate-x-0" : "translate-x-full",
          isMobile ? "w-full" : "w-[400px]",
        ])}
      >
        <TheSidebarHeader />
        <UserInfo />
      </div>
    </>
  );
};
