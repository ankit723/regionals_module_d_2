"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const initiatives = [
  {
    icon: "🌱",
    title: "Carbon Neutral",
    desc: "All facilities run on 100% renewable energy since 2024.",
  },
  {
    icon: "♻️",
    title: "Zero Waste",
    desc: "95% of manufacturing waste is recycled or repurposed.",
  },
  {
    icon: "🌊",
    title: "Ocean Cleanup",
    desc: "Partnered to remove 500K tons of ocean plastic annually.",
  },
  {
    icon: "🌳",
    title: "1M Trees",
    desc: "Planted over one million trees across 30 countries.",
  },
];

function InitiativeCard({
  item,
  index,
}: {
  item: (typeof initiatives)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.05] p-8 hover:border-green-500/20 transition-all duration-500"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="text-4xl mb-4">{item.icon}</div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-green-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Sustainability() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      ref={sectionRef}
      id="sustainability"
      className="relative section-padding overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(34,197,94,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(0,212,255,0.08) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-green-400 font-mono text-sm tracking-widest uppercase">
            Sustainability
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-3">
            Powering a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
              Greener Tomorrow
            </span>
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">
            Sustainability isn&apos;t a goal — it&apos;s how we operate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initiatives.map((item, i) => (
            <InitiativeCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
