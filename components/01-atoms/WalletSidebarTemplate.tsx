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
    <>
    {/* <div className={cc(["delay-300", !isOpen && "hidden"])}> */}
    <div className={cc(["fixed left-0 top-0 w-full h-full z-30 backdrop-blur-sm transition-all duration-300",
        isOpen ? "opacity-100 inset-0" : "opacity-0 z-[-1]"
  ])}/>
    {/* </div> */}
    
    <div
      className={cc([
        "z-50 h-full bg-[#F6F6F6] absolute right-0 top-0 rounded-tl-[20px] shadow-custom border-l border-t border-[#F0EEEE] transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full",
        isMobile ? "w-full" : "w-[400px]",
      ])}
    ></div>
    </>
    
  );
};
