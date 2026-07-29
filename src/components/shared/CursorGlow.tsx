"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Position coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Damping physics config for smooth, fluid trailing lag
  const springConfig = { damping: 40, stiffness: 280, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Tighter springs for the inner solid dot so it tracks the pointer immediately
  const dotSpringConfig = { damping: 50, stiffness: 600, mass: 0.2 };
  const dotXSpring = useSpring(cursorX, dotSpringConfig);
  const dotYSpring = useSpring(cursorY, dotSpringConfig);

  useEffect(() => {
    // Check if on desktop
    if (window.innerWidth <= 768) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("select") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer")
      ) {
        setHovered(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("select") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("cursor-pointer")
      ) {
        setHovered(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Hide native cursor
    document.body.style.cursor = "none";
    const customCursorStyle = document.createElement("style");
    customCursorStyle.innerHTML = `
      a, button, input, select, textarea, [role="button"], .cursor-pointer {
        cursor: none !important;
      }
    `;
    document.head.appendChild(customCursorStyle);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      
      document.body.style.cursor = "auto";
      customCursorStyle.remove();
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== "undefined" && window.innerWidth <= 768) {
    return null; // Disable on touch devices
  }

  return (
    <>
      {/* 1. Ambient Background Radial Glow (follows lag coordinates) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-300"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          transform: "translate(-150px, -150px)", // Center glow container
          opacity: isVisible ? 1 : 0
        }}
      >
        <div 
          className="w-[300px] h-[300px] rounded-full opacity-35 blur-[80px] dark:opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(124, 58, 237, 0.1) 50%, transparent 100%)"
          }}
        />
      </motion.div>

      {/* 2. Outer Circle Ring (Smooth Spring trailing physics) */}
      <motion.div
        className="pointer-events-none fixed z-50 flex items-center justify-center rounded-full border border-accent-blue/40 mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          width: 36,
          height: 36,
          marginLeft: -18, // Center circle
          marginTop: -18,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: clicked ? 0.8 : hovered ? 1.6 : 1,
          backgroundColor: hovered ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
          borderColor: hovered ? "rgba(255, 255, 255, 0.8)" : "rgba(37, 99, 235, 0.4)",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* 3. Inner Solid Dot (Tight tracking physics) */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full bg-accent-blue mix-blend-difference"
        style={{
          left: dotXSpring,
          top: dotYSpring,
          width: 6,
          height: 6,
          marginLeft: -3, // Center dot
          marginTop: -3,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: clicked ? 1.5 : hovered ? 0 : 1,
          backgroundColor: hovered ? "rgb(255, 255, 255)" : "rgb(37, 99, 235)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </>
  );
}
