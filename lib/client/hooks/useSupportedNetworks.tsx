import { ChainInfo } from "../constants";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";

export const useSupportedNetworks = () => {
  const [isNetworkSupported, setIsNetworkSupported] = useState(true);
  const supportedNetworksId = Object.values(ChainInfo).map((net) => net.id);
  const { chain } = useNetwork();

  useEffect(() => {
    if (
      chain &&
      supportedNetworksId.includes(chain.id) &&
      chain.id === 11155111 // Hardcoded for now to accept only Sepolia for now, until we accept others chains afther alpha
    ) {
      setIsNetworkSupported(true);
    } else {
      setIsNetworkSupported(false);
    }
  }, [supportedNetworksId, chain]);

  return {
    isNetworkSupported,
  };
};
