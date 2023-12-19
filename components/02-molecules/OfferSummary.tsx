import { useContext } from "react";
import { useEnsName, useNetwork } from "wagmi";
import { EthereumAddress } from "@/lib/shared/types";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { ChainInfo } from "@/lib/client/constants";
import { SwapContext } from "@/components/01-atoms";
import { PersonIcon } from "@/components/01-atoms/icons";
import { NftCard } from "@/components/02-molecules";

interface IOfferSummary {
  forAuthedUser: boolean;
}

export const OfferSummary = ({ forAuthedUser }: IOfferSummary) => {
  const { validatedAddressToSwap, nftAuthUser, nftInputUser, destinyChain } =
    useContext(SwapContext);
  const { chain } = useNetwork();
  const { data } = useEnsName({
    address: validatedAddressToSwap as `0x${string}`,
  });

  const { authenticatedUserAddress } = useAuthenticatedUser();

  return (
    <div className="w-full flex flex-col gap-4 px-3 pt-2 pb-4 dark:bg-[#212322] dark:border-[#434443] rounded-lg border">
      <div className="flex justify-between items-center h-9 gap-2">
        <div className="flex space-x-2">
          <div className="flex items-center">
            <PersonIcon />
          </div>
          <div className="items-center">
            <p className="font-medium">
              {forAuthedUser
                ? "You give"
                : !forAuthedUser && !validatedAddressToSwap
                ? "Use the search bar!"
                : `${
                    data
                      ? data
                      : new EthereumAddress(
                          validatedAddressToSwap,
                        ).getEllipsedAddress()
                  } gives`}
            </p>
          </div>
        </div>
        {!forAuthedUser && !validatedAddressToSwap ? null : (
          <div>
            {forAuthedUser ? nftAuthUser.length : nftInputUser.length} item
            {forAuthedUser
              ? nftAuthUser.length !== 1
                ? "s"
                : ""
              : nftInputUser.length !== 1
              ? "s"
              : ""}
          </div>
        )}
      </div>

      <div className="w-full h-full min-h-[144px] bg-[#f8f8f8] dark:bg-[#393b3a] rounded p-4">
        <div className="grid grid-cols-6 gap-3">
          {(forAuthedUser && !authenticatedUserAddress?.address) ||
          (!forAuthedUser && !validatedAddressToSwap) ? null : (
            <NftCard
              withSelectionValidation={false}
              ownerAddress={
                forAuthedUser
                  ? authenticatedUserAddress
                    ? authenticatedUserAddress.address
                    : null
                  : validatedAddressToSwap
              }
              nftData={forAuthedUser ? nftAuthUser[0] : nftInputUser[0]}
            />
          )}
        </div>
      </div>

      <div className="ml-auto flex space-x-1 mr-1 text-gray-700 dark:text-[#f6f6f6] font-medium text-sm">
        <p>from</p>
        <p>
          {forAuthedUser ? (
            <>{chain?.name}</>
          ) : (
            <>{ChainInfo[destinyChain].name}</>
          )}
        </p>
      </div>
    </div>
  );
};
