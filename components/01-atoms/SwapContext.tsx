import React, { Dispatch, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NFT } from "@/lib/client/constants";
import { EthereumAddress } from "@/lib/shared/types";

interface SwapContextProps {
  inputAddress: string;
  validatedAddressToSwap: string;
  setInputAddress: (address: string) => void;
  validateAddressToSwap: () => void;
  setInputIsTyping: Dispatch<React.SetStateAction<boolean | null>>;
  inputIsTyping: boolean | null;
  setNftAuthUser: Dispatch<React.SetStateAction<NFT[]>>;
  nftAuthUser: NFT[];
  setNftInputUser: Dispatch<React.SetStateAction<NFT[]>>;
  nftInputUser: NFT[];
}

export const SwapContext = React.createContext<SwapContextProps>({
  inputAddress: "",
  validatedAddressToSwap: "",
  validateAddressToSwap: () => {},
  setInputAddress: (address: string) => {},
  setInputIsTyping: () => {},
  inputIsTyping: null,
  setNftAuthUser: () => {},
  nftAuthUser: [],
  setNftInputUser: () => {},
  nftInputUser: [],
});

export const SwapContextProvider = ({ children }: any) => {
  const [inputAddress, setInputAddress] = useState<string>("");
  const [validatedAddressToSwap, setValidatedAddressToSwap] = useState("");
  const [inputIsTyping, setInputIsTyping] = useState<boolean | null>(true);
  const [nftAuthUser, setNftAuthUser] = useState<NFT[]>([]);
  const [nftInputUser, setNftInputUser] = useState<NFT[]>([]);

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
      setNftAuthUser,
      nftAuthUser,
      setNftInputUser,
      nftInputUser,
    });
  }, [inputAddress, validatedAddressToSwap, inputIsTyping]);

  const [swapData, setSwapData] = useState<SwapContextProps>({
    inputAddress,
    setInputAddress,
    validatedAddressToSwap,
    validateAddressToSwap,
    setInputIsTyping,
    inputIsTyping,
    setNftAuthUser,
    nftAuthUser,
    setNftInputUser,
    nftInputUser,
  });

  return (
    <SwapContext.Provider value={swapData}>{children}</SwapContext.Provider>
  );
};
