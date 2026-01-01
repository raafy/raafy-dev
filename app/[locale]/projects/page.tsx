import { UnderConstruction } from "@/components/ui/UnderConstruction";
import { getMessages } from "next-intl/server";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(
    "Projects - Portfolio Showcase",
    "Explore my portfolio of web development projects. Building amazing digital experiences with React, Next.js, and modern web technologies.",
    "/projects"
  );
}

export default async function ProjectsPage() {
  const messages = await getMessages();

  return <UnderConstruction messages={messages.projects as any} />;
}
