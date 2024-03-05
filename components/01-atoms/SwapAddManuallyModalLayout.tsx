import { CloseIcon } from "./icons/CloseIcon";
import { useScreenSize } from "@/lib/client/hooks/useScreenSize";
import { TokenType } from "@/lib/shared/types";
import React, { useState } from "react";
import cc from "classcat";
import { useTheme } from "next-themes";

export enum AddManuallyVariant {
  SWAP = "swap",
  TOKEN = "token",
}

type Variant = AddManuallyVariant | "swap" | "token";

interface AddManuallyConfig {
  header: string;
  body: React.ReactNode;
}

interface AddManuallyProps {
  variant?: Variant;
  open: boolean;
  onClose: () => void;
}

const SwapBody = () => {
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-2">
        <div className="dark:p-small-dark p-small-variant-black">Swap ID</div>
        <div>
          <input className="w-full p-3 dark:bg-[#282a29] border border-[#353836] rounded-lg h-[44px]" />
        </div>
      </div>
      <div className="flex h-[36px]">
        <button className="bg-[#DDF23D] hover:bg-[#aabe13] w-full dark:shadow-add-manually-button py-2 px-4 rounded-[10px] p-medium-bold-variant-black">
          Add Swap
        </button>
      </div>
    </div>
  );
};

const TokenBody = () => {
  const [token, setToken] = useState<TokenType>(TokenType.ERC20);
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-2">
        <div className="">What kind of token you want to add?</div>
        <div className="flex justify-between gap-3 ">
          <button
            className={cc([
              "w-full border border-[#353836] rounded-lg py-3 pl-3 pr-4 text-start dark:bg-[#282B29]",
              token === TokenType.ERC20
                ? "dark:bg-[#ddf23d] bg-[#ddf23d] p-medium-2"
                : "dark:p-medium-2-dark dark:hover:bg-[#353836] hover:bg-[#35383617]",
            ])}
            onClick={() => {
              setToken(TokenType.ERC20);
            }}
          >
            ERC20
          </button>
          <button
            className={cc([
              "w-full  border border-[#353836] rounded-lg py-3 pl-3 pr-4 text-start dark:bg-[#282B29]",
              token === TokenType.ERC721
                ? "dark:bg-[#ddf23d] bg-[#ddf23d] p-medium-2"
                : "dark:p-medium-2-dark dark:hover:bg-[#353836] hover:bg-[#35383617]",
            ])}
            onClick={() => {
              setToken(TokenType.ERC721);
            }}
          >
            ERC721
          </button>
        </div>
      </div>
      <div>
        {token === TokenType.ERC20 ? (
          <div className="flex flex-col gap-2">
            <div className="dark:p-small-dark p-small-variant-black">
              Contract address
            </div>
            <div>
              <input className="w-full p-3 dark:bg-[#282a29] border border-[#353836] rounded-lg h-[44px]" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="dark:p-small-dark p-small-variant-black">
                Contract address
              </div>
              <div>
                <input className="w-full p-3 dark:bg-[#282a29] border border-[#353836] rounded-lg h-[44px]" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="dark:p-small-dark p-small-variant-black ">
                Token ID
              </div>
              <div>
                <input className="w-full p-3 dark:bg-[#282a29] border border-[#353836] rounded-lg h-[44px]" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex h-[36px]">
        <button className="bg-[#DDF23D] hover:bg-[#aabe13] w-full dark:shadow-add-manually-button py-2 px-4 rounded-[10px] p-medium-bold-variant-black">
          Add token
        </button>
      </div>
    </div>
  );
};

const AddManuallyVariantConfig: Record<AddManuallyVariant, AddManuallyConfig> =
  {
    [AddManuallyVariant.SWAP]: {
      header: "Add swap manually",
      body: <SwapBody />,
    },
    [AddManuallyVariant.TOKEN]: {
      header: "Add token",
      body: <TokenBody />,
    },
  };

export const SwapAddManuallyModalLayout = ({
  variant = AddManuallyVariant.TOKEN,
  open,
  onClose,
}: AddManuallyProps) => {
  const { theme } = useTheme();
  const { isMobile } = useScreenSize();
  return (
    <dialog open={open} onClose={onClose} className={cc(["rounded-[20px]"])}>
      <div
        className={cc([
          open &&
            "z-40 fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center ",
        ])}
      >
        <div
          className={cc([
            "dark:bg-[#212322] bg-white min-h-[256px] min-w-[400px] border rounded-[20px] border-[#353836] shadow-add-manually-card",
            isMobile && "min-w-[90%] w-[300px]",
          ])}
        >
          <div className="w-full p-6 flex gap-5 justify-center items-center border-b border-[#353836]">
            <div className="flex w-[304px]  dark:title-h3-normal-dark title-h3-normal">
              {AddManuallyVariantConfig[variant].header}
            </div>
            <div className="flex" role="button" onClick={onClose}>
              <CloseIcon
                className={cc([theme == "light" ? "text-black" : "text-white"])}
              />
            </div>
          </div>
          <div className="p-6">{AddManuallyVariantConfig[variant].body}</div>
        </div>
      </div>
    </dialog>
  );
};
