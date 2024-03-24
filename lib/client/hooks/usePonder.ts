import { cleanJsonString } from "../utils";
import { Asset } from "../swap-utils";
import { SwapContext } from "@/components/01-atoms";
import { type NftMetadataBatchToken } from "alchemy-sdk";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

// We should update that function after to improve the type like the other swap
interface Swap {
  swapId: string;
  status: string;
  owner: string;
  allowed: string | null;
  expiry: bigint;
  bid: Asset[]; // Asset
  ask: Asset[]; // Asset
}

export enum PonderFilter {
  ALL_OFFERS = "All Offers", //
  CREATED = "created",
  RECEIVED = "received", // Not yet
  ACCEPTED = "accepted",
  CANCELED = "canceled",
  EXPIRED = "expired", // Not yet
}

interface Ponder {
  operationName: string;
  query: string;
  variables: {
    orderBy: string;
    orderDirection: string;
    inputAddress: string;
    ponderFilterStatus?: string;
  };
}

// get allSwaps

// Determine if ERC20 / ERC721 and fetch data for each one of these
// Through a function that gets the array of items and formats it

export const usePonder = () => {
  const { ponderFilterStatus } = useContext(SwapContext);
  const [allSwaps, setAllSwaps] = useState<Swap[]>([]);
  // const [acceptedSwaps, setAcceptedSwaps] = useState<Swap[]>([]);
  // const [canceledSwaps, setCanceledSwaps] = useState<Swap[]>([]);
  const [isPonderSwapsLoading, setIsPonderSwapsLoading] = useState(false);
  //Typing those states the way Alchemy understand
  const [erc721AskSwaps, setERC721AskSwaps] = useState<NftMetadataBatchToken[]>(
    [],
  );

  // endereço com contratos sepolia scan: 0xb7A42919ae66745Ffa69940De9d3DD99703eACb1

  // TODO: place the actual ADDRESS_ZERO, not a hardcoded one
  // const inputAddress = "0x12a0AA4054CDa340492228B1ee2AF0315276092b";
  const inputAddress = "0x8c74F3aAAA448dAfB5D5402F80cD16b2D7d95c16";

  useEffect(() => {
    setIsPonderSwapsLoading(true);
    const fetchAllSwaps = async () => {
      try {
        const response = await axios(config);

        const allSwapsResponseDataNotCleaned =
          response.data.data.databases.items;

        const allSwapsResponseData = allSwapsResponseDataNotCleaned.map(
          (obj: any) => {
            return {
              ...obj,
              bid: cleanJsonString(obj.bid),
              ask: cleanJsonString(obj.ask),
            };
          },
        );

        // ponderFilterStatus === PonderFilter.ACCEPTED
        //   ? setAcceptedSwaps(allSwapsResponseData)
        //   : ponderFilterStatus === PonderFilter.CANCELED
        //   ? setCanceledSwaps(allSwapsResponseData)
        //   : setAllSwaps(allSwapsResponseData); /// ALL OFFERS
        setAllSwaps(allSwapsResponseData);

        const PonderAlchemyERC721Ask: NftMetadataBatchToken[] =
          allSwapsResponseData.map((swap: Swap) => {
            // We are verifying here because the types are not aligned yet, we must change in the future
            // Must change the type Swap from ponder to update this probably
            if (Array.isArray(swap.ask) && swap.ask.length > 0) {
              const askObject = swap.ask[0];
              return {
                contractAddress: askObject.addr,
                tokenId: BigInt(askObject.amountOrId),
              };
            } else {
              console.error("Error ASK is not an array");
              return null;
            }
          });

        await setERC721AskSwaps(PonderAlchemyERC721Ask);
        setIsPonderSwapsLoading(false);
      } catch (error) {
        console.error("error loading allSwaps :", error);
        setIsPonderSwapsLoading(false);
        return [];
      }
    };

    fetchAllSwaps();
  }, [ponderFilterStatus]);

  // For some reason the process.env isn't working here, must hardcode to test it
  const endpoint = process.env.NEXT_PUBLIC_PONDER_ENDPOINT;
  const headers = {
    "content-type": "application/json",
  };

  const formattedInputAddress = inputAddress.startsWith("0x")
    ? inputAddress
    : `0x${inputAddress}`;

  let ponderQuery: Ponder;
  if (ponderFilterStatus === PonderFilter.ALL_OFFERS) {
    ponderQuery = {
      operationName: "databases",
      query: `query databases($orderBy: String!, $orderDirection: String!, $inputAddress: String! ) {
        databases(orderBy: $orderBy, orderDirection: $orderDirection, where: { owner: $inputAddress }, limit: 200) {
          items {
            swapId
            status
            owner
            allowed
            expiry
            bid
            ask
            blockTimestamp
            transactionHash
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }`,
      variables: {
        orderBy: "blockTimestamp",
        orderDirection: "desc",
        inputAddress: formattedInputAddress,
        // after: after,
      },
    };
  } else {
    ponderQuery = {
      operationName: "databases",
      query: `query databases($orderBy: String!, $orderDirection: String!, $inputAddress: String!, $ponderFilterStatus: Status!  ) {
        databases(orderBy: $orderBy, orderDirection: $orderDirection, where: { owner: $inputAddress, status: $ponderFilterStatus }, limit: 200) {
          items {
            swapId
            status
            owner
            allowed
            expiry
            bid
            ask
            blockTimestamp
            transactionHash
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }`,
      variables: {
        orderBy: "blockTimestamp",
        orderDirection: "desc",
        inputAddress: formattedInputAddress,
        ponderFilterStatus: ponderFilterStatus,
        // after: after,
      },
    };
  }

  const config = {
    url: endpoint,
    method: "post",
    headers: headers,
    data: ponderQuery,
  };

  return {
    allSwaps,
    // acceptedSwaps,
    // canceledSwaps,
    erc721AskSwaps,
    isPonderSwapsLoading,
  };
};
