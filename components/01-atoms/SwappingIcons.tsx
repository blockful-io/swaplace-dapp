import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  SwappingIcon,
  OffersIcon,
  ChatIcon,
  NotificationsIcon,
} from "@/components/01-atoms/icons";
import cc from "classcat";

export interface IconSwap {
  id: number;
  name: string;
  href: string;
  icon: React.ReactNode;
}

export enum SwappingIconsID {
  "SWAPLACE_STATION",
  "OFFERS",
  "CHAT",
  "NOTIFICATIONS",
}

export const SwappingIcons = () => {
  const { theme } = useTheme();
  const [isActiveTab, setIsActiveTab] = useState(
    SwappingIconsID.SWAPLACE_STATION,
  );

  const swappingTabs: Array<IconSwap> = [
    {
      id: SwappingIconsID.SWAPLACE_STATION,
      name: "Swaplace Station",
      href: "/",
      icon: (
        <SwappingIcon
          className="w-5 h-5 "
          fill={cc([theme == "dark" ? "#DDF23D" : "#4F4F4F"])}
        />
      ),
    },
    {
      id: SwappingIconsID.OFFERS,
      name: "Offers",
      href: "/offers",
      icon: (
        <OffersIcon
          className="w-5 h-5 "
          fill={cc([theme == "dark" ? "#DDF23D" : "#4F4F4F"])}
        />
      ),
    },
    {
      id: SwappingIconsID.CHAT,
      name: "Chat",
      href: "/",
      icon: (
        <ChatIcon
          className="w-5 h-5 disabled cursor-not-allowed"
          fill={cc([theme == "dark" ? "#DDF23D" : "#4F4F4F"])}
        />
      ),
    },
    {
      id: SwappingIconsID.NOTIFICATIONS,
      name: "Notifications",
      href: "/",
      icon: (
        <NotificationsIcon
          className="w-5 h-5  disabled cursor-not-allowed"
          fill={cc([theme == "dark" ? "#DDF23D" : "#4F4F4F"])}
        />
      ),
    },
  ];

  const router = useRouter();
  const handleClick = (e: IconSwap) => {
    setIsActiveTab(e.id);
    router.push(e.href);
  };

  return (
    <>
      {swappingTabs.map((swapIcons) => {
        return (
          <div
            key={swapIcons.id}
            className={cc([
              isActiveTab == swapIcons.id
                ? "dark:p-medium-bold-dark p-medium-bold border-l dark:border-[#DDF23D] border-black "
                : "dark:p-medium-bold p-medium-bold opacity-50 border-l dark:border-[#313131]",
              "flex-1 md:p-4 cursor-pointer",
            ])}
            onClick={() => {
              handleClick(swapIcons);
            }}
          >
            <div className="flex items-center justify-center w-full">
              {swapIcons.icon}
            </div>
          </div>
        );
      })}
    </>
  );
};
