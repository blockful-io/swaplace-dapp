import {
  IApproveMulticall,
  IApproveSwap,
  IGetApproveSwap,
} from "../client/blockchain-data";
import { publicClientViem } from "../wallet/wallet-config";
import { MockERC721Abi } from "../client/abi";

export async function getApprovedSwap({
  tokenContractAddress,
  amountOrId,
}: IApproveSwap) {
  const data = await publicClientViem.readContract({
    abi: MockERC721Abi,
    functionName: "getApproved",
    address: tokenContractAddress,
    args: [amountOrId],
  });

  return data;
}

export async function getMultipleNftsApprovalStatus(
  nftsApprove: IGetApproveSwap[],
) {
  const approvedCall: IApproveMulticall[] = nftsApprove.map((data) => ({
    abi: MockERC721Abi,
    functionName: "getApproved",
    address: data.tokenAddress,
    args: [data.amountOrId],
  }));

  const approvedTokens = await publicClientViem.multicall({
    contracts: approvedCall,
    allowFailure: false,
  });

  return approvedTokens;
}
