"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProfileCard } from "@/components/ProfileCard";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[90vh] flex-col items-center bg-white dark:bg-black px-4 pt-24 pb-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-3xl flex-1 w-full flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[min(80svh,340px)] flex-1 flex items-center justify-center"
        >
          <ProfileCard
            name="Thom Man Hei Matthew"
            title="Data Science @ CityU HK"
            handle="thommanheimatthew"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/images/ME.png"
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={false}
            contactHref="#contact"
            whiteBackground
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="-mt-10 flex flex-col items-center gap-6 pt-6"
        >
          <p className="max-w-2xl text-center text-lg text-foreground sm:text-xl">
            Aspring Data Scientist/AI engineer &amp; · AI/ML @ AS Watson Group
          </p>
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
