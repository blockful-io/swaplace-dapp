import { HomeSection, Layout } from "@/components/04-templates";
import { useAuthedAccess } from "@/lib/client/hooks/useAuthedAccess";
import cc from "classcat";

export default function Index() {
  useAuthedAccess();

  return (
    <Layout>
      <div
        className={cc([
          "w-full min-h-[100vh] h-full flex flex-col justify-center items-center",
        ])}
      >
        <HomeSection />
      </div>
    </Layout>
  );
}
