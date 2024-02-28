import { ChainInfo } from "../constants";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {  sepolia, useNetwork, useSwitchNetwork } from "wagmi";

export const useConnectedChain = () => {
  const [isNetworkSupported, setIsNetworkSupported] = useState(true);

  const supportedNetworksId = Object.values(ChainInfo).map(net => net.id)

  const { chain } = useNetwork();

  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (chain && supportedNetworksId.includes(chain.id)) {
      setIsNetworkSupported(true);
    } else {
      setIsNetworkSupported(false);
      toast.error(`Network not supported, change network and try again`, {
        id: "welcome-toast",
      });
      switchNetwork && switchNetwork(sepolia.id)
    }
  }, [chain, supportedNetworksId, switchNetwork]);

  return {
    isNetworkSupported,
  };
};