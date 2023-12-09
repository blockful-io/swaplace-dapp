import cc from "classcat";
import { TheHeader } from "@/components/02-molecules";
import { Layout, SwapSection } from "@/components/04-templates";

export default function SwapPage() {
  return (
    <Layout>
      <div
        className={cc([
          "w-full h-full mt-24 flex flex-col justify-center items-center",
        ])}
      >
        <TheHeader />
        <SwapSection />
      </div>
    </Layout>
  );
}
