import { useAuthenticatedUser } from "@/lib/client/hooks/useAuthenticatedUser";
import { ConnectWallet } from "../components/index";
import { useAuthedAccess } from "@/lib/client/hooks/useAuthedAccess";

export default function Index() {
  useAuthedAccess();

  return (
    <div>
      <header className="py-6 flex justify-between px-20 font-medium bg-green-200 shadow">
        <h1>Swaplace dApp</h1>
        <ConnectWallet />
      </header>
    </div>
  );
}
