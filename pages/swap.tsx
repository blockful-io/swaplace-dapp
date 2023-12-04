import { useAuthedAccess } from "@/lib/client/hooks/useAuthedAccess";
import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";

export default function SwapPage() {
  useAuthedAccess();

  const {
    disconnectUser,
    preferredChainId,
    authenticatedUserAddress,
    authenticatedUserEnsName,
  } = useAuthenticatedUser();

  if (!authenticatedUserAddress) return null;

  return (
    <main className="max-w-3xl mx-auto">
      <h2 onClick={disconnectUser} className="font-medium">
        Disconnect wallet
      </h2>

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
  );
}
