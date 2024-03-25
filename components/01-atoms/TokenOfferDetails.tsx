import {
  DoneIcon,
  OfferTag,
  ThreeDotsCardOffersOptions,
} from "@/components/01-atoms";
import { EthereumAddress } from "@/lib/shared/types";
import React from "react";

interface TokenOfferDetailsProps {
  status?: string;
  owner?: EthereumAddress;
  expiry?: string;
}

export const TokenOfferDetails = ({
  status,
  owner,
  expiry,
}: TokenOfferDetailsProps) => {
  // TODO: Create acceptSwap function
  const acceptSwap = () => {
    return;
  };

  const displayStatus = status;

  // TODO: Include status, owner and expiryDate
  return (
    <div className="flex w-full justify-between items-center py-2 px-3">
      <div>
        <ul className="flex p-small dark:!text-[#A3A9A5] items-center gap-2">
          {displayStatus && <OfferTag status={displayStatus} />}
          <li className="flex items-center gap-2">
            <div className=" w-1 h-1 bg-neutral-600 rounded-full shadow-inner" />
            Expires on {expiry}
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1 h-1 bg-neutral-600 rounded-full shadow-inner" />
            Created by {owner?.getEllipsedAddress()}
          </li>
        </ul>
      </div>
      <div className="flex gap-2 justify-center items-center ">
        <div>
          <button
            onClick={acceptSwap}
            className="disabled:pointer-events-none rounded-lg w-full h-[28px] shadow-tag bg-[#d8f035] py-1 px-3 items-center flex justify-center gap-2"
          >
            <DoneIcon className="text-[#181A19]" />
            <p className="p-medium-bold-variant-black">Accept</p>
          </button>
        </div>

        <ThreeDotsCardOffersOptions />
      </div>
    </div>
  );
};
