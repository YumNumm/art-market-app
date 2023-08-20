"use client";

import { BackgroundNoise } from "@/components/backgroundNoise";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <AnimatePresence>
      <div className="min-h-[100vh] sm:min-h-screen w-screen flex flex-col relative font-inter overflow-hidden ">
        <BackgroundNoise />
        <main className="flex flex-col justify-center static md:fixed w-screen h-screen p-8 overflow-hidden z-50">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 1.2,
              ease: [0.165, 0.84, 0.44, 1],
            }}
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={96}
              height={96}
              className="rounded-xl shadow-xl drop-shadow-xl mb-4"
            />
            <h1 className="relative font-black text-4xl md:text-[130px] leading-[0.95]  ">
              テッケン
            </h1>
            <h2 className="pt-4 relative text-2xl font-bold leading-[0.95] tracking-[-.5px] ">
              東京藝術大学
              <br />
              テクノロジー研究会
            </h2>
            <h3 className="pt-2 font-mono relative leading-[0.95] tracking-[-.5px] opacity-80">
              Tokyo University of the Arts
              <br /> Technology Study Group
            </h3>
          </motion.div>
        </main>
      </div>
    </AnimatePresence>
  );
}
