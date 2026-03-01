"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const products = [
  {
    name: "Lithium-Ion Batteries",
    tagline: "Endurance Redefined",
    desc: "High-density cells engineered for endurance and rapid charging. Powering devices, vehicles, and industries across 50+ countries.",
    features: ["4x Faster Charging", "10-Year Lifespan", "99.8% Efficiency"],
    accent: "var(--accent-cyan)",
    accentClass: "text-cyan",
    bgGradient:
      "radial-gradient(ellipse at 70% 50%, rgba(0,212,255,0.1) 0%, transparent 60%)",
    iconPath:
      "M6 7h2v10H6zm4 0h2v10h-2zm4 0h2v10h-2zm4 3h1a1 1 0 011 1v2a1 1 0 01-1 1h-1zM4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2z",
  },
  {
    name: "Solar Panels",
    tagline: "Harvest the Sun",
    desc: "Next-gen photovoltaic panels with industry-leading 24.5% efficiency. From rooftops to solar farms, built for the long haul.",
    features: ["24.5% Efficiency", "30-Year Warranty", "Self-Cleaning Coat"],
    accent: "var(--accent-gold)",
    accentClass: "text-gold",
    bgGradient:
      "radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.1) 0%, transparent 60%)",
    iconPath:
      "M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07l-1.41 1.41M7.34 16.66l-1.41 1.41m12.73 0l-1.41-1.41M7.34 7.34L5.93 5.93M12 8a4 4 0 100 8 4 4 0 000-8z",
  },
  {
    name: "UPS Systems",
    tagline: "Zero Downtime",
    desc: "Enterprise-grade uninterrupted power for critical infrastructure. Data centers, hospitals, and factories rely on our uptime guarantee.",
    features: ["<10ms Switchover", "Modular Scaling", "Remote Monitoring"],
    accent: "#22c55e",
    accentClass: "text-green-400",
    bgGradient:
      "radial-gradient(ellipse at 50% 30%, rgba(34,197,94,0.1) 0%, transparent 60%)",
    iconPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  },
  {
    name: "Power Banks",
    tagline: "Energy On The Move",
    desc: "Portable energy — ultra-slim, ultra-fast, ultra-reliable. From pocket-sized to expedition-grade, power wherever life takes you.",
    features: ["65W Fast Charge", "Aircraft Safe", "5000+ Cycles"],
    accent: "#a855f7",
    accentClass: "text-purple-400",
    bgGradient:
      "radial-gradient(ellipse at 60% 60%, rgba(168,85,247,0.1) 0%, transparent 60%)",
    iconPath:
      "M8 3a2 2 0 012-2h4a2 2 0 012 2v1h1a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h1zm3 8v4m-2-2h4",
  },
  {
    name: "EV Charging",
    tagline: "Fuel the Revolution",
    desc: "Fast-charge stations powering the electric vehicle revolution. A nationwide network delivering 350kW ultra-rapid charging.",
    features: ["350kW Ultra-Rapid", "2,500+ Stations", "Smart Grid Ready"],
    accent: "#14b8a6",
    accentClass: "text-teal-400",
    bgGradient:
      "radial-gradient(ellipse at 40% 40%, rgba(20,184,166,0.1) 0%, transparent 60%)",
    iconPath:
      "M18.92 6.01A1 1 0 0018 5H6a1 1 0 00-.92.61L3 11v8a1 1 0 001 1h1a1 1 0 001-1v-1h12v1a1 1 0 001 1h1a1 1 0 001-1v-8zM6.5 15A1.5 1.5 0 118 13.5 1.5 1.5 0 016.5 15zm11 0A1.5 1.5 0 1119 13.5a1.5 1.5 0 01-1.5 1.5zM5 11l2-6h10l2 6z",
  },
  {
    name: "Energy Storage",
    tagline: "Grid-Scale Power",
    desc: "Grid-scale storage systems for renewable energy integration. Stabilize grids, store surplus, and deliver on demand.",
    features: ["100MWh Capacity", "AI Load Balancing", "20-Year Lifecycle"],
    accent: "#f97316",
    accentClass: "text-orange-400",
    bgGradient:
      "radial-gradient(ellipse at 70% 70%, rgba(249,115,22,0.1) 0%, transparent 60%)",
    iconPath:
      "M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm-8 8H6v-2h6zm6 0h-4v-2h4zm2-4H4V9h16z",
  },
];

function ProductPanel({
  product,
  index,
  total,
}: {
  product: (typeof products)[0];
  index: number;
  total: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-200, 200], [5, -5]);
  const rotateY = useTransform(x, [-200, 200], [-5, 5]);

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
    <div
      className="product-panel w-screen h-screen flex-shrink-0 flex items-center justify-center relative px-6 md:px-16 lg:px-24"
    >
      <div className="absolute inset-0" style={{ background: product.bgGradient }} />

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Info */}
        <div className="product-panel-content">
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs font-mono tracking-widest uppercase"
              style={{ color: product.accent }}
            >
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: product.accent, opacity: 0.3 }} />
          </div>

          <p
            className="text-sm font-medium tracking-wider uppercase mb-3"
            style={{ color: product.accent }}
          >
            {product.tagline}
          </p>

          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
            {product.name}
          </h3>

          <p className="text-muted text-lg leading-relaxed mb-8 max-w-lg">
            {product.desc}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {product.features.map((f) => (
              <span
                key={f}
                className="px-4 py-2 rounded-full text-xs font-medium border"
                style={{
                  borderColor: `color-mix(in srgb, ${product.accent} 25%, transparent)`,
                  color: product.accent,
                  background: `color-mix(in srgb, ${product.accent} 5%, transparent)`,
                }}
              >
                {f}
              </span>
            ))}
          </div>

          <motion.a
            href="#contact"
            whileHover={{ x: 6 }}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300"
            style={{ color: product.accent }}
          >
            Learn more
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14m0 0l-6-6m6 6l-6 6" />
            </svg>
          </motion.a>
        </div>

        {/* Right: Visual */}
        <div className="flex items-center justify-center" style={{ perspective: "800px" }}>
          <motion.div
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
          >
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full opacity-20 blur-3xl"
              style={{ background: product.accent }}
            />

            {/* Outer ring */}
            <div
              className="absolute inset-4 rounded-full border"
              style={{ borderColor: `color-mix(in srgb, ${product.accent} 15%, transparent)` }}
            />

            {/* Inner card */}
            <div
              className="absolute inset-8 md:inset-12 rounded-3xl border flex items-center justify-center"
              style={{
                borderColor: `color-mix(in srgb, ${product.accent} 20%, transparent)`,
                background: `color-mix(in srgb, ${product.accent} 3%, var(--bg-secondary))`,
              }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke={product.accent}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="md:w-20 md:h-20"
              >
                <path d={product.iconPath} />
              </svg>
            </div>

            {/* Corner accents */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8"
              style={{ background: `linear-gradient(to bottom, ${product.accent}, transparent)`, opacity: 0.4 }}
            />
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-8"
              style={{ background: `linear-gradient(to top, ${product.accent}, transparent)`, opacity: 0.4 }}
            />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-px w-8"
              style={{ background: `linear-gradient(to right, ${product.accent}, transparent)`, opacity: 0.4 }}
            />
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 h-px w-8"
              style={{ background: `linear-gradient(to left, ${product.accent}, transparent)`, opacity: 0.4 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom progress dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: i === index ? 32 : 8,
              background: i === index ? product.accent : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Products() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".product-panel");
      if (!panels.length || !trackRef.current) return;

      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + (trackRef.current!.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel) => {
        const content = panel.querySelector(".product-panel-content");
        if (!content) return;

        gsap.from(content.children, {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: gsap.getById?.("panelScroll") || undefined,
            start: "left 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  if (isMobile) {
    return (
      <section id="products" className="relative py-20 px-6">
        <div className="text-center mb-12">
          <span className="text-cyan font-mono text-sm tracking-widest uppercase">
            What We Build
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Powering Every{" "}
            <span className="text-gradient-cyan">Dimension</span>
          </h2>
        </div>
        <div className="max-w-lg mx-auto flex flex-col gap-8">
          {products.map((p, i) => (
            <MobileProductCard key={p.name} product={p} index={i} total={products.length} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="products" ref={containerRef} className="relative overflow-hidden">
      {/* Sticky section title */}
      <div className="absolute top-8 left-8 z-20 hidden lg:block">
        <span className="text-cyan font-mono text-xs tracking-widest uppercase opacity-50">
          What We Build
        </span>
      </div>
      <div className="absolute top-8 right-8 z-20 hidden lg:block">
        <span className="text-muted font-mono text-xs tracking-widest">
          SCROLL &rarr;
        </span>
      </div>

      <div
        ref={trackRef}
        className="flex"
        style={{ width: `${products.length * 100}vw` }}
      >
        {products.map((p, i) => (
          <ProductPanel
            key={p.name}
            product={p}
            index={i}
            total={products.length}
          />
        ))}
      </div>
    </section>
  );
}

function MobileProductCard({
  product,
  index,
  total,
}: {
  product: (typeof products)[0];
  index: number;
  total: number;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] p-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50" style={{ background: product.bgGradient }} />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `color-mix(in srgb, ${product.accent} 10%, transparent)` }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={product.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={product.iconPath} />
            </svg>
          </div>
          <span className="text-xs font-mono tracking-widest" style={{ color: product.accent }}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
        <p className="text-xs font-medium tracking-wider uppercase mb-1" style={{ color: product.accent }}>
          {product.tagline}
        </p>
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-muted text-sm leading-relaxed mb-4">{product.desc}</p>
        <div className="flex flex-wrap gap-2">
          {product.features.map((f) => (
            <span
              key={f}
              className="px-3 py-1.5 rounded-full text-xs border"
              style={{
                borderColor: `color-mix(in srgb, ${product.accent} 25%, transparent)`,
                color: product.accent,
                background: `color-mix(in srgb, ${product.accent} 5%, transparent)`,
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
