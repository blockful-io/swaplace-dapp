import { TheSidebarHeader, UserInfo } from "@/components/02-molecules";
import { useSidebar } from "@/lib/client/contexts/SidebarContext.tsx";
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
  const { toggleSidebar } = useSidebar();

  return (
    <>
      <div
        className={cc([
          "fixed left-0 top-0 w-full h-full z-50 backdrop-blur-sm transition-all duration-300 cursor-default",
          isOpen ? "opacity-100 inset-0 " : "opacity-0 z-[-1]",
        ])}
        role="button"
        onClick={toggleSidebar}
      />

      <div
        className={cc([
          "z-50 h-full right-0 top-0 rounded-tl-[20px] border-l border-t fixed transition-transform duration-300 ease-in-out p-6",
          isDark
            ? "bg-[#212322] border-[#353836] shadow-sidebarDark"
            : "bg-[#F6F6F6] border-[#F0EEEE] shadow-sidebarLight",
          isOpen ? "translate-x-0" : "translate-x-full",
          isMobile ? "w-full" : "w-[400px]",
        ])}
      >
        <div className="flex flex-col gap-6">
          <TheSidebarHeader />
          <UserInfo />
        </div>
      </div>
    </>
  );
};
