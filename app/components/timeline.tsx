"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const milestones = [
  {
    year: "2016",
    title: "The Spark",
    desc: "Founded with a vision to revolutionize energy storage.",
    icon: "⚡",
  },
  {
    year: "2017",
    title: "First Product Line",
    desc: "Launched our flagship lithium-ion battery series.",
    icon: "🔋",
  },
  {
    year: "2018",
    title: "Global Expansion",
    desc: "Operations expanded across 5 countries in Asia.",
    icon: "🌏",
  },
  {
    year: "2019",
    title: "Solar Division",
    desc: "Entered the solar energy market with high-efficiency panels.",
    icon: "☀️",
  },
  {
    year: "2020",
    title: "1 Million Units",
    desc: "Reached the milestone of 1M products delivered worldwide.",
    icon: "🎯",
  },
  {
    year: "2021",
    title: "UPS Systems",
    desc: "Introduced enterprise-grade uninterrupted power solutions.",
    icon: "🔌",
  },
  {
    year: "2022",
    title: "EV Charging",
    desc: "Launched our nationwide EV charging station network.",
    icon: "🚗",
  },
  {
    year: "2023",
    title: "50 Countries",
    desc: "Global footprint expanded to over 50 countries.",
    icon: "🌍",
  },
  {
    year: "2024",
    title: "Carbon Neutral",
    desc: "Achieved carbon-neutral manufacturing across all facilities.",
    icon: "🌿",
  },
  {
    year: "2025",
    title: "10M Products",
    desc: "Delivered over 10 million energy products globally.",
    icon: "🏆",
  },
  {
    year: "2026",
    title: "A Decade Strong",
    desc: "Celebrating 10 years of powering the future.",
    icon: "✨",
  },
];

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`flex items-center gap-4 md:gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}
      >
        <div
          className={`bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 hover:border-cyan/20 transition-all duration-500 group ${
            isLeft ? "md:ml-auto" : "md:mr-auto"
          } max-w-md`}
        >
          <div className="text-3xl mb-3">{milestone.icon}</div>
          <span className="text-cyan font-mono text-sm tracking-wider">
            {milestone.year}
          </span>
          <h3 className="text-xl font-bold mt-1 mb-2 group-hover:text-gradient-cyan transition-all">
            {milestone.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed">
            {milestone.desc}
          </p>
        </div>
      </motion.div>

      <div className="hidden md:flex flex-col items-center relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.4, ease: "backOut" }}
          className="w-4 h-4 rounded-full bg-cyan shadow-[0_0_15px_rgba(0,212,255,0.5)] z-10"
        />
      </div>

      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "bottom 40%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      className="relative section-padding bg-grid"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-cyan font-mono text-sm tracking-widest uppercase">
            Our Journey
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-3">
            A Decade of{" "}
            <span className="text-gradient-gold">Milestones</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div
            ref={lineRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan/50 via-cyan/20 to-transparent origin-top"
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {milestones.map((m, i) => (
              <MilestoneCard key={m.year} milestone={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
