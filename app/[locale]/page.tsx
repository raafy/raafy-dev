import Greetings from "@/components/ui/Greetings";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("homePage");

  return (
    <section className="flex flex-col items-center gap-y-8">
      <Greetings
        title={t.raw("title")}
        heading={t("heading")}
        description={t("description")}
      />
    </section>
  );
}
