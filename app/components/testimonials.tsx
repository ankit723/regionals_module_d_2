"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "Voltera's battery solutions transformed our operations. Reliability we can count on, year after year.",
    name: "Sarah Chen",
    role: "CTO, GridFlow Inc.",
    rating: 5,
  },
  {
    quote:
      "Their solar panels deliver unmatched efficiency. Our energy costs dropped 60% within the first year.",
    name: "Marcus Weber",
    role: "Director, SunCrest Homes",
    rating: 5,
  },
  {
    quote:
      "The UPS systems have given us zero downtime in 3 years. That's the Voltera difference.",
    name: "Aisha Patel",
    role: "VP Engineering, DataVault",
    rating: 5,
  },
  {
    quote:
      "From pilot project to full deployment across 12 countries — Voltera scaled with us seamlessly.",
    name: "James Okonkwo",
    role: "CEO, AfriPower Ltd.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  return (
    <section
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-cyan font-mono text-sm tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-3">
            Trusted by{" "}
            <span className="text-gradient-cyan">Industry Leaders</span>
          </h2>
        </motion.div>

        <div className="relative min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: testimonials[active].rating }).map(
                  (_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="var(--accent-gold)"
                    >
                      <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.69l5.34-.78z" />
                    </motion.svg>
                  )
                )}
              </div>

              <blockquote className="text-2xl md:text-3xl font-light leading-relaxed text-white/90 mb-8 max-w-3xl mx-auto">
                &ldquo;{testimonials[active].quote}&rdquo;
              </blockquote>

              <div>
                <p className="font-semibold text-lg">
                  {testimonials[active].name}
                </p>
                <p className="text-muted text-sm">
                  {testimonials[active].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group relative p-2"
            >
              <motion.div
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  i === active
                    ? "bg-cyan shadow-[0_0_10px_rgba(0,212,255,0.5)]"
                    : "bg-white/20 hover:bg-white/40"
                }`}
                animate={i === active ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.4 }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
