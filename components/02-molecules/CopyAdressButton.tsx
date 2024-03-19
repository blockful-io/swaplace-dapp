import { CopyIcon, DoneIcon, Tooltip } from "@/components/01-atoms";
import React, { useEffect, useState } from "react";

export const CopyAdressButton = ({
  authenticatedUserAddress,
  displayAddress,
}: {
  authenticatedUserAddress: string;
  displayAddress: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
  }, [isCopied]);

  return (
    <Tooltip position="top" content={isCopied ? "Copied!" : "Copy address"}>
      <button
        onClick={() => {
          navigator.clipboard.writeText(authenticatedUserAddress);
          setIsCopied(true);
        }}
        className="flex group items-center justify-center gap-2 dark:hover:bg-[#DDF23D] hover:bg-[#AABE13] dark:hover:bg-opacity-10 py-1/2 px-1 rounded-[4px] transition-colors duration-200"
      >
        <h3 className="text-sm group-hover:text-[#F6F6F6] transition-colors duration-200">{`${displayAddress}`}</h3>
        <div>
          <div className="p-1">
            {isCopied ? (
              <DoneIcon className="dark:text-[#F6F6F6] group-hover:text-[#F6F6F6] transition-colors duration-200  text-[#AABE13] w-4 h-4" />
            ) : (
              <CopyIcon className="dark:text-[#F6F6F6] group-hover:text-[#F6F6F6] transition-colors duration-200 text-[#AABE13] w-4 h-4" />
            )}
          </div>
        </div>
      </button>
    </Tooltip>
  );
};
