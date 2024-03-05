import { SwapContext } from "../01-atoms";
import { ProgressBar } from "../01-atoms/ProgressBar";
import { useContext } from "react";

export const ProgressStatus = () => {
  const { approvedTokensCount, authenticatedUserTokensList } =
    useContext(SwapContext);

  return (
    <div className="w-max flex flex-grow gap-2 justify-center items-center">
      <p className="flex w-fit mr-auto md:mr-4">
        {approvedTokensCount + " / " + authenticatedUserTokensList.length}
      </p>
      <div className="hidden md:block w-[80%] max-w-[200px] mr-auto">
        <ProgressBar
          currentStep={approvedTokensCount}
          numberOfItems={authenticatedUserTokensList.length}
        />
      </div>
    </div>
  );
};
