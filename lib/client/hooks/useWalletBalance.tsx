import { getRpcHttpUrlForNetwork } from "../constants";
import { EthereumAddress } from "@/lib/shared/types";
import { useEffect, useRef, useState } from "react";
import { createPublicClient, formatUnits, http } from "viem";
import { useNetwork } from "wagmi";

export enum WalletBalanceQueryStatus {
  LOADING,
  SUCCESS,
  ERROR,
}

interface Props {
  walletAddress: EthereumAddress | null;
}

export const useWalletBalance = ({ walletAddress }: Props) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [balanceQueryStatus, setBalanceQueryStatus] = useState<WalletBalanceQueryStatus>(WalletBalanceQueryStatus.LOADING);

  const { chain } = useNetwork();

  const prevChainRef = useRef(chain);

  useEffect(() => {
    if (walletAddress && chain && !!getRpcHttpUrlForNetwork.get(chain?.id)) {
      const client = createPublicClient({
        chain: chain,
        transport: http(),
      });

      setBalanceQueryStatus(WalletBalanceQueryStatus.LOADING);

      client
        .getBalance({
          address: walletAddress.address as `0x${string}`,
        })
        .then((fetchedBalance) => {
          setBalanceQueryStatus(WalletBalanceQueryStatus.SUCCESS);
          !!chain && setBalance(formatUnits(fetchedBalance, chain.nativeCurrency.decimals));
        })
        .catch(() => {
          setBalanceQueryStatus(WalletBalanceQueryStatus.ERROR);
          setBalance(null);
        });
    } else {
      setBalance(null);
      setBalanceQueryStatus(WalletBalanceQueryStatus.ERROR);
    }
    prevChainRef.current = chain;
  }, [walletAddress, chain]);

    // console.log("Previous chain: ", prevChainRef.current);
    // console.log("Current chain: ", chain);

  return {
    balance,
    balanceQueryStatus,
  };
};
