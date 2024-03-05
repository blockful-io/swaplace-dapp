/* eslint-disable react-hooks/exhaustive-deps */
import { SwapContext } from ".";
import { getBlockchainTimestamp } from "@/lib/client/blockchain-utils";
import { ExpireDate, TimeStampDate } from "@/lib/client/ui-utils";
import React, { useContext, useEffect, useState } from "react";
import { useNetwork } from "wagmi";

export const SwapExpireTime = () => {
  const { chain } = useNetwork();
  const { setTimeDate } = useContext(SwapContext);
  const [selectedOption, setSelectedOption] = useState<TimeStampDate>(
    TimeStampDate.ONE_DAY,
  );

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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value as unknown as TimeStampDate;
    setSelectedOption(selectedValue);
    fetchData(selectedValue);
  };

  useEffect(() => {
    fetchData(selectedOption);
  }, [selectedOption]);

  return (
    <div className="flex">
      <div className="flex xl:h-[36px] rounded-lg border border-[#353836]">
        <div className="dark:bg-[#353836] flex justify-center items-center p-2 xl:p-3 dark:p-small-dark p-small">
          Expires in
        </div>
        <div className="flex justify-center items-center">
          <div className="xl:px-3 py-2 flex justify-center items-center ">
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="bg-inherit dark:p-small-dark p-small mx-2"
            >
              {ExpireDate.map((option, index) => (
                <option
                  key={index}
                  value={option.value}
                  className="dark:text-black font-onest font-normal text-[14px] leading-[20px]"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
