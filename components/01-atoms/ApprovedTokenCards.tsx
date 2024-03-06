/* eslint-disable react-hooks/exhaustive-deps */
import { ApproveTokenCard } from "@/components/03-organisms";
import { SwapContext } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { Token } from "@/lib/shared/types";
import { useContext, useEffect, useState } from "react";

export const ApprovedTokenCards = () => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const [tokensApprovedForSwap, setTokensApprovedForSwap] = useState<Token[]>(
    [],
  );

  const { authenticatedUserTokensList, setApprovedTokensCount } =
    useContext(SwapContext);

  useEffect(() => {
    setApprovedTokensCount(0);
  }, [authenticatedUserTokensList]);

  if (!authenticatedUserAddress?.address) {
    return null;
  }

  const addNewTokenToApprovedList = (token: Token) => {
    if (!tokensApprovedForSwap.includes(token)) {
      const approvedTokensCount = tokensApprovedForSwap.length + 1;
      setTokensApprovedForSwap([...tokensApprovedForSwap, token]);
      setApprovedTokensCount(approvedTokensCount);
    }
  };

  return (
    <div className="flex justify-center items-center relative">
      <div className="grid grid-cols-1 w-[100%] gap-3 relative overflow-y-auto max-h-[370px]">
        {authenticatedUserTokensList.map((token, index) => (
          <ApproveTokenCard
            setTokenWasApprovedForSwap={addNewTokenToApprovedList}
            key={index}
            token={token}
          />
        ))}
      </div>
    </div>
  );
};
