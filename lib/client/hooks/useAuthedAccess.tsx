import { useAuthenticatedUser } from "./useAuthenticatedUser";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const useAuthedAccess = () => {
  const router = useRouter();

  const { authenticatedUserAddress } = useAuthenticatedUser();

  useEffect(() => {
    if (authenticatedUserAddress) {
      toast.success(`Welcome to Swaplace!`, {
        id: "welcome-toast",
      });
    }
  }, [router.pathname, authenticatedUserAddress]);
};
