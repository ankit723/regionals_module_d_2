"use client";

import { useRef } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";

const products = [
  {
    name: "Lithium-Ion Batteries",
    desc: "High-density cells engineered for endurance and rapid charging.",
    gradient: "from-cyan/20 to-blue/20",
    iconPath:
      "M6 7h2v10H6zm4 0h2v10h-2zm4 0h2v10h-2zm4 3h1a1 1 0 011 1v2a1 1 0 01-1 1h-1zM4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2z",
  },
  {
    name: "Solar Panels",
    desc: "Next-gen photovoltaic panels with industry-leading efficiency.",
    gradient: "from-gold/20 to-yellow-500/20",
    iconPath:
      "M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M7.34 16.66l-1.41 1.41m12.73 0l-1.41-1.41M7.34 7.34L5.93 5.93M12 8a4 4 0 100 8 4 4 0 000-8z",
  },
  {
    name: "UPS Systems",
    desc: "Enterprise-grade uninterrupted power for critical infrastructure.",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconPath:
      "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  },
  {
    name: "Power Banks",
    desc: "Portable energy — ultra-slim, ultra-fast, ultra-reliable.",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconPath:
      "M8 3a2 2 0 012-2h4a2 2 0 012 2v1h1a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h1zm3 8v4m-2-2h4",
  },
  {
    name: "EV Charging",
    desc: "Fast-charge stations powering the electric vehicle revolution.",
    gradient: "from-cyan/20 to-teal-500/20",
    iconPath:
      "M18.92 6.01A1 1 0 0018 5H6a1 1 0 00-.92.61L3 11v8a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-8zM6.5 15A1.5 1.5 0 118 13.5 1.5 1.5 0 016.5 15zm11 0A1.5 1.5 0 1119 13.5a1.5 1.5 0 01-1.5 1.5zM5 11l2-6h10l2 6z",
  },
  {
    name: "Energy Storage",
    desc: "Grid-scale storage systems for renewable energy integration.",
    gradient: "from-orange-500/20 to-red-500/20",
    iconPath:
      "M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm-8 8H6v-2h6zm6 0h-4v-2h4zm2-4H4V9h16z",
  },
];

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative"
    >
      <div
        className={`relative rounded-2xl bg-gradient-to-br ${product.gradient} p-px overflow-hidden`}
      >
        <div className="bg-[#0a0a12] rounded-2xl p-8 h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-white/[0.02] to-transparent rounded-bl-full" />

          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-cyan/10 transition-colors duration-500">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-cyan"
            >
              <path d={product.iconPath} />
            </svg>
          </div>

          <h3 className="text-lg font-bold mb-2 group-hover:text-cyan transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-muted text-sm leading-relaxed">{product.desc}</p>

          <motion.div
            className="mt-6 flex items-center gap-2 text-cyan text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ x: 5 }}
          >
            Learn more
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 8h10m0 0L9 4m4 4L9 12" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section id="products" className="relative section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-cyan font-mono text-sm tracking-widest uppercase">
            What We Build
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-3">
            Powering Every{" "}
            <span className="text-gradient-cyan">Dimension</span>
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: "1200px" }}
        >
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
