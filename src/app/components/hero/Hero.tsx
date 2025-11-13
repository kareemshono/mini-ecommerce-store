"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 3, ease: "easeInOut" as const } },
};

const words = ["الجميع", "الأناقة", "الراحة", "الرياضة", "الأطفال", "الكبار"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-screen h-screen overflow-hidden">
     
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 h-full"
      >
      
        <motion.div variants={item} className="relative h-full">
          <img
            src="/hero/kids.webp"
            alt="Kids Collection"
            className="w-full h-full object-cover"
          />
        </motion.div>

      
        <div className="grid grid-rows-2 h-full">
     
          <motion.div variants={item} className="relative hidden md:block">
            <img
              src="/hero/sports.webp"
              alt="Sports Wear"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div variants={item} className="relative">
            <img
              src="/hero/men.webp"
              alt="Men's Collection"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>


        <motion.div variants={item} className="relative h-full">
          <img
            src="/hero/women.webp"
            alt="Women's Collection"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>


      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/70 to-gray-800/60 flex items-center justify-center z-1">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center text-white px-6 max-w-4xl"
        >
 
          <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold mb-4 leading-tight">
            <span className="block">
              مرحباً بك في متجر
            </span>
            <span
              className="block mt-2 bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-slate-400 bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, #453ba5ff, #c800de, #020618)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              R-Link
            </span>
          </h1>

          <div className="h-10 md:h-12 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={wordIndex}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl  text-white/90"
              >
                لـ {words[wordIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10"
          >
            <Button
              asChild
              size="lg"
              className="relative overflow-hidden group bg-white text-black hover:bg-gradient-to-r hover:from-indigo-500 hover:via-fuchsia-500 hover:to-slate-500 hover:text-white transition-all duration-500"
            >
              <Link href="/products">
                <span className="relative z-10 font-semibold">اكتشف الآن</span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

    
      <div className="md:hidden absolute inset-0">

      </div>
    </section>
  );
}