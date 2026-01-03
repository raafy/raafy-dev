"use client";

import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect, useRef } from "react";
import { Briefcase, Award, Users } from "lucide-react";

interface StatsProps {
  messages: Record<string, string>;
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2 });
    return controls.stop;
  }, [count, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toString() + suffix;
      }
    });
    return () => unsubscribe();
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Stats({ messages: t }: StatsProps) {
  const stats = [
    {
      icon: Briefcase,
      value: 4,
      suffix: "+",
      label: t.experience,
    },
    {
      icon: Award,
      value: 12,
      suffix: "+",
      label: t.technologies,
    },
    {
      icon: Users,
      value: 100,
      suffix: "%",
      label: t.satisfaction,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-20 dark:from-gray-900 dark:to-black md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 p-4 dark:from-gray-700 dark:to-gray-600">
                  <stat.icon className="h-8 w-8" />
                </div>
                <motion.div
                  className="mb-2 text-4xl font-bold md:text-5xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <Counter value={stat.value} suffix={stat.suffix} />
                </motion.div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
