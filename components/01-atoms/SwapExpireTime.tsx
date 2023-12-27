import React, { useContext, useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import { SwapContext } from ".";
import { TimeStampDate, ExpireDate } from "@/lib/client/constants";
import { getTimestamp } from "@/lib/client/utils";

export const SwapExpireTime = () => {
  const { chain } = useNetwork();
  const { setTimeDate } = useContext(SwapContext);
  const [selectedOption, setSelectedOption] = useState<TimeStampDate>(
    TimeStampDate.ONE_DAY,
  );

  let chainID: number;

  if (typeof chain?.id !== "undefined") {
    chainID = chain.id;
  }

  const fetchData = async (selectedValue: TimeStampDate) => {
    try {
      const timeSelected = BigInt(selectedValue);
      const timestamp = await getTimestamp(chainID);
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
        <div className="dark:bg-[#353836] flex justify-center items-center xl:p-3 dark:p-small-dark p-small">
          Expires in
        </div>
        <div className="flex justify-center items-center">
          <div className="xl:px-3 py-2 flex justify-center items-center ">
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="bg-inherit dark:p-small-dark p-small  "
            >
              {ExpireDate.map((option, index) => (
                <option
                  key={index}
                  value={option.value}
                  className="dark:text-black font-onest font-normal text-[14px] leading-[20px] "
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
