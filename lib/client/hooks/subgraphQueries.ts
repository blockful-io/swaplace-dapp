/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv").config();
import axios from "axios";

export const getGraphQuery = async () => {
  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_URL;
  const headers = {
    "content-type": "application/json",
    Authorization: process.env.NEXT_PUBLIC_SUBGRAPH_AUTH_KEY,
  };

  //Example of query
  const graphqlQuery = {
    operationName: "swapCreateds",
    query: `{
      swapCreateds(first: 10) {
        allowed
        id
        owner
        swapId
      }
    }`,
    variables: {},
  };

  const config = {
    url: endpoint,
    method: "post",
    headers: headers,
    data: graphqlQuery,
  };

  try {
    const response = await axios(config);
    console.log(JSON.stringify(response.data, null, 2));
    console.log(response.data.errors);
  } catch (error) {
    console.error(error);
  }
};

getGraphQuery()
  .then((result) => console.log(result))
  .catch((error) => {
    console.error(error);
  });
