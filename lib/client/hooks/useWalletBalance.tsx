import { getRpcHttpUrlForNetwork } from "../constants";
import { EthereumAddress } from "@/lib/shared/types";
import { useEffect, useState } from "react";
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
  const [balanceQueryStatus, setBalanceQueryStatus] =
    useState<WalletBalanceQueryStatus>(WalletBalanceQueryStatus.LOADING);

  const { chain } = useNetwork();

  const RpcHttpUrlForNetwork = chain
    ? getRpcHttpUrlForNetwork.get(chain?.id)
    : "";

  useEffect(() => {
    if (walletAddress && chain && !!RpcHttpUrlForNetwork) {
      const client = createPublicClient({
        chain: chain,
        transport: http(RpcHttpUrlForNetwork),
      });

      setBalanceQueryStatus(WalletBalanceQueryStatus.LOADING);

      client
        .getBalance({
          address: walletAddress.address as `0x${string}`,
        })
        .then((fetchedBalance) => {
          setBalanceQueryStatus(WalletBalanceQueryStatus.SUCCESS);
          !!chain &&
            setBalance(
              formatUnits(fetchedBalance, chain.nativeCurrency.decimals),
            );
        })
        .catch(() => {
          setBalanceQueryStatus(WalletBalanceQueryStatus.ERROR);
          setBalance(null);
        });
    } else {
      setBalance(null);
      setBalanceQueryStatus(WalletBalanceQueryStatus.ERROR);
    }
  }, [walletAddress, chain, RpcHttpUrlForNetwork]);

  return {
    balance,
    balanceQueryStatus,
  };
};
