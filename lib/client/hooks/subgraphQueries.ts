const axios = require("axios");
require("dotenv").config();

const { ENDPOINT_URL, AUTHORIZATION_KEY } = process.env;

async function main() {
  const endpoint = process.env.ENDPOINT_URL;
  const headers = {
    "content-type": "application/json",
    Authorization: process.env.AUTHORIZATION_KEY,
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
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
