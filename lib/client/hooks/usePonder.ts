import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  inputAddress: string;
}

interface Swap {
  swapId: string;
  status: string;
  owner: string;
  allowed: string | null;
  expiry: bigint;
  bid: string;
  ask: string;
}

export const usePonder = ({ inputAddress }: Props) => {
  const [allSwaps, setAllSwaps] = useState<Swap[]>([]);

  const endpoint = "https://rascar-swaplace-ponder-production.up.railway.app/";
  const headers = {
    "content-type": "application/json",
  };

  const formattedInputAddress = inputAddress.startsWith("0x")
    ? inputAddress
    : `0x${inputAddress}`;

  const ponderQuery = {
    operationName: "databases",
    query: `query databases($orderBy: String!, $orderDirection: String!, $inputAddress: String!) {
      databases(orderBy: $orderBy, orderDirection: $orderDirection, where: { owner: $inputAddress }, limit: 20) {
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

  const config = {
    url: endpoint,
    method: "post",
    headers: headers,
    data: ponderQuery,
  };

  useEffect(() => {
    const fetchAllSwaps = async () => {
      try {
        const response = await axios(config);

        const results = response.data.data.databases.items;
        console.log(results);

        setAllSwaps(results);
      } catch (error) {
        console.error(error);
        return [];
      }
    };

    fetchAllSwaps();
  }, [inputAddress]);

  return { allSwaps };
};
