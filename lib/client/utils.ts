import { publicClient } from "../wallet/wallet-config";

export const capitalizeFirstLetter = (str: string) => {
  // Check if the input is a non-empty string
  if (typeof str !== "string" || str.length === 0) {
    return str;
  }

  // Capitalize the first letter and concatenate the rest of the string
  return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
};

export const getTimestamp = async (chainId: number) => {
  const provider = publicClient({
    chainId,
  });

  const block = await provider.getBlockNumber();
  const blockDetails = await provider.getBlock({ blockNumber: block });

  const timestamp = blockDetails.timestamp;

  return timestamp;
};

export const collapseAddress = (address: string, startLength = 4, endLength = 4) => {
  // Check if the address is valid (starts with '0x' and is long enough)
  if (!address.startsWith("0x") || address.length < startLength + endLength + 2) {
    return address; // Return the original address if it's too short to collapse
  }

  // Extract the start and end parts of the address
  const start = address.substring(2, 2 + startLength);
  const end = address.substring(address.length - endLength);

  // Concatenate with ellipsis
  const collapsedAddress = `0x${start}...${end}`;

  return collapsedAddress;
}

export const weiToEther = (weiBalance: bigint) => {
  const weiString = weiBalance.toString();
  // Ensure the balance has at least 18 characters, padding with zeros if necessary, to represent the wei accurately
  const paddedWeiString = weiString.padStart(19, '0'); // Pad to ensure we always have an 18+ digit string
  const etherPart = paddedWeiString.slice(0, -18);
  const fractionalPart = paddedWeiString.slice(-18);

  // Convert fractional part into a number, divide by 10^18 to get the actual value, then round to 3 decimal places
  const fractionalNumber = parseFloat(fractionalPart) / 1e18;
  const roundedFractionalPart = fractionalNumber.toFixed(3).slice(2); // Get the rounded fractional part as a string without the '0.' prefix

  // Concatenate the ether part with the rounded fractional part, adding a decimal point only if fractional part is non-zero
  const result = etherPart + (roundedFractionalPart !== '000' ? '.' + roundedFractionalPart : '');

  return result;
};
