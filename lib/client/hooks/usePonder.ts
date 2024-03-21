import { cleanJsonString } from "../utils";
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
  bid: string; // Asset
  ask: string; // Asset
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

export const usePonder = () => {
  const { inputAddress, ponderFilterStatus } = useContext(SwapContext);
  const [allSwaps, setAllSwaps] = useState<Swap[]>([]);
  const [acceptedSwaps, setAcceptedSwaps] = useState<Swap[]>([]);
  const [canceledSwaps, setCanceledSwaps] = useState<Swap[]>([]);

  //Typing those states the way Alchemy understand
  const [erc721AskSwaps, setERC721AskSwaps] = useState<NftMetadataBatchToken[]>(
    [],
  );

  useEffect(() => {
    const fetchAllSwaps = async () => {
      try {
        const response = await axios(config);
        console.log("response =", response);

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

        ponderFilterStatus === PonderFilter.ACCEPTED
          ? setAcceptedSwaps(allSwapsResponseData)
          : ponderFilterStatus === PonderFilter.CANCELED
          ? setCanceledSwaps(allSwapsResponseData)
          : setAllSwaps(allSwapsResponseData); /// ALL OFFERS

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

        setERC721AskSwaps(PonderAlchemyERC721Ask);
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    fetchAllSwaps();
  }, [ponderFilterStatus, inputAddress]);

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

  return { allSwaps, acceptedSwaps, canceledSwaps, erc721AskSwaps };
};
