/* eslint-disable react-hooks/exhaustive-deps */
import { XMarkIcon } from ".";
import { getTokenBalance } from "@/lib/client/blockchain-utils";
import { getTokenName } from "@/lib/client/ui-utils";
import { EthereumAddress, Token } from "@/lib/shared/types";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";

interface TokenAmountSelectionModalProps {
  owner: EthereumAddress | null;
  token: Token | null;
  onCloseModal: (amount: string | null) => void;
}

export const TokenAmountSelectionModal = ({
  owner,
  token,
  onCloseModal,
}: TokenAmountSelectionModalProps) => {
  const [tokenAmount, setTokenAmount] = useState<string>("0");
  const [userBalance, setUserBalance] = useState<string>("0");
  const { chain } = useNetwork();

  useEffect(() => {
    if (chain?.id && token && owner) {
      getTokenBalance(owner, token, chain.id).then((balance) => {
        if (balance !== null) {
          setUserBalance(balance);
        }
      });
    }
  }, [token]);

  const setMaxTokenAmount = async () => {
    if (userBalance) {
      setTokenAmount(userBalance);
    }
  };

  const updateTokenAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) > Number(userBalance)) {
      setTokenAmount(userBalance);
    }
  };

  if (!token) return null;

  return (
    <>
      <div
        role="button"
        onClick={() => onCloseModal(null)}
        className="fixed left-0 top-0 w-full h-screen z-30 backdrop-blur-sm transition-all duration-300"
      ></div>
      <div className="bg-[#212322] w-[90%] max-w-[400px] rounded-[20px] text-white border border-[#353836] fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000]">
        <nav className="w-full text-xl p-6 flex items-center justify-between border-b border-[#353836]">
          <h3>Add token amount</h3>
          <button
            onClick={() => onCloseModal(null)}
            className="p-[10px] rounded-full border border-[#353836] hover:bg-[#353836] transition"
          >
            <XMarkIcon className="text-white w-[18px] h-[18px]" />
          </button>
        </nav>
        <div className="p-6">
          <div className="flex w-full">
            <div className="relative w-full">
              <input
                type="number"
                name="amount"
                value={tokenAmount}
                className="w-full rounded-lg rounded-r-none p-3 text-left bg-[#282B29] border-[#353836] border-r-0"
                onChange={updateTokenAmount}
                id={token.tokenType + "-amount-selector"}
              />
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#A3A9A5] hover:text-white transition"
                onClick={setMaxTokenAmount}
              >
                MAX
              </button>
            </div>
            <label
              htmlFor={token.tokenType + "-amount-selector"}
              className="rounded-lg rounded-l-none truncate bg-[#353836] border-[#353836] text-sm text-[#A3A9A5] p-3"
            >
              {getTokenName(token)}
            </label>
          </div>
          <button
            onClick={() => onCloseModal(tokenAmount)}
            className="w-full bg-[#DDF23D] p-2 text-center text-black mt-6 rounded-lg"
          >
            Add to offer
          </button>
        </div>
      </div>
    </>
  );
};
