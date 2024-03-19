import { SwapModalLayout } from "@/components/01-atoms";
import { TokenType } from "@/lib/shared/types";
import React, { useState } from "react";
import cc from "classcat";

export enum AddTokenOrSwapManuallyModalVariant {
  SWAP = "swap",
  TOKEN = "token",
}

interface AddManuallyConfig {
  header: string;
  body: React.ReactNode;
}

interface AddManuallyProps {
  variant?: AddTokenOrSwapManuallyModalVariant;
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

const AddTokenOrSwapManuallyModalConfig: Record<
  AddTokenOrSwapManuallyModalVariant,
  AddManuallyConfig
> = {
  [AddTokenOrSwapManuallyModalVariant.SWAP]: {
    header: "Add swap manually",
    body: <SwapBody />,
  },
  [AddTokenOrSwapManuallyModalVariant.TOKEN]: {
    header: "Add token",
    body: <TokenBody />,
  },
};

export const AddTokenOrSwapManuallyModal = ({
  variant = AddTokenOrSwapManuallyModalVariant.TOKEN,
  open,
  onClose,
}: AddManuallyProps) => {
  return (
    <SwapModalLayout
      toggleCloseButton={{ open, onClose }}
      body={AddTokenOrSwapManuallyModalConfig[variant].body}
      text={{ title: AddTokenOrSwapManuallyModalConfig[variant].header }}
    />
  );
};
