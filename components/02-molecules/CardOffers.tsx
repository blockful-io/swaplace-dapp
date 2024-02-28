import { TokenCard, UserOfferInfo } from "@/components/02-molecules";
import { SwapContext, TokenCardProperties } from "@/components/01-atoms";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { EthereumAddress } from "@/lib/shared/types";
import { useContext } from "react";

export enum CardOfferVariant {
  DEFAULT = "default",
  SECONDARY = "secondary",
}

type CardOfferVariants = CardOfferVariant | "default" | "secondary";

interface CardOffersProps {
  address: EthereumAddress | null;
  variant?: CardOfferVariants;
}

interface CardOfferSConfig {
  body: React.ReactNode;
}

export const CardOffers = ({
  address,
  variant = "default",
}: CardOffersProps) => {
  const { authenticatedUserAddress } = useAuthenticatedUser();
  const { authenticatedUserTokensList } = useContext(SwapContext);

  const DefaultVariant = () => {
    return (
      <div className="md:p-4">
        <div className="flex flex-col justify-content gap-4 md:w-[326px]">
          <div>
            <UserOfferInfo address={address} />
          </div>
          <div>
            {authenticatedUserAddress && ( // That div needs change to render the given Tokens by Subgraph, shouldn't be the <TokenCard here/> , for now, just visualization
              <div className="grid md:grid-cols-4 md:gap-4 ">
                {authenticatedUserTokensList.map((token, index) => (
                  <TokenCard
                    key={index}
                    withSelectionValidation={false}
                    ownerAddress={authenticatedUserAddress?.address}
                    tokenData={token}
                    styleType="medium"
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <TokenCardProperties properties={{ amount: 2, value: 0.056 }} />
          </div>
        </div>
      </div>
    );
  };

  const SecondaryVariant = () => {
    return (
      <div className="md:px-4 md:pt-4 md:pb-7  ">
        <div className="flex flex-col justify-content gap-4 md:w-[400px] max-h-[150px] overflow-y-auto no-scrollbar">
          <div>
            <UserOfferInfo address={address} variant={"secondary"} />
          </div>
          <div>
            {authenticatedUserAddress && ( // That div needs change to render the given Tokens by Subgraph, shouldn't be the <NftCard here/> , for now, just visualization
              <div className="grid md:grid-cols-5 md:gap-4 ">
                {authenticatedUserTokensList.map((token, index) => (
                  <TokenCard
                    key={index}
                    withSelectionValidation={false}
                    ownerAddress={authenticatedUserAddress?.address}
                    tokenData={token}
                    styleType="medium"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const CardOfferVariantsConfig: Record<CardOfferVariant, CardOfferSConfig> = {
    [CardOfferVariant.DEFAULT]: {
      body: <DefaultVariant />,
    },
    [CardOfferVariant.SECONDARY]: {
      body: <SecondaryVariant />,
    },
  };

  return <>{CardOfferVariantsConfig[variant].body}</>;
};
