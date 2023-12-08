/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EthereumAddress } from "@/lib/shared/types";
import React, { useEffect, useState } from "react";

interface SwapContextProps {
  inputAddress: string;
  validatedAddressToSwap: string;
  setInputAddress: (address: string) => void;
  validateAddressToSwap: () => void;
}

export const SwapContext = React.createContext<SwapContextProps>({
  inputAddress: "",
  validatedAddressToSwap: "",
  validateAddressToSwap: () => {},
  setInputAddress: (address: string) => {},
});

export const SwapContextProvider = ({ children }: any) => {
  const [inputAddress, setInputAddress] = useState<string>("");
  const [validatedAddressToSwap, setValidatedAddressToSwap] = useState("");

  const validateAddressToSwap = () => {
    try {
      new EthereumAddress(inputAddress);
      setValidatedAddressToSwap(inputAddress);
    } catch (event: any) {
      setValidatedAddressToSwap("");
    }
  };

  useEffect(() => {
    setSwapData({
      inputAddress,
      setInputAddress,
      validatedAddressToSwap,
      validateAddressToSwap,
    });
  }, [inputAddress, validatedAddressToSwap]);

  const [swapData, setSwapData] = useState<SwapContextProps>({
    inputAddress,
    setInputAddress,
    validatedAddressToSwap,
    validateAddressToSwap,
  });

  return (
    <SwapContext.Provider value={swapData}>{children}</SwapContext.Provider>
  );
};
