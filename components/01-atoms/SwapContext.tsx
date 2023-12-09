import React, { Dispatch, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ADDRESS_ZERO, NFT } from "@/lib/client/constants";
import { EthereumAddress } from "@/lib/shared/types";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";

interface SwapContextProps {
  inputAddress: string;
  validatedAddressToSwap: string;
  setInputAddress: (address: string) => void;
  validateAddressToSwap: (authedUser: EthereumAddress) => void;
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
  validateAddressToSwap: (authedUser: EthereumAddress) => {},
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

  const validateAddressToSwap = (authenticatedUser: EthereumAddress) => {
    try {
      const inputEthAddress = new EthereumAddress(inputAddress);

      if (inputEthAddress.equals(authenticatedUser)) {
        toast.error("You cannot swap with yourself");
        setValidatedAddressToSwap("");
        setInputIsTyping(false);
        return;
      } else if (inputAddress === ADDRESS_ZERO) {
        toast.error("You cannot swap with the zero address");
        setValidatedAddressToSwap("");
        setInputIsTyping(false);
        return;
      }

      setValidatedAddressToSwap(inputAddress);
      setInputIsTyping(true);
    } catch (event: any) {
      toast.error("Please enter a valid address");
      setValidatedAddressToSwap("");
      setInputIsTyping(false);
    }
  };

  useEffect(() => {
    setNftInputUser([]);
  }, [validatedAddressToSwap]);

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
  }, [
    inputAddress,
    validatedAddressToSwap,
    inputIsTyping,
    nftAuthUser,
    nftInputUser,
  ]);

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
