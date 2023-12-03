import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { ConnectWallet } from "../components/index";

export default function Index() {
  const {
    authenticatedUserAddress,
    authenticatedUserEnsName,
    preferredChainId,
  } = useAuthenticatedUser();

  return (
    <div>
      <header className="py-6 flex justify-between px-20 font-medium bg-green-200 shadow">
        <h1>Swaplace dApp</h1>
        <ConnectWallet />
      </header>

      <main className="max-w-3xl mx-auto">
        <h1 className="font-semibold my-10 text-center w-full">
          Check out the already implemented features:
        </h1>

        <section className="border-gray-600">
          <div className="w-full mx-auto text-xl mb-4 font-medium text-gray-500">
            useAuthenticatedUser()
          </div>
          <div className="border-2 border-gray-400 px-3 py-4 rounded-xl">
            <div className="w-full flex justify-between">
              <p>authenticatedUserAddress:</p>
              <p>{authenticatedUserAddress?.address ?? "null"}</p>
            </div>
            <div className="w-full flex justify-between">
              <p>authenticatedUserEnsName:</p>
              <p>{authenticatedUserEnsName ?? "null"}</p>
            </div>
            <div className="w-full flex justify-between">
              <p>preferredChainId:</p>
              <p>{preferredChainId ?? "null"}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
