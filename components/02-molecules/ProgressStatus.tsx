import { SwapContext, ProgressBar } from "@/components/01-atoms";
import { useContext } from "react";

export const ProgressStatus = () => {
  const { approvedTokensCount, authenticatedUserSelectedTokensList } =
    useContext(SwapContext);

  return (
    <div className="w-max flex flex-grow gap-2 justify-center items-center">
      <p className="flex w-fit mr-auto md:mr-4">
        {approvedTokensCount +
          " / " +
          authenticatedUserSelectedTokensList.length}
      </p>
      <div className="hidden md:block w-[80%] max-w-[200px] mr-auto">
        <ProgressBar
          currentStep={approvedTokensCount}
          numberOfItems={authenticatedUserSelectedTokensList.length}
        />
      </div>
    </div>
  );
};
