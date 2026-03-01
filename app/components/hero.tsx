"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.1,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0
                ? "var(--accent-gold)"
                : "var(--accent-cyan)",
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 5, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function EnergyRing({ delay, size }: { delay: number; size: number }) {
  return (
    <motion.div
      className="absolute rounded-full border border-cyan/10"
      style={{
        width: size,
        height: size,
        left: "50%",
        top: "50%",
        x: "-50%",
        y: "-50%",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1.2, 1], opacity: [0, 0.3, 0.1] }}
      transition={{ delay, duration: 2, ease: "easeOut" }}
    />
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(".hero-badge", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".hero-number",
          {
            innerText: 0,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            onUpdate: function () {
              if (numberRef.current) {
                numberRef.current.textContent = Math.round(
                  gsap.getProperty(numberRef.current, "innerText") as number
                ).toString();
              }
            },
          },
          "-=0.4"
        )
        .from(
          ".hero-title-word",
          {
            y: 80,
            opacity: 0,
            rotateX: -40,
            stagger: 0.08,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=1.5"
        )
        .from(
          ".hero-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".hero-cta",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-scroll-indicator",
          {
            opacity: 0,
            duration: 0.6,
          },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-radial-fade" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      <Particles />

      {[300, 500, 700, 900].map((size, i) => (
        <EnergyRing key={size} size={size} delay={1 + i * 0.3} />
      ))}

      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-6"
        style={{ opacity: textOpacity, scale: textScale }}
      >
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-sm text-muted tracking-wide">
            2016 — 2026
          </span>
        </div>

        <div className="relative mb-6">
          <span
            ref={numberRef}
            className="hero-number text-[10rem] md:text-[14rem] lg:text-[18rem] font-black leading-none text-gradient-gold"
            style={{ display: "inline-block" }}
          >
            10
          </span>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-48 h-48 rounded-full blur-3xl opacity-20"
              style={{ background: "var(--accent-gold)" }}
            />
          </div>
        </div>

        <div className="overflow-hidden mb-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {"YEARS OF POWERING".split(" ").map((word, i) => (
              <span
                key={i}
                className="hero-title-word inline-block mr-[0.3em]"
              >
                {word}
              </span>
            ))}
            <br />
            <span className="hero-title-word inline-block text-gradient-cyan">
              THE FUTURE
            </span>
          </h1>
        </div>

        <p className="hero-subtitle text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10">
          A decade of innovation. From our first battery to powering millions.
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.a
            href="#timeline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan to-blue text-white font-medium text-sm tracking-wide hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-shadow duration-300"
          >
            Explore Our Journey
          </motion.a>
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 rounded-full border border-white/10 text-white/80 font-medium text-sm tracking-wide hover:bg-white/5 transition-all duration-300"
          >
            View Products
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs text-muted tracking-widest uppercase">
          Scroll
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-cyan"
        >
          <path
            d="M10 4v12m0 0l-4-4m4 4l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
