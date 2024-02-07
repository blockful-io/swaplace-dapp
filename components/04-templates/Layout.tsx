/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthedAccess } from "@/lib/client/hooks/useAuthedAccess";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useAuthedAccess();

  const router = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected]);

  return <>{children}</>;
};
