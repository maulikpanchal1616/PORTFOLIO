"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function PremiumWatermark() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end pointer-events-none">
      <motion.div
        className="pointer-events-auto relative flex items-center justify-end rounded-full p-[2px] cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1 }}
      >
        {/* Animated glowing border background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00e5ff] via-[#a855f7] to-[#00e5ff] opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-[spin_4s_linear_infinite]" />
        
        {/* Inner container */}
        <motion.div
          className="relative flex items-center gap-3 rounded-full bg-black/80 backdrop-blur-xl border border-white/20 p-1.5 shadow-2xl overflow-hidden"
          animate={{
            width: isHovered ? "auto" : "56px",
            paddingRight: isHovered ? "20px" : "6px"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="relative w-11 h-11 shrink-0 rounded-full overflow-hidden border border-white/10 shadow-inner">
            <Image
              src="/images/Maulik Photo.jpeg"
              alt="Maulik Panchal - Creator"
              fill
              className="object-cover object-[center_20%]"
              sizes="44px"
            />
          </div>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -10, width: 0 }}
                animate={{ opacity: 1, x: 0, width: "auto" }}
                exit={{ opacity: 0, x: -10, width: 0 }}
                transition={{ duration: 0.2 }}
                className="whitespace-nowrap flex flex-col pr-2"
              >
                <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold leading-tight">
                  Designed By
                </span>
                <span className="text-sm font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent leading-tight">
                  Maulik Panchal
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
