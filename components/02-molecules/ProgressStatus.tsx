import { SwapContext } from "../01-atoms";
import { ProgressBar } from "../01-atoms/ProgressBar";
import { useContext } from "react";

export const ProgressStatus = () => {
  const { approvedTokensCount, authenticatedUserTokensList } =
    useContext(SwapContext);

  return (
    <div className="flex gap-2 md:w-[200px] justify-center items-center">
      <div className="flex">
        <p>{approvedTokensCount + "/" + authenticatedUserTokensList.length}</p>
      </div>
      <div className="flex w-full">
        <ProgressBar
          currentStep={approvedTokensCount}
          numberOfItems={authenticatedUserTokensList.length}
        />
      </div>
    </div>
  );
};
