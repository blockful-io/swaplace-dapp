/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ADDRESS_ZERO, SupportedNetworks } from "@/lib/client/constants";
import { EthereumAddress, Token } from "@/lib/shared/types";
import {
  ButtonClickPossibilities,
  IArrayStatusTokenApproved,
  SwapModalSteps,
} from "@/lib/client/blockchain-data";
import React, { Dispatch, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SwapContextProps {
  inputAddress: string;
  validatedAddressToSwap: string;
  setInputAddress: (address: string) => void;
  validateAddressToSwap: (
    authedUser: EthereumAddress,
    inputEnsAddress: string | null | undefined,
  ) => void;
  setUserJustValidatedInput: Dispatch<React.SetStateAction<boolean>>;
  userJustValidatedInput: boolean;
  setAuthenticatedUsedTokensList: Dispatch<React.SetStateAction<Token[]>>;
  authenticatedUserTokensList: Token[];
  setSearchedUserTokensList: Dispatch<React.SetStateAction<Token[]>>;
  searchedUserTokensList: Token[];
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
  validateAddressToSwap: (
    _authedUser: EthereumAddress,
    _inputEnsAddress: string | null | undefined,
  ) => {},
  setInputAddress: (address: string) => {},
  setUserJustValidatedInput: () => {},
  userJustValidatedInput: false,
  setAuthenticatedUsedTokensList: () => {},
  authenticatedUserTokensList: [],
  setSearchedUserTokensList: () => {},
  searchedUserTokensList: [],
  destinyChain: SupportedNetworks.SEPOLIA,
  setDestinyChain: () => {},
  setTimeDate: () => {},
  timeDate: BigInt(1),
  setAllSelectedNftsAreApproved: () => {},
  allSelectedNftsApproved: false,
  setAuthedUserNftsApprovalStatus: () => {},
  authedUserSelectedNftsApprovalStatus: [],
  currentSwapModalStep: SwapModalSteps.APPROVE_TOKENS,
  updateSwapStep: (buttonClickAction: ButtonClickPossibilities) => {},
});

export const SwapContextProvider = ({ children }: any) => {
  const [inputAddress, setInputAddress] = useState<string>("");
  const [validatedAddressToSwap, setValidatedAddressToSwap] = useState("");
  const [userJustValidatedInput, setUserJustValidatedInput] = useState(true);
  const [authenticatedUserTokensList, setAuthenticatedUsedTokensList] =
    useState<Token[]>([]);
  const [searchedUserTokensList, setSearchedUserTokensList] = useState<Token[]>(
    [],
  );
  const [destinyChain, setDestinyChain] = useState<SupportedNetworks>(
    SupportedNetworks.SEPOLIA,
  );
  const [timeDate, setTimeDate] = useState<bigint>(BigInt(1));

  const [currentSwapModalStep, setCurrentSwapModalStep] =
    useState<SwapModalSteps>(SwapModalSteps.APPROVE_TOKENS);
  const [allSelectedNftsApproved, setAllSelectedNftsAreApproved] =
    useState<boolean>(false);
  const [
    authedUserSelectedNftsApprovalStatus,
    setAuthedUserNftsApprovalStatus,
  ] = useState<IArrayStatusTokenApproved[]>([]);

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
      case SwapModalSteps.APPROVE_TOKENS:
        if (buttonClicked === ButtonClickPossibilities.NEXT_STEP) {
          setCurrentSwapModalStep(SwapModalSteps.CREATE_SWAP);
        }
        break;
      case SwapModalSteps.CREATE_SWAP:
        if (buttonClicked === ButtonClickPossibilities.PREVIOUS_STEP) {
          setCurrentSwapModalStep(SwapModalSteps.APPROVE_TOKENS);
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
          setCurrentSwapModalStep(SwapModalSteps.APPROVE_TOKENS);
        }
        break;
    }
  };

  useEffect(() => {
    setSearchedUserTokensList([]);
    setUserJustValidatedInput(false);
  }, [inputAddress]);

  useEffect(() => {
    setSearchedUserTokensList([]);
  }, [destinyChain]);

  useEffect(() => {
    setSwapData({
      inputAddress,
      setInputAddress,
      validatedAddressToSwap,
      validateAddressToSwap,
      setUserJustValidatedInput,
      userJustValidatedInput,
      setAuthenticatedUsedTokensList,
      authenticatedUserTokensList,
      setSearchedUserTokensList,
      searchedUserTokensList,
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
    authenticatedUserTokensList,
    searchedUserTokensList,
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
    validateAddressToSwap,
    setUserJustValidatedInput,
    userJustValidatedInput,
    setAuthenticatedUsedTokensList,
    authenticatedUserTokensList,
    setSearchedUserTokensList,
    searchedUserTokensList,
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

  return (
    <SwapContext.Provider value={swapData}>{children}</SwapContext.Provider>
  );
};
