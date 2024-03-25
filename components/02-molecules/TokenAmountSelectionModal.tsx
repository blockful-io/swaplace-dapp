/* eslint-disable react-hooks/exhaustive-deps */
import { SwapContext, SwapModalLayout } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { toastBlockchainTxError } from "@/lib/client/blockchain-utils";
import { getTokenName } from "@/lib/client/ui-utils";
import {
  ERC20,
  ERC20WithTokenAmountSelection,
  EthereumAddress,
  Token,
} from "@/lib/shared/types";
import { useContext, useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import toast from "react-hot-toast";

interface TokenAmountSelectionModalProps {
  onCloseModal: () => void;
  owner: EthereumAddress | null;
  token: Token | null;
}

export const TokenAmountSelectionModal = ({
  owner,
  token,
  onCloseModal,
}: TokenAmountSelectionModalProps) => {
  const [tokenAmount, setTokenAmount] = useState(0n);
  const [userBalance, setUserBalance] = useState(0n);
  const { chain } = useNetwork();

  const { authenticatedUserAddress } = useAuthenticatedUser();
  const {
    authenticatedUserTokensList,
    searchedUserTokensList,
    setAuthenticatedUserTokensList,
    setSearchedUserTokensList,
  } = useContext(SwapContext);

  useEffect(() => {
    if (chain?.id && token && owner) {
      const balance = (token as ERC20).rawBalance;

      setUserBalance(balance);
    }
  }, [token, owner]);

  const closeAmountSelectionModal = () => {
    if (!owner || !token) {
      toastBlockchainTxError(
        "No token or token's owner selected to set amount for.",
      );
      throw new Error("No token or token's owner selected to set amount for.");
    }

    const tokenOwnerIsAuthedUser = authenticatedUserAddress?.equals(owner);

    let originalTokensList: Token[];
    if (tokenOwnerIsAuthedUser) {
      originalTokensList = [...authenticatedUserTokensList];
    } else {
      originalTokensList = [...searchedUserTokensList];
    }

    if (!tokenAmount) {
      toast.error("No Token amount was set.", {
        id: "no-token-amount",
      });

      originalTokensList = originalTokensList.filter((tk) => tk !== token);
    } else if (tokenAmount > userBalance) {
      toast.error("The Token amount informed exceeds user's token balance.", {
        id: "out-of-bounds-token-amount",
      });

      originalTokensList = originalTokensList.filter((tk) => tk !== token);
    } else {
      originalTokensList.map((token) => {
        if (tokenAmount && token.contract === token.contract) {
          (token as ERC20WithTokenAmountSelection).tokenAmount = tokenAmount;
        } else if (!tokenAmount) {
          originalTokensList = originalTokensList.filter(
            (token) => token.contract !== token.contract,
          );
        }
      });
    }

    if (tokenOwnerIsAuthedUser) {
      setAuthenticatedUserTokensList(originalTokensList);
    } else {
      setSearchedUserTokensList(originalTokensList);
    }

    setUserBalance(0n);
    setTokenAmount(0n);

    onCloseModal();
  };

  if (!token) return null;

  return (
    <SwapModalLayout
      toggleCloseButton={{
        open: !!token,
        onClose: closeAmountSelectionModal,
      }}
      text={{ title: "Add token amount" }}
      body={
        <>
          <div className="flex w-full">
            <div className="relative w-full">
              <input
                type="number"
                name="amount"
                placeholder="0.00"
                onChange={(e) => {
                  try {
                    const inputAsBigInt = BigInt(e.target.value);

                    setTokenAmount(inputAsBigInt);
                  } catch {
                    toast.error("Invalid Token amount set");

                    setTokenAmount(0n);
                  }
                }}
                className="w-full rounded-lg rounded-r-none p-3 text-left bg-[#282B29] border-[#353836] border-r-0 focus:outline-none"
                id={token.tokenType + "-amount-selector"}
              />
            </div>
            <label
              htmlFor={token.tokenType + "-amount-selector"}
              className="rounded-lg rounded-l-none truncate bg-[#353836] border-[#353836] text-sm text-[#A3A9A5] p-3 pt-3.5"
            >
              {getTokenName(token)}
            </label>
          </div>
          <button
            onClick={closeAmountSelectionModal}
            className="w-full bg-[#DDF23D] p-2 text-center text-black rounded-lg"
          >
            Add to offer
          </button>
        </>
      }
    />
  );
};
