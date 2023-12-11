import cc from "classcat";
import { TheHeader } from "@/components/02-molecules";
import { Layout, SwapSection } from "@/components/04-templates";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";

export default function SwapPage() {
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
          <SwapSection />
        </div>
      )}
    </Layout>
  );
}
