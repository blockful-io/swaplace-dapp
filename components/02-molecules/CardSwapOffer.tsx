import { TokensSwapList } from "./TokensSwapList";
import { TokensShelfVariant } from "@/components/03-organisms";
import {
  TokenCardActionType,
  TokenCardStyleType,
  UserOfferInfo,
} from "@/components/02-molecules";
import { TokenCardProperties } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { EthereumAddress, Token } from "@/lib/shared/types";

interface CardOffersProps {
  address: EthereumAddress | null;
  tokens?: Token[];
}

export const CardSwapOffer = ({ address, tokens }: CardOffersProps) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();

  const tokenShelfVariant = authenticatedUserAddress?.equals(address)
    ? TokensShelfVariant.Your
    : TokensShelfVariant.Their;

  return (
    <div className="md:p-4">
      <div className="flex flex-col justify-content gap-4 md:w-[326px]">
        <UserOfferInfo address={authenticatedUserAddress} />
        <div className="max-h-[100px] overflow-scroll">
          <TokensSwapList
            ownerAddress={authenticatedUserAddress}
            withAddTokenCard={false}
            withPlaceholders={true}
            variant={tokenShelfVariant}
            withSelectionValidation={false}
            tokenCardClickAction={TokenCardActionType.NO_ACTION}
            tokensList={tokens ?? []}
            tokenCardStyleType={TokenCardStyleType.MEDIUM}
          />
        </div>

        <div>
          <TokenCardProperties properties={{ amount: 2, value: 0.056 }} />
        </div>
      </div>
    </div>
  );
};
