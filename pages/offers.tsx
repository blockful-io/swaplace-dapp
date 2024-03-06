import { Layout, OfferSection } from "@/components/04-templates";
import cc from "classcat";

export default function Offers() {
  return (
    <Layout>
      <div
        className={cc([
          "w-screen h-screen flex flex-col justify-center items-center",
        ])}
      >
        <OfferSection />
      </div>
    </Layout>
  );
}
