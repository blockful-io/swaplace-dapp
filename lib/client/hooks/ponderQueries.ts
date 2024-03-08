import axios from "axios";

export const getGraphQuery = async (inputAddress: string) => {
  const endpoint = "http://localhost:42069/";
  const headers = {
    "content-type": "application/json",
  };

  const formattedInputAddress = inputAddress.startsWith("0x")
    ? inputAddress
    : `0x${inputAddress}`;

  const graphqlQuery = {
    operationName: "databases",
    query: `query databases($orderBy: String!, $orderDirection: String!, $inputAddress: String!) {
      databases(orderBy: $orderBy, orderDirection: $orderDirection, where: { owner: $inputAddress })  {
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
