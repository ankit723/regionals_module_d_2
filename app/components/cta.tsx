"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative section-padding overflow-hidden"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      <motion.div
        ref={contentRef}
        style={{ scale, opacity }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] p-12 md:p-20 relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />

          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: "backOut" }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan to-blue mx-auto mb-8 flex items-center justify-center"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to Power{" "}
            <span className="text-gradient-cyan">Your Future?</span>
          </h2>
          <p className="text-muted text-lg mb-10 max-w-xl mx-auto">
            Join thousands of businesses and communities powered by Voltera.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan to-blue text-white font-semibold text-sm tracking-wide hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-shadow duration-300"
            >
              Request a Consultation
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-full border border-white/10 text-white/80 font-medium text-sm tracking-wide hover:bg-white/5 transition-all duration-300"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
