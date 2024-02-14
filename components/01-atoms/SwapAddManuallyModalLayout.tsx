import { CloseIcon } from "./icons/CloseIcon";
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
}

const SwapBody = () => {
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-2">
        <div className="dark:p-small-dark p-small">Swap ID</div>
        <div>
          <input className="w-full p-3 bg-[#282a29] border border-[#353836] rounded-lg h-[44px]" />
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
  enum TokenPosibilities {
    ERC20 = "ERC20",
    ERC721 = "ERC721",
  }

  type TokenPossibilites = TokenPosibilities | "ERC20" | "ERC721";

  const [token, setToken] = useState<TokenPossibilites>("ERC20");
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-2">
        <div className="">What kind of token you want to add?</div>
        <div className="flex justify-between gap-3 ">
          <button
            className={cc([
              "w-full border border-[#353836] rounded-lg py-3 pl-3 pr-4 text-start bg-[#282B29]",
              token === "ERC20"
                ? "bg-[#ddf23d]  p-medium-2"
                : "dark:p-medium-2-dark hover:bg-[#353836]",
            ])}
            onClick={() => {
              setToken("ERC20");
            }}
          >
            ERC20
          </button>
          <button
            className={cc([
              "w-full  border border-[#353836] rounded-lg py-3 pl-3 pr-4 text-start bg-[#282B29]",
              token === "ERC721"
                ? "bg-[#ddf23d]  p-medium-2"
                : "dark:p-medium-2-dark hover:bg-[#353836]",
            ])}
            onClick={() => {
              setToken("ERC721");
            }}
          >
            ERC721
          </button>
        </div>
      </div>
      <div>
        {token === "ERC20" ? (
          <div className="flex flex-col gap-2">
            <div className="dark:p-small-dark p-small">Contract address</div>
            <div>
              <input className="w-full p-3 bg-[#282a29] border border-[#353836] rounded-lg h-[44px]" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="dark:p-small-dark p-small">Contract address</div>
              <div>
                <input className="w-full p-3 bg-[#282a29] border border-[#353836] rounded-lg h-[44px]" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="dark:p-small-dark p-small ">Token ID</div>
              <div>
                <input className="w-full p-3 bg-[#282a29] border border-[#353836] rounded-lg h-[44px]" />
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
}: AddManuallyProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { theme } = useTheme();
  return (
    <div className="dark:bg-[#212322] min-h-[256px] min-w-[400px] border rounded-[20px] border-[#353836] shadow-add-manually-card">
      <div className="w-full p-6 flex gap-5 justify-center items-center border-b border-[#353836]">
        <div className="flex w-[304px]  dark:title-h3-normal-dark title-h3-normal">
          {AddManuallyVariantConfig[variant].header}
        </div>
        <div
          className="flex"
          role="button"
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          <CloseIcon fill={cc([theme == "light" ? "black" : "white"])} />
        </div>
      </div>
      <div className="p-6">{AddManuallyVariantConfig[variant].body}</div>
    </div>
  );
};
