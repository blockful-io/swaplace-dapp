import { useAuthedAccess } from "@/lib/client/hooks/useAuthedAccess";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useAuthedAccess();

  const router = useRouter();
  const { isConnected } = useAccount();


  return <>{children}</>;
};
