import { getAPIKeyForNetwork, getNetwork } from "./constants";
import { Asset } from "./swap-utils";
import { publicClient } from "../wallet/wallet-config";
import {
  Token,
  ERC20,
  ERC721,
  TokenType,
  EthereumAddress,
  ERC20WithTokenAmountSelection,
} from "../shared/types";
import {
  type GetTokensForOwnerResponse,
  type OwnedNftsResponse,
  type OwnedToken,
  type OwnedNft,
  Alchemy,
} from "alchemy-sdk";
import toast from "react-hot-toast";
import { hexToNumber } from "viem";
import { sepolia } from "wagmi";

export enum ButtonClickPossibilities {
  PREVIOUS_STEP,
  NEXT_STEP,
}

export enum TransactionStatus {
  SEND_TRANSACTION,
  WAITING_WALLET_APPROVAL,
  TRANSACTION_APPROVED,
  SUCCESSFUL_TRANSACTION,
}

export const getBlockchainTimestamp = async (chainId: number) => {
  const provider = publicClient({
    chainId,
  });

  const block = await provider.getBlockNumber();
  const blockDetails = await provider.getBlock({ blockNumber: block });

  const timestamp = blockDetails.timestamp;

  return timestamp;
};

export const INVALID_TOKEN_AMOUNT_OR_ID = BigInt(Number.MAX_SAFE_INTEGER);

export const getTokenAmountOrId = (token: Token): bigint => {
  /* ERC20 tokens have a transaction amount while ERC721, a token ID */
  let tokenAmountOrTokenId = undefined;

  switch (token.tokenType) {
    case TokenType.ERC20:
      if ((token as ERC20WithTokenAmountSelection).tokenAmount) {
        tokenAmountOrTokenId = (token as ERC20WithTokenAmountSelection)
          .tokenAmount;
      }
    case TokenType.ERC721:
      if (token.id) {
        tokenAmountOrTokenId = token.id as string;
      }
  }

  if (typeof tokenAmountOrTokenId === "undefined")
    throw new Error(`Invalid token amount or ID: ${JSON.stringify(token)}`);
  else return BigInt(tokenAmountOrTokenId);
};

// Check out the Alchemy Documentation https://docs.alchemy.com/reference/getnfts-sdk-v3
export const getERC721TokensFromAddress = async (
  address: EthereumAddress,
  chainId: number,
) => {
  const networkAPIKey = getAPIKeyForNetwork.get(chainId);
  const networkName = getNetwork.get(chainId);

  if (!networkAPIKey) {
    throw new Error("No API Key for this network.");
  }

  if (!networkName) {
    throw new Error("No Network Name is defined for this network.");
  }

  const config = {
    apiKey: networkAPIKey,
    network: networkName,
  };

  const alchemy = new Alchemy(config);

  return alchemy.nft
    .getNftsForOwner(address.address)
    .then((response: OwnedNftsResponse) => {
      return parseAlchemyERC721Tokens(response.ownedNfts);
    })
    .catch((error) => {
      toastBlockchainTxError(error);
      throw new Error("Error getting user's ERC721 tokens.");
    });
};

async function getERC20OrERC721Metadata(token: Asset): Promise<Token> {
  const chainId = sepolia.id;
  const networkAPIKey = getAPIKeyForNetwork.get(chainId);
  const networkName = getNetwork.get(chainId);

  if (!networkAPIKey) {
    throw new Error("No API Key for this network.");
  }

  if (!networkName) {
    throw new Error("No Network Name is defined for this network.");
  }

  const config = {
    apiKey: networkAPIKey,
    network: networkName,
  };

  const alchemy = new Alchemy(config);

  try {
    const response = await alchemy.core.getTokenMetadata(token.addr);

    if (!!response.decimals) {
      console.log("ERC20 Token Metadata:", response);

      TokenType.ERC20;

      return {
        tokenType: TokenType.ERC20,
        name: response.name ?? undefined,
        logo: response.logo ?? undefined,
        symbol: response.symbol ?? undefined,
        contract: token.addr,
        rawBalance: Number(token.amountOrId),
        decimals: response.decimals,
      };

      // return {
      //   ...response,
      //   tokenType: TokenType.ERC20,
      //   amount: token.amountOrId,
      //   address: token.addr,
      // };
    } else {
      // Retrieve metadata as an erc721
      const metadata = await alchemy.nft.getNftMetadata(
        token.addr,
        token.amountOrId,
      );

      return {
        tokenType: TokenType.ERC721,
        id: token.amountOrId.toString(),
        name: metadata.name,
        contract: metadata.contract.address,
        metadata: metadata,
      };
      console.log("Treating as an erc721", metadata);
      // return {
      //   ...metadata,
      //   tokenType: TokenType.ERC721,
      //   amount: token.amountOrId,
      //   address: token.addr,
      // };
    }
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    throw new Error("Error fetching token metadata.");
  }
}

// retrieve data for array of tokens
export const retrieveDataFromTokensArray = async (
  tokens: Asset[],
): Promise<Token[]> => {
  // Use map to transform tokens into an array of promises
  const promises = tokens.map((token) => getERC20OrERC721Metadata(token));

  // Wait for all promises to resolve
  const newTokensList = await Promise.all(promises);

  console.log("newTokensList :", newTokensList);
  return newTokensList;
};

// Parses the information into an understandable
// const parseERC721MetadataFromContractAddress = (
//   tokens: NftMetadataBatchToken[],
// ): ERC721[] => {
//   return tokens.map((token) => {
//     return {
//       tokenType: TokenType.ERC721,
//       id: token.tokenId,
//       name: token.contractAddress,
//       metadata: token,
//       contract: token.contractAddress,
//       contractMetadata: token.contractAddress,
//     };
//   });
// };

// export const getERC20MetadataFromContractAddress = async () => {
//   const chainId = 11155111;
//   const networkAPIKey = getAPIKeyForNetwork.get(chainId);
//   const networkName = getNetwork.get(chainId);

//   if (!networkAPIKey) {
//     throw new Error("No API Key for this network.");
//   }

//   if (!networkName) {
//     throw new Error("No Network Name is defined for this network.");
//   }

//   const config = {
//     apiKey: networkAPIKey,
//     network: networkName,
//   };

//   const alchemy = new Alchemy(config);

//   return alchemy.core
//     .getTokenMetadata("0x36F681679598181E1DBaD6324528eA0f2E4d4CA1")
//     .then((response: TokenMetadataResponse) => {
//       // return parseAlchemyERC721Tokens(response);
//     })
//     .catch((error) => {
//       toastBlockchainTxError(error);
//       throw new Error("Error getting user's ERC721 tokens.");
//     });
// };

// const parseERC20MetadataFromContractAddress = (
//   tokens: OwnedNft[],
// ): TokenMetadataResponse => {
//   return tokens.map((token) => {
//     return {
//       tokenType: TokenType.ERC721,
//       id: token.tokenId,
//       name: token.contract.name,
//       metadata: token.raw.metadata,
//       contract: token.contract.address,
//       contractMetadata: token.contract,
//     };
//   });
// };

const parseAlchemyERC721Tokens = (tokens: OwnedNft[]): ERC721[] => {
  return tokens.map((token) => {
    return {
      tokenType: TokenType.ERC721,
      id: token.tokenId,
      name: token.contract.name,
      metadata: token.raw.metadata,
      contract: token.contract.address,
      contractMetadata: token.contract,
    };
  });
};

// Check out the Alchemy Documentation https://docs.alchemy.com/reference/gettokensforowner-sdk-v3
export const getERC20TokensFromAddress = async (
  address: EthereumAddress,
  chainId: number,
): Promise<ERC20[]> => {
  const alchemyApiKey = getAPIKeyForNetwork.get(chainId);
  const networkName = getNetwork.get(chainId);

  if (!alchemyApiKey) {
    throw new Error("No API Key for this network.");
  }
  if (!networkName) {
    throw new Error("No Network Name is defined for this network.");
  }

  const config = {
    apiKey: alchemyApiKey,
    network: networkName,
  };
  const alchemy = new Alchemy(config);

  const ownerAddress = address;

  return alchemy.core
    .getTokensForOwner(ownerAddress.address)
    .then((response: GetTokensForOwnerResponse) => {
      return parseAlchemyERC20Tokens(response.tokens);
    })
    .catch((error) => {
      toastBlockchainTxError(error);
      throw new Error("Error getting user's ERC20 tokens.");
    });
};

export const EMPTY_ERC_20_BALANCE = 0;

const parseAlchemyERC20Tokens = (tokens: OwnedToken[]): ERC20[] => {
  return tokens.map((token) => {
    const rawBalanceAsNumber = token.rawBalance
      ? hexToNumber(token.rawBalance as `0x${string}`)
      : EMPTY_ERC_20_BALANCE;

    return {
      tokenType: TokenType.ERC20,
      /*
        This ID is only used for TokenCard selection, in the Ui of the dApp.
        We want it to be as randomic and unique as possible besides being 
        yet, mathematically possible to have same IDs on two different
        tokens. Possible, but very unlikely to generate non-unique 
        IDs, below maths solve our ID generation goal, today.
      */
      id: ((Date.now() * Math.random()) / Math.random()).toFixed(0),
      name: token.name,
      decimals: token.decimals,
      logo: token.logo,
      symbol: token.symbol,
      rawBalance: rawBalanceAsNumber,
      contract: token.contractAddress,
    };
  });
};

// Unused for now
// export const getTokenBalance = async (
//   owner: EthereumAddress,
//   token: Token,
//   chainId: number,
// ): Promise<number | null> => {
//   const alchemyApiKey = getAPIKeyForNetwork.get(chainId);
//   const networkName = getNetwork.get(chainId);

//   if (!alchemyApiKey) {
//     throw new Error("No API Key for this network.");
//   }
//   if (!networkName) {
//     throw new Error("No Network Name is defined for this network.");
//   }
//   if (!token.contract) {
//     throw new Error("Selected token has no known contract address.");
//   }

//   const config = {
//     apiKey: alchemyApiKey,
//     network: networkName,
//   };
//   const alchemy = new Alchemy(config);

//   return alchemy.core
//     .getTokenBalances(owner.address, [token.contract])
//     .then((response: TokenBalancesResponseErc20) => {
//       if (!response.tokenBalances[0].tokenBalance) return null;

//       let balance = 0;
//       if (isAddress(response.tokenBalances[0].tokenBalance)) {
//         balance = hexToNumber(response.tokenBalances[0].tokenBalance);
//       }

//       return balance;
//     })
//     .catch((error) => {
//       toastBlockchainTxError(error);
//       throw new Error("Error getting token balance.");
//     });
// };

export interface TokenApprovalData {
  approved: boolean;
  tokenAddress: `0x${string}`;
  amountOrId: bigint;
}

export async function packingData(
  Contract: any,
  allowed: EthereumAddress,
  expiration: bigint,
): Promise<number> {
  const config = await Contract.read.packData([allowed.address, expiration]);
  return config;
}

export const toastBlockchainTxError = (e: string) => {
  /* 
    Below condition should include all possible Wallet Provider's
    error messages on User transaction decline action in order
    to patternize inside Swaplace the Transaction "Cancelled"
    state response to the User.
  */
  if (e.includes("rejected")) {
    toast.error("Transaction rejected");
  } else {
    toast.error("Transaction failed. Please contact our team.");
  }
};
