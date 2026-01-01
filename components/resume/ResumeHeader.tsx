"use client";

import { motion } from "motion/react";
import { Mail, Phone, Globe, MapPin } from "lucide-react";
import Link from "next/link";

interface Basics {
  name: string;
  label: string;
  email: string;
  phone: string;
  url: string;
  location: {
    city: string;
    countryCode: string;
    state: string;
  };
  profiles: Array<{
    network: string;
    username: string;
    url: string;
  }>;
}

export function ResumeHeader({
  basics,
  translatedLabel,
}: {
  basics: Basics;
  translatedLabel: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold md:text-6xl"
        >
          {basics.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl font-medium opacity-60 md:text-2xl"
        >
          {translatedLabel}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap gap-4 text-sm md:text-base"
      >
        <Link
          href={`mailto:${basics.email}`}
          className="flex cursor-pointer items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
        >
          <Mail size={16} />
          {basics.email}
        </Link>
        <span className="flex items-center gap-2 opacity-70">
          <Phone size={16} />
          {basics.phone}
        </span>
        <Link
          href={basics.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
        >
          <Globe size={16} />
          {basics.url.replace("https://", "")}
        </Link>
        <span className="flex items-center gap-2 opacity-70">
          <MapPin size={16} />
          {basics.location.city}, {basics.location.countryCode}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex gap-4"
      >
        {basics.profiles.map((profile, index) => (
          <Link
            key={index}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer rounded-lg border border-gray-200 bg-white/50 px-4 py-2 text-sm font-medium transition-all hover:border-gray-300 hover:bg-white dark:border-white/20 dark:bg-white/5 dark:hover:border-white/30 dark:hover:bg-white/10"
          >
            {profile.network}
          </Link>
        ))}
      </motion.div>
    </motion.header>
  );
}
