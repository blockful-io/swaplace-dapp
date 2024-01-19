import { useContext, useEffect, useState } from "react";
import { SwapContext } from "../01-atoms";
import { ADDRESS_ZERO } from "@/lib/client/constants";
import { ProgressBar } from "../01-atoms/ProgressBar";

export const ProgressStatus = () => {
  const { authedUserSelectedNftsApprovalStatus } = useContext(SwapContext);

  const [
    authedUserSelectedApprovedItemsLenght,
    setAuthedUserSelectedApprovalLenght,
  ] = useState(0);
  useEffect(() => {
    if (authedUserSelectedNftsApprovalStatus.length) {
      const approvedNftsCount = authedUserSelectedNftsApprovalStatus.filter(
        (item) => item.approved !== ADDRESS_ZERO,
      ).length;

      setAuthedUserSelectedApprovalLenght(approvedNftsCount);
    }
  }, [authedUserSelectedNftsApprovalStatus]);

  return (
    <div className="flex gap-2 md:w-[200px] justify-center items-center">
      <div className="flex">
        <p>
          {authedUserSelectedApprovedItemsLenght +
            "/" +
            authedUserSelectedNftsApprovalStatus.length}
        </p>
      </div>
      <div className="flex w-full">
        <ProgressBar
          currentStep={authedUserSelectedApprovedItemsLenght}
          numberOfItems={authedUserSelectedNftsApprovalStatus.length}
        />
      </div>
    </div>
  );
};
