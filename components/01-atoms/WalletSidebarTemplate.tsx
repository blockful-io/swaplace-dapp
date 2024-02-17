import React from "react";
import cc from "classcat";

interface WalletSidebarTemplateProps {
  isOpen: boolean;
  isMobile: boolean;
}

export const WalletSidebarTemplate = ({
  isOpen,
  isMobile,
}: WalletSidebarTemplateProps) => {
  return (
    <div
      className={cc([
        "z-50 h-full bg-[#F6F6F6] absolute right-0 top-0 rounded-tl-[20px] shadow-custom border-l border-t border-[#F0EEEE] transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-full" : "translate-x-0",
        isMobile ? "w-full" : "w-[400px]",
      ])}
    ></div>
  );
};
