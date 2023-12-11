import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthenticatedUser } from "./useAuthenticatedUser";
import toast from "react-hot-toast";

export const useAuthedAccess = () => {
  const router = useRouter();

  const { authenticatedUserAddress } = useAuthenticatedUser();

  useEffect(() => {
    if (authenticatedUserAddress) {
      toast.success(`Welcome to Swaplace!`, {
        id: "welcome-toast",
      });
      router.push("/swap");
    } else {
      router.push("/");
    }
  }, [router.pathname, authenticatedUserAddress]);
};
