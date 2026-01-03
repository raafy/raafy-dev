import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { FeaturedSkills } from "@/components/home/FeaturedSkills";
import { CallToAction } from "@/components/home/CallToAction";
import { getMessages } from "next-intl/server";

export default async function Home() {
  const messages = await getMessages();

  return (
    <div className="flex flex-col">
      <Hero messages={messages.hero} />
      <Stats messages={messages.stats} />
      <FeaturedSkills messages={messages.skills} />
      <CallToAction messages={messages.cta} />
    </div>
  );
}
