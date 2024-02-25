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
            "xl:w-full w-full xl:mt-16 mt-12 xl:h-full space-y-6 flex xl:flex-row flex-col justify-items-stretch items-center mx-1",
          ])}
        >
          <div className="xl:h-[656px] xl:w-[62px] w-full flex justify-center mr-4 ml-2">
          <TheHeader />
          </div>
          <OfferSection />
        </div>
      )}
    </Layout>
  );
}
