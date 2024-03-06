/* eslint-disable react-hooks/exhaustive-deps */
import { getBlockchainTimestamp } from "@/lib/client/blockchain-utils";
import { ExpireDate } from "@/lib/client/ui-utils";
import { TimeStampDate } from "@/lib/client/swap-utils";
import { ArrowIcon, SwapContext } from "@/components/01-atoms";
import { useContext, useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import cc from "classcat";

export const SwapExpireTime = () => {
  const { chain } = useNetwork();
  const { setTimeDate } = useContext(SwapContext);
  const [expireDate, setExpireDate] = useState<TimeStampDate>(
    TimeStampDate.ONE_DAY,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  let chainId: number;

  if (typeof chain?.id !== "undefined") {
    chainId = chain.id;
  }

  const fetchData = async (selectedValue: TimeStampDate) => {
    try {
      const timeSelected = BigInt(selectedValue);
      const timestamp = await getBlockchainTimestamp(chainId);
      setTimeDate(timeSelected + timestamp);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleSelectExpirateDate = (selectedExpirationDate: TimeStampDate) => {
    setExpireDate(selectedExpirationDate);
    fetchData(selectedExpirationDate);
  };

  useEffect(() => {
    fetchData(expireDate);
  }, [expireDate]);

  return (
    <div className="flex">
      <div className="flex xl:max-h-[36px] xl:w-[227px]">
        <div className="dark:bg-[#353836] bg-[#E4E4E4] rounded-l-lg border dark:border-[#353836] border-[#E4E4E4] flex items-center xl:py-2 xl:px-3 p-small-variant-black-2 dark:p-small-dark-variant-grey">
          Expiry
        </div>
        <div
          className="flex w-full relative"
          role="button"
          onClick={handleToggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <div
            className={cc([
              "w-full h-full flex justify-between items-center px-3 py-2 dark:bg-[#212322] bg-[#F6F6F6] hover:bg-[#F0EEEE75] hover:shadow-[0_0_6px_1px_#00000014] border-[#E4E4E4] rounded-r-lg border dark:border-[#353836] hover:border-[#AABE13] dark:hover:border-[#edff6259] transition duration-300 ease-in-out",
              isOpen &&
                "hover:bg-[#F0EEEE75] hover:border-[#D6D5D5] dark:border-[#353836] dark:hover:border-[#edff6259]",
            ])}
          >
            <div className="flex p-small-variant-black-2 dark:p-small-dark-variant-grey">
              <div>
                {ExpireDate.find((item) => item.value === expireDate)?.label}
              </div>
            </div>
            <div className="flex">
              <ArrowIcon
                props={{
                  className: "dark:text-[#707572] text-[#A3A9A5]",
                }}
                variant={isOpen ? "up" : "down"}
              />
            </div>
          </div>
          {isOpen && (
            <div className="absolute z-10 bg-white dark:bg-[#212322] border dark:border-[#505150] dark:shadow-swap-connection-dropwdown rounded-xl top-[36px] w-full">
              {Object.values(ExpireDate).map((expirationDate, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectExpirateDate(expirationDate.value)}
                  className={cc([
                    "gap-2 flex px-4 py-2 p-small-variant-black-2 dark:p-small-dark-variant-grey items-center hover:dark:bg-[#353836] hover:bg-[#F0EEEE75] hover:dark:p-small-dark",
                    { "rounded-t-xl": index === 0 },
                    { "rounded-b-xl": index === ExpireDate.length - 1 },
                  ])}
                >
                  {expirationDate.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
