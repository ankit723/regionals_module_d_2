"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: 10, suffix: "M+", label: "Products Delivered", icon: "📦" },
  { value: 50, suffix: "+", label: "Countries Worldwide", icon: "🌎" },
  { value: 10, suffix: "K+", label: "Team Members", icon: "👥" },
  { value: 99.9, suffix: "%", label: "Customer Satisfaction", icon: "⭐" },
];

function StatCounter({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  const numRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !numRef.current) return;
    hasAnimated.current = true;

    gsap.registerPlugin(ScrollTrigger);

    const obj = { val: 0 };
    gsap.to(obj, {
      val: stat.value,
      duration: 2,
      delay: index * 0.15,
      ease: "power2.out",
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent =
            stat.value % 1 !== 0
              ? obj.val.toFixed(1)
              : Math.round(obj.val).toString();
        }
      },
    });
  }, [isInView, stat.value, index]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative text-center group"
    >
      <div className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-cyan/20 transition-all duration-500">
        <div className="text-4xl mb-4">{stat.icon}</div>
        <div className="text-5xl md:text-6xl font-black mb-2">
          <span ref={numRef} className="text-gradient-cyan">
            0
          </span>
          <span className="text-gradient-cyan">{stat.suffix}</span>
        </div>
        <p className="text-muted text-sm tracking-wide uppercase">
          {stat.label}
        </p>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section id="stats" className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-radial-fade" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-mono text-sm tracking-widest uppercase">
            Our Impact
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-3">
            Numbers That{" "}
            <span className="text-gradient-gold">Speak</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <StatCounter key={s.label} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
