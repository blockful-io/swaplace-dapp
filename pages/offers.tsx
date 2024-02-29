import { Layout } from "@/components/04-templates";
import { OfferSection } from "@/components/04-templates/OfferSection";
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
