/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { EthereumAddress } from "@/lib/shared/types";
import React, { Dispatch, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SwapContextProps {
  inputAddress: string;
  validatedAddressToSwap: string;
  setInputAddress: (address: string) => void;
  validateAddressToSwap: () => void;
  setInputIsTyping: Dispatch<React.SetStateAction<boolean | null>>;
  inputIsTyping: boolean | null;
}

export const SwapContext = React.createContext<SwapContextProps>({
  inputAddress: "",
  validatedAddressToSwap: "",
  validateAddressToSwap: () => {},
  setInputAddress: (address: string) => {},
  setInputIsTyping: () => {},
  inputIsTyping: null,
});

export const SwapContextProvider = ({ children }: any) => {
  const [inputAddress, setInputAddress] = useState<string>("");
  const [validatedAddressToSwap, setValidatedAddressToSwap] = useState("");
  const [inputIsTyping, setInputIsTyping] = useState<boolean | null>(true);

  const validateAddressToSwap = () => {
    try {
      new EthereumAddress(inputAddress);
      setValidatedAddressToSwap(inputAddress);
      setInputIsTyping(true);
    } catch (event: any) {
      toast.error("Please enter a valid address");
      setValidatedAddressToSwap("");
      setInputIsTyping(false);
    }
  };

  useEffect(() => {
    setSwapData({
      inputAddress,
      setInputAddress,
      validatedAddressToSwap,
      validateAddressToSwap,
      setInputIsTyping,
      inputIsTyping,
    });
  }, [inputAddress, validatedAddressToSwap, inputIsTyping]);

  const [swapData, setSwapData] = useState<SwapContextProps>({
    inputAddress,
    setInputAddress,
    validatedAddressToSwap,
    validateAddressToSwap,
    setInputIsTyping,
    inputIsTyping,
  });

  return (
    <SwapContext.Provider value={swapData}>{children}</SwapContext.Provider>
  );
};
