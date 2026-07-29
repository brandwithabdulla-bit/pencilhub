"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 45, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 150); // Offset by half of width (300px)
      cursorY.set(e.clientY - 150); // Offset by half of height (300px)
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{
        left: cursorXSpring,
        top: cursorYSpring,
      }}
    >
      {/* Dynamic ambient radial lighting */}
      <div 
        className="w-[300px] h-[300px] rounded-full opacity-40 blur-[80px] transition-all duration-300 dark:opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(124, 58, 237, 0.1) 50%, transparent 100%)"
        }}
      />
    </motion.div>
  );
}
