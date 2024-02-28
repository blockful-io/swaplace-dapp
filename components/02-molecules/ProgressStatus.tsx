import { SwapContext, ProgressBar } from "@/components/01-atoms";
import { ADDRESS_ZERO } from "@/lib/client/constants";
import { useContext, useEffect, useState } from "react";

export const ProgressStatus = () => {
  const { authedUserSelectedNftsApprovalStatus } = useContext(SwapContext);

  const [
    authedUserSelectedApprovedItemsLength,
    setAuthedUserSelectedApprovalLength,
  ] = useState(0);
  useEffect(() => {
    if (authedUserSelectedNftsApprovalStatus.length) {
      const approvedNftsCount = authedUserSelectedNftsApprovalStatus.filter(
        (item) => item.approved !== ADDRESS_ZERO,
      ).length;

      setAuthedUserSelectedApprovalLength(approvedNftsCount);
    }
  }, [authedUserSelectedNftsApprovalStatus]);

  return (
    <div className="flex gap-2 md:w-[200px] justify-center items-center">
      <div className="flex">
        <p>
          {authedUserSelectedApprovedItemsLength +
            "/" +
            authedUserSelectedNftsApprovalStatus.length}
        </p>
      </div>
      <div className="flex w-full">
        <ProgressBar
          currentStep={authedUserSelectedApprovedItemsLength}
          numberOfItems={authedUserSelectedNftsApprovalStatus.length}
        />
      </div>
    </div>
  );
};
