import {
  CreateTokenOfferVariant,
  TokensShelfVariant,
} from "@/components/03-organisms";
import {
  TokenCardActionType,
  TokenCardStyleType,
  TokensList,
  UserOfferInfo,
  UserOfferVariant,
} from "@/components/02-molecules";
import { SwapContext, TokenCardProperties } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { EthereumAddress, Token } from "@/lib/shared/types";
import { useContext } from "react";

interface CardOffersProps {
  address: EthereumAddress | null;
  variant?: CreateTokenOfferVariant;
}

interface CardOfferSConfig {
  body: React.ReactNode;
}

export const CardOffers = ({
  address,
  variant = CreateTokenOfferVariant.HORIZONTAL,
}: CardOffersProps) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { authenticatedUserTokensList, searchedUserTokensList } =
    useContext(SwapContext);

  const tokenShelfVariant = authenticatedUserAddress?.equals(address)
    ? TokensShelfVariant.Your
    : TokensShelfVariant.Their;
  const tokensOfferFor: Record<TokensShelfVariant, Token[]> = {
    [TokensShelfVariant.Your]: searchedUserTokensList,
    [TokensShelfVariant.Their]: authenticatedUserTokensList,
  };

  const HorizontalVariant = (address: EthereumAddress | null) => {
    if (!address) return null;

    return (
      <div className="md:p-4">
        <div className="flex flex-col justify-content gap-4 md:w-[326px]">
          <UserOfferInfo address={address} />
          <TokensList
            ownerAddress={address}
            withAddTokenCard={false}
            withPlaceholders={false}
            variant={tokenShelfVariant}
            withSelectionValidation={false}
            tokenCardClickAction={TokenCardActionType.NO_ACTION}
            tokensList={tokensOfferFor[tokenShelfVariant]}
            tokenCardStyleType={TokenCardStyleType.MEDIUM}
          />
          <div>
            <TokenCardProperties properties={{ amount: 2, value: 0.056 }} />
          </div>
        </div>
      </div>
    );
  };

  const VerticalVariant = (address: EthereumAddress | null) => {
    if (!address) return null;

    return (
      <div className="flex flex-col justify-content gap-4 md:w-[400px] max-h-[150px] overflow-y-auto no-scrollbar">
        <UserOfferInfo address={address} variant={UserOfferVariant.SECONDARY} />
        <TokensList
          ownerAddress={address}
          withAddTokenCard={false}
          withPlaceholders={false}
          variant={tokenShelfVariant}
          displayERC20TokensAmount={true}
          withSelectionValidation={false}
          tokenCardClickAction={TokenCardActionType.NO_ACTION}
          tokensList={tokensOfferFor[tokenShelfVariant]}
          tokenCardStyleType={TokenCardStyleType.MEDIUM}
          gridClassNames="grid md:grid-cols-5 md:gap-4"
        />
      </div>
    );
  };

  const CardOfferVariantsConfig: Record<
    CreateTokenOfferVariant,
    CardOfferSConfig
  > = {
    [CreateTokenOfferVariant.HORIZONTAL]: {
      body: HorizontalVariant(address),
    },
    [CreateTokenOfferVariant.VERTICAL]: {
      body: VerticalVariant(address),
    },
  };

  return <>{CardOfferVariantsConfig[variant].body}</>;
};
