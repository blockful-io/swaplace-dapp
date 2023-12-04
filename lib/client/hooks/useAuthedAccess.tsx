import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthenticatedUser } from "./useAuthenticatedUser";

export const useAuthedAccess = () => {
  const router = useRouter();

  const { authenticatedUserAddress } = useAuthenticatedUser();

  useEffect(() => {
    if (authenticatedUserAddress) {
      router.push("/swap");
    } else {
      router.push("/");
    }
  }, [router.pathname, authenticatedUserAddress]);
};
