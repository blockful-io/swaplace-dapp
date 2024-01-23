import React, { Dispatch, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ADDRESS_ZERO, NFT, SupportedNetworks } from "@/lib/client/constants";
import { EthereumAddress } from "@/lib/shared/types";
import {
  ButtonClickPossibilities,
  CreateApprovalStatus,
  CreateSwapStatus,
  IArrayStatusTokenApproved,
  SwapModalSteps,
} from "@/lib/client/blockchain-data";

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
  setCreateApprovalStatus: Dispatch<React.SetStateAction<CreateApprovalStatus>>;
  createApprovalStatus: CreateApprovalStatus;
  setCreateSwapStatus: Dispatch<React.SetStateAction<CreateSwapStatus>>;
  createSwapStatus: CreateSwapStatus;
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
  setCreateApprovalStatus: () => {},
  createApprovalStatus: CreateApprovalStatus.CREATE_APPROVAL,
  setCreateSwapStatus: () => {},
  createSwapStatus: CreateSwapStatus.CREATE_SWAP,
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
  const [createApprovalStatus, setCreateApprovalStatus] = useState(
    CreateApprovalStatus.CREATE_APPROVAL,
  );
  const [createSwapStatus, setCreateSwapStatus] = useState(
    CreateSwapStatus.CREATE_SWAP,
  );
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

  // Created to make progress on a yet to be created state (which will live inside SwapContext)
  // and control in which modal step the user is in
  const updateSwapStep = (buttonClicked: ButtonClickPossibilities) => {
    if (buttonClicked === ButtonClickPossibilities.PREVIOUS_SET) {
      setCurrentSwapModalStep(SwapModalSteps.CREATE_SWAP);
    } else {
      setCurrentSwapModalStep(SwapModalSteps.APPROVE_NFTS);
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
      createApprovalStatus,
      createSwapStatus,
      setCreateApprovalStatus,
      setCreateSwapStatus,
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
    createApprovalStatus,
    createSwapStatus,
    setCreateApprovalStatus,
    setCreateSwapStatus,
    updateSwapStep,
    currentSwapModalStep,
  });

  return (
    <SwapContext.Provider value={swapData}>{children}</SwapContext.Provider>
  );
};
