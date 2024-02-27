/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ADDRESS_ZERO, NFT, SupportedNetworks } from "@/lib/client/constants";
import { EthereumAddress } from "@/lib/shared/types";
import {
  ButtonClickPossibilities,
  IArrayStatusTokenApproved,
  SwapModalSteps,
} from "@/lib/client/blockchain-data";
import React, { Dispatch, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface SwapContextProps {
  inputAddress: string;
  validatedAddressToSwap: string;
  setValidatedAddressToSwap: (address: string) => void
  setInputAddress: (address: string) => void;
  validateAddressToSwap: (
    authedUser: EthereumAddress,
    inputEnsAddress: string | null | undefined,
  ) => void;
  setUserJustValidatedInput: Dispatch<React.SetStateAction<boolean>>;
  userJustValidatedInput: boolean;
  setNftAuthUser: Dispatch<React.SetStateAction<NFT[]>>;
  nftAuthUser: NFT[];
  setNftInputUser: Dispatch<React.SetStateAction<NFT[]>>;
  nftInputUser: NFT[];
  destinyChain: SupportedNetworks;
  setDestinyChain: Dispatch<React.SetStateAction<SupportedNetworks>>;
  setTimeDate: Dispatch<React.SetStateAction<bigint>>;
  timeDate: bigint;
  setAllSelectedNftsAreApproved: Dispatch<React.SetStateAction<boolean>>;
  allSelectedNftsApproved: boolean;
  setAuthedUserNftsApprovalStatus: Dispatch<
    React.SetStateAction<IArrayStatusTokenApproved[]>
  >;
  authedUserSelectedNftsApprovalStatus: IArrayStatusTokenApproved[];
  updateSwapStep: (buttonClickAction: ButtonClickPossibilities) => void;
  currentSwapModalStep: SwapModalSteps;
}

export const SwapContext = React.createContext<SwapContextProps>({
  inputAddress: "",
  validatedAddressToSwap: "",
  setValidatedAddressToSwap: () => {},
  validateAddressToSwap: (
    _authedUser: EthereumAddress,
    _inputEnsAddress: string | null | undefined,
  ) => {},
  setInputAddress: (address: string) => {},
  setUserJustValidatedInput: () => {},
  userJustValidatedInput: false,
  setNftAuthUser: () => {},
  nftAuthUser: [],
  setNftInputUser: () => {},
  nftInputUser: [],
  destinyChain: SupportedNetworks.SEPOLIA,
  setDestinyChain: () => {},
  setTimeDate: () => {},
  timeDate: BigInt(1),
  setAllSelectedNftsAreApproved: () => {},
  allSelectedNftsApproved: false,
  setAuthedUserNftsApprovalStatus: () => {},
  authedUserSelectedNftsApprovalStatus: [],
  currentSwapModalStep: SwapModalSteps.APPROVE_NFTS,
  updateSwapStep: (buttonClickAction: ButtonClickPossibilities) => {},
});

export const SwapContextProvider = ({ children }: any) => {
  const [inputAddress, setInputAddress] = useState<string>("");
  const [validatedAddressToSwap, setValidatedAddressToSwap] = useState("");
  const [userJustValidatedInput, setUserJustValidatedInput] = useState(true);
  const [nftAuthUser, setNftAuthUser] = useState<NFT[]>([]);
  const [nftInputUser, setNftInputUser] = useState<NFT[]>([]);
  const [destinyChain, setDestinyChain] = useState<SupportedNetworks>(
    SupportedNetworks.SEPOLIA,
  );
  const [timeDate, setTimeDate] = useState<bigint>(BigInt(1));

  const [currentSwapModalStep, setCurrentSwapModalStep] =
    useState<SwapModalSteps>(SwapModalSteps.APPROVE_NFTS);
  const [allSelectedNftsApproved, setAllSelectedNftsAreApproved] =
    useState<boolean>(false);
  const [
    authedUserSelectedNftsApprovalStatus,
    setAuthedUserNftsApprovalStatus,
  ] = useState<IArrayStatusTokenApproved[]>([]);
  const router  = useRouter()
  const validateAddressToSwap = (
    _authedUser: EthereumAddress,
    _inputEnsAddress: string | null | undefined,
  ) => {
    if (!inputAddress && !_inputEnsAddress) {
      toast.error("Please enter a valid address or some registered ENS domain");
      setUserJustValidatedInput(true);
      return;
    }

    let searchedAddress = inputAddress;

    if (_inputEnsAddress !== ADDRESS_ZERO && searchedAddress) {
      searchedAddress = _inputEnsAddress ?? "";
    }

    let inputIsValidAddress = false;
    try {
      new EthereumAddress(searchedAddress);
      inputIsValidAddress = true;
    } catch (e) {
      console.error(e);
    }

    if (inputIsValidAddress) {
      const inputEthAddress = new EthereumAddress(searchedAddress);

      if (inputEthAddress.equals(_authedUser)) {
        toast.error("You cannot swap with yourself");
        setValidatedAddressToSwap("");
        setUserJustValidatedInput(true);
        return;
      } else if (searchedAddress === ADDRESS_ZERO) {
        toast.error("You cannot swap with an invalid address");
        setValidatedAddressToSwap("");
        setUserJustValidatedInput(true);
        return;
      }

      setValidatedAddressToSwap(searchedAddress);
      toast.success("Searching Address");
    } else {
      toast.error(
        "Your input is not a valid address and neither some registered ENS domain",
      );
    }
    setUserJustValidatedInput(true);
  };

  const updateSwapStep = (buttonClicked: ButtonClickPossibilities) => {
    switch (currentSwapModalStep) {
      case SwapModalSteps.APPROVE_NFTS:
        if (buttonClicked === ButtonClickPossibilities.NEXT_STEP) {
          setCurrentSwapModalStep(SwapModalSteps.CREATE_SWAP);
        }
        break;
      case SwapModalSteps.CREATE_SWAP:
        if (buttonClicked === ButtonClickPossibilities.PREVIOUS_STEP) {
          setCurrentSwapModalStep(SwapModalSteps.APPROVE_NFTS);
        } else if (buttonClicked === ButtonClickPossibilities.NEXT_STEP) {
          setCurrentSwapModalStep(SwapModalSteps.CREATING_SWAP);
        }
        break;
      case SwapModalSteps.CREATING_SWAP:
        if (buttonClicked === ButtonClickPossibilities.NEXT_STEP) {
          setCurrentSwapModalStep(SwapModalSteps.CREATED_SWAP);
        } else if (buttonClicked === ButtonClickPossibilities.PREVIOUS_STEP) {
          setCurrentSwapModalStep(SwapModalSteps.CREATE_SWAP);
        }
        break;
      case SwapModalSteps.CREATED_SWAP:
        if (buttonClicked === ButtonClickPossibilities.PREVIOUS_STEP) {
          setCurrentSwapModalStep(SwapModalSteps.APPROVE_NFTS);
        }
        break;
    }
  };

  useEffect(() => {
    setNftInputUser([]);
    setUserJustValidatedInput(false);
  }, [inputAddress]);

  useEffect(() => {
    setNftInputUser([]);
  }, [destinyChain]);

  useEffect(() => {
    setSwapData({
      inputAddress,
      setInputAddress,
      validatedAddressToSwap,
      setValidatedAddressToSwap,
      validateAddressToSwap,
      setUserJustValidatedInput,
      userJustValidatedInput,
      setNftAuthUser,
      nftAuthUser,
      setNftInputUser,
      nftInputUser,
      destinyChain,
      setDestinyChain,
      setTimeDate,
      timeDate,
      setAllSelectedNftsAreApproved,
      allSelectedNftsApproved,
      setAuthedUserNftsApprovalStatus,
      authedUserSelectedNftsApprovalStatus,
      updateSwapStep,
      currentSwapModalStep,
    });
  }, [
    inputAddress,
    validatedAddressToSwap,
    userJustValidatedInput,
    nftAuthUser,
    nftInputUser,
    destinyChain,
    timeDate,
    allSelectedNftsApproved,
    authedUserSelectedNftsApprovalStatus,
    currentSwapModalStep,
  ]);

  const [swapData, setSwapData] = useState<SwapContextProps>({
    inputAddress,
    setInputAddress,
    validatedAddressToSwap,
    setValidatedAddressToSwap,
    validateAddressToSwap,
    setUserJustValidatedInput,
    userJustValidatedInput,
    setNftAuthUser,
    nftAuthUser,
    setNftInputUser,
    nftInputUser,
    destinyChain,
    setDestinyChain,
    setTimeDate,
    timeDate,
    setAllSelectedNftsAreApproved,
    allSelectedNftsApproved,
    setAuthedUserNftsApprovalStatus,
    authedUserSelectedNftsApprovalStatus,
    updateSwapStep,
    currentSwapModalStep,
  });

  useEffect(()=>{
    setValidatedAddressToSwap("");
  },[router.asPath])

  return (
    <SwapContext.Provider value={swapData}>{children}</SwapContext.Provider>
  );
};
