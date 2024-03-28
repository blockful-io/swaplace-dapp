import { SwapContext } from "@/components/01-atoms";
import axios from "axios";
import { useContext } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

// Define the expected data structure
export interface SwapResponse {
  pages: Page[];
  pageParams: any[];
}

export interface Page {
  user: Swap;
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

interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
}

export enum PonderFilter {
  ALL_OFFERS = "ALL OFFERS", //
  CREATED = "CREATED",
  RECEIVED = "RECEIVED", // Not yet
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED", // Not yet
}

export const usePonder = () => {
  const { inputAddress, ponderFilterStatus } = useContext(SwapContext);

  const fetchSwaps = async (deps: any) => {
    const after = deps?.pageParam ? deps.pageParam : null;

    const query = `
    query databases($orderBy: String!, $orderDirection: String!, $inputAddress: String!, $ponderFilterStatus: Status!, $after: String) {
      databases(
        orderBy: $orderBy,
        orderDirection: $orderDirection,
        where: { owner: $inputAddress, status: $ponderFilterStatus },
        limit: 20,
        after: $after
      ) {
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
    }
 `;

    // Define the variables object with actual values
    const variables = {
      orderBy: "blockTimestamp",
      orderDirection: "desc",
      inputAddress: "0x12a0AA4054CDa340492228B1ee2AF0315276092b",
      ponderFilterStatus: ponderFilterStatus, // Use the variable from context
      after: after,
    };

    const endpoint =
      "https://rascar-swaplace-ponder-production.up.railway.app/";
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        endpoint,
        { query, variables },
        { headers },
      );
      console.log("Full response:", response);
      return response.data.data.databases;
    } catch (error) {
      console.error("Error fetching swaps:", error);
      throw error;
    }
  };
  const { data, status, error } = useInfiniteQuery({
    queryKey: ["swaps", inputAddress, ponderFilterStatus],
    queryFn: fetchSwaps,
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage?.databases?.pageInfo?.endCursor ?? null,
  });

  console.log("status:", status);
  console.log("error:", error?.message);
  const allSwaps = data;
  console.log("data:", allSwaps);

  const pages = data?.pages ?? [];
  console.log("pages:", pages);

  const extras = pages[pages.length]?.databases?.items;
  console.log("extras:", extras);

  return { allSwaps };
};
