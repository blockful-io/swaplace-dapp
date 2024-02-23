import { TheHeader } from "@/components/02-molecules";
import { Layout } from "@/components/04-templates";
import { OfferSection } from "@/components/04-templates/OfferSection";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import cc from "classcat";

export default function Offers() {
  const { authenticatedUserAddress } = useAuthenticatedUser();

  return (
    <Layout>
      {authenticatedUserAddress && (
        <div
          className={cc([
            "w-full h-full mt-32 md:mt-40 xl:mt-16 flex flex-col justify-center items-center",
          ])}
        >
          <TheHeader />
          <OfferSection />
        </div>
      )}
    </Layout>
  );
}
