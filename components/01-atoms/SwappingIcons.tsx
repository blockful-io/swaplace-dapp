import { useTheme } from "next-themes";
import { NextRouter, useRouter } from "next/router";
import { SVGProps, useState } from "react";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";
import {
  SwappingIcon,
  OffersIcon,
  ChatIcon,
  NotificationsIcon,
} from "@/components/01-atoms/icons";
import { Tooltip } from "@/components/01-atoms";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useState } from "react";
import cc from "classcat";

export interface IconSwap {
  id: number;
  name: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

export enum SwappingIconsID {
  "SWAPLACE_STATION",
  "OFFERS",
  "CHAT",
  "NOTIFICATIONS",
}

const findInitialActiveTab = (swappingTabs: Array<IconSwap>, router: NextRouter) => {
  const matchingTab = swappingTabs.find(tab => router.pathname === tab.href);
  console.log("matching ", matchingTab)
  return matchingTab ? matchingTab.id : SwappingIconsID.SWAPLACE_STATION;
};

export const SwappingIcons = () => {
  const { theme } = useTheme();
  const { isWideScreen } = useScreenSize();

  const swappingTabs: Array<IconSwap> = [
    {
      id: SwappingIconsID.SWAPLACE_STATION,
      name: "Swaplace Station",
      href: "/swap",
      icon: SwappingIcon,
    },
    {
      id: SwappingIconsID.OFFERS,
      name: "Offers",
      href: "/swap/offers",
      icon: OffersIcon,
    },
    {
      id: SwappingIconsID.CHAT,
      name: "Chat",
      href: "/",
      icon: ChatIcon,
    },
    {
      id: SwappingIconsID.NOTIFICATIONS,
      name: "Notifications",
      href: "/",
      icon: NotificationsIcon,
    },
  ];


  const router = useRouter();

  const [activeTab, setActiveTab] = useState(
    findInitialActiveTab(swappingTabs, router)
  );

  const handleClick = async (e: IconSwap) => {
    setActiveTab(e.id);
    router.push(e.href);
  };

  return (
    <div key={activeTab}>
      {swappingTabs.map((swappingTab) => {
        const IconComponent = swappingTab.icon;


        const isSelected = activeTab == swappingTab.id


        return (
          <>
            {isWideScreen ? (
              <Tooltip position={"right"} content={swappingTab.name}>
                <div
                  key={swappingTab.id}
                  className={cc([
                    isSelected
                      ? "dark:p-medium-bold-dark p-medium-bold border-l dark:border-[#DDF23D] border-[#AABE13] hover:dark:bg-[#333534]"
                      : "dark:p-medium-bold p-medium-bold border-l dark:border-[#313131]",
                    "flex-1 md:p-4 cursor-pointer hover:dark:bg-[#343635] hover:bg-[#eff3cf] group",
                  ])}
                  onClick={() => {
                    handleClick(swappingTab);
                  }}
                >
                  <div className="flex items-center justify-center w-full">
                    <IconComponent
                      className={cc([
                        "w-5 h-5",
                        theme === "dark" ? (isSelected ? "text-[#DDF23D]" : "text-white opacity-100") : (isSelected ? "text-[#AABE13]" : "text-[#4F4F4F]")
                      ])}
                    />
                  </div>
                </div>
              </Tooltip>
            ) : (
              <Tooltip position={"bottom"} content={swappingTab.name}>
                <div
                  key={swappingTab.id}
                  className={cc([
                    activeTab == swappingTab.id
                      ? "dark:p-medium-bold-dark p-medium-bold border-l dark:border-[#DDF23D] border-black hover:dark:bg-[#333534]"
                      : "dark:p-medium-bold p-medium-bold opacity-50 border-l dark:border-[#313131]",
                    "flex-1 md:p-4 cursor-pointer hover:dark:bg-[#343635] hover:bg-[#eff3cf]",
                  ])}
                  onClick={() => {
                    handleClick(swappingTab);
                  }}
                >
                  <div className="flex items-center justify-center w-full">
                    <IconComponent className="w-5 h-5 " fill={cc([theme == "dark" ? "#DDF23D" : "#4F4F4F"])} />
                  </div>
                </div>
              </Tooltip>
            )}
          </>
        );
      })}
    </div>
  );
};
