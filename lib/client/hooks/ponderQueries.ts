import axios from "axios";

export const getGraphQuery = async (inputAddress: string) => {
  const endpoint = "https://rascar-swaplace-ponder-production.up.railway.app/";
  const headers = {
    "content-type": "application/json",
  };

  const formattedInputAddress = inputAddress.startsWith("0x")
    ? inputAddress
    : `0x${inputAddress}`;

  const graphqlQuery = {
    operationName: "databases",
    query: `query databases($orderBy: String!, $orderDirection: String!, $inputAddress: String!, $after: String!) {
      databases(orderBy: $orderBy, orderDirection: $orderDirection, where: { owner: $inputAddress }, after: $after)  {
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
      }
     }`,
    variables: {
      orderBy: "blockTimestamp",
      orderDirection: "desc",
      inputAddress: formattedInputAddress,
      after: "W1siYmxvY2tUaW1lc3RhbXAiLHsiX190eXBlIjoiYmlnaW50IiwidmFsdWUiOiIxNzEwMjc0ODEyIn1dLFsiaWQiLCIweDE3Il1d"
    },
  };

  const config = {
    url: endpoint,
    method: "post",
    headers: headers,
    data: graphqlQuery,
  };

  try {
    const response = await axios(config);
    console.log(response.data.errors);

    const results = response.data.data.databases.items;
    console.log(results);

    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
