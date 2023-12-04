import { TheHeader } from "@/components/02-molecules";
import { HomeSection } from "@/components/04-templates";
import { useAuthedAccess } from "@/lib/client/hooks/useAuthedAccess";
import cc from "classcat";

export default function Index() {
  useAuthedAccess();

  return (
    <div
      className={cc([
        "w-full h-full flex flex-col justify-center items-center",
      ])}
    >
      <TheHeader />
      <HomeSection />
    </div>
  );
}
