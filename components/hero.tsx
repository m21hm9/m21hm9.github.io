"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import TextType from "@/components/TextType";
import { CodePreviewCard } from "@/components/CodePreviewCard";

const Avatar3D = dynamic(
  () => import("@/components/MyAvatar3D").then((mod) => mod.Avatar3D),
  { ssr: false }
);

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] flex-col items-center bg-white dark:bg-black px-4 pt-24 pb-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-5xl flex-1 w-full flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-10 mb-8 text-4xl font-semibold tracking-tight text-foreground sm:mt-16 sm:mb-10 sm:text-5xl"
        >
          <TextType
            as="span"
            text={["Hi, I\u2019m Matthew Thom"]}
            typingSpeed={75}
            pauseDuration={1500}
            deletingSpeed={50}
            loop={false}
            showCursor
            cursorCharacter="_"
            cursorBlinkDuration={0.5}
          />
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl flex shrink-0 items-center justify-center md:flex-1 mb-8 md:mb-12"
        >
          <Avatar3D />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 flex w-full flex-col items-center gap-6 pt-6 md:mt-8 md:pt-8"
        >
          <div className="w-full max-w-[520px]">
            <CodePreviewCard />
          </div>
          <Button
            variant="outline"
            asChild
            size="lg"
            className="border-foreground text-foreground hover:bg-foreground hover:text-background"
          >
            <Link href="#contact">Get in touch</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
