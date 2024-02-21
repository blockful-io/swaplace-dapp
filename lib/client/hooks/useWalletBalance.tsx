import { weiToEther } from "../utils";
import { EthereumAddress } from "@/lib/shared/types";
import { useEffect, useState } from "react";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

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

  useEffect(() => {
    if (walletAddress) {
      const mainnetClient = createPublicClient({
        chain: mainnet,
        transport: http(),
      });

      setBalanceQueryStatus(WalletBalanceQueryStatus.LOADING);

      mainnetClient
        .getBalance({
          address: walletAddress.address as `0x${string}`,
        })
        .then((fetchedBalance) => {
          setBalanceQueryStatus(WalletBalanceQueryStatus.SUCCESS);
          setBalance(weiToEther(fetchedBalance));
        })
        .catch(() => {
          setBalanceQueryStatus(WalletBalanceQueryStatus.ERROR);
          setBalance(null);
        });
    } else {
      setBalance(null);
      setBalanceQueryStatus(WalletBalanceQueryStatus.ERROR);
    }
  }, [walletAddress]);

  return {
    balance,
    balanceQueryStatus,
  };
};
