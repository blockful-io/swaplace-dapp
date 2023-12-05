import cc from "classcat";
import { TheHeader } from "@/components/02-molecules";
import { SwapSection } from "@/components/04-templates";
import { useAuthedAccess } from "@/lib/client/hooks/useAuthedAccess";

export default function SwapPage() {
  useAuthedAccess();

  return (
    <div
      className={cc([
        "w-full h-full flex flex-col justify-center items-center",
      ])}
    >
      <TheHeader />
      <SwapSection />
    </div>
  );
}
