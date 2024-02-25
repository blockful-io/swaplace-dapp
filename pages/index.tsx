import { Layout, SwapSection } from "@/components/04-templates";
import cc from "classcat";

export default function IndexPage() {
  return (
    <Layout>
        <div
          className={cc([
            "w-full h-full mt-12 xl:mt-16 flex flex-col justify-center items-center",
          ])}
        >
          <SwapSection />
        </div>
    </Layout>
  );
}
