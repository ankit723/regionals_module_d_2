"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SectionDivider({ variant = "cyan" }: { variant?: "cyan" | "gold" | "green" }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const colors = {
    cyan: "from-transparent via-cyan/40 to-transparent",
    gold: "from-transparent via-gold/40 to-transparent",
    green: "from-transparent via-green-400/40 to-transparent",
  };

  return (
    <div ref={ref} className="relative h-px my-0 overflow-hidden">
      <motion.div
        style={{ scaleX, opacity }}
        className={`absolute inset-0 bg-gradient-to-r ${colors[variant]}`}
      />
    </div>
  );
}
