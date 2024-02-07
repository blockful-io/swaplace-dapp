import { useAuthedAccess } from "@/lib/client/hooks/useAuthedAccess";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  useAuthedAccess();

  return <>{children}</>;
};
