import { getMessages } from "next-intl/server";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import type { ContactMessages } from "@/types/contact";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata(
    "Contact - Get In Touch",
    "Have a project in mind or want to discuss opportunities? Get in touch with me. I'm always interested in hearing about new projects and opportunities.",
    "/contact"
  );
}

export default async function ContactPage() {
  const messages = await getMessages();
  return <ContactPageContent messages={messages.contact as ContactMessages} />;
}
