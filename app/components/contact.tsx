"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const contactInfo = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 4L12 13 2 4" />
      </svg>
    ),
    label: "Email Us",
    value: "contact@voltera.energy",
    href: "mailto:contact@voltera.energy",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "Call Us",
    value: "+1 (800) 965-8372",
    href: "tel:+18009658372",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Visit Us",
    value: "200 Energy Blvd, Austin, TX 78701",
    href: "https://maps.google.com",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Business Hours",
    value: "Mon — Fri, 9:00 AM — 6:00 PM",
    href: null,
  },
];

const subjects = [
  "General Inquiry",
  "Product Information",
  "Partnership Opportunities",
  "Technical Support",
  "Career Inquiry",
  "Media & Press",
  "Other",
];

function FormInput({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
  delay,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  delay: number;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <label className="block text-sm text-muted mb-2 tracking-wide">
        {label}
        {required && <span className="text-cyan ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-cyan/40 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(0,212,255,0.08)]"
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
      <motion.div
        className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-cyan to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-50px" });
  const formInView = useInView(formRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const updateField = (field: string) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative section-padding overflow-hidden bg-grid"
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, rgba(0,212,255,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(212,175,55,0.04) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-cyan font-mono text-sm tracking-widest uppercase">
            Get in Touch
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-3">
            Let&apos;s Power Something{" "}
            <span className="text-gradient-cyan">Together</span>
          </h2>
          <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">
            Have a question, partnership idea, or just want to say hello?
            We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact Info — Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                className="group"
              >
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    <ContactCard item={item} />
                  </a>
                ) : (
                  <ContactCard item={item} />
                )}
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-4 p-6 rounded-2xl bg-gradient-to-br from-cyan/5 to-blue/5 border border-cyan/10"
            >
              <p className="text-sm text-muted leading-relaxed">
                For urgent inquiries, please call our 24/7 support hotline.
                Enterprise clients can reach their dedicated account manager directly.
              </p>
            </motion.div>
          </motion.div>

          {/* Form — Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="text-center py-16"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
                      className="w-20 h-20 rounded-full bg-cyan/10 border border-cyan/20 mx-auto mb-6 flex items-center justify-center"
                    >
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                    <p className="text-muted max-w-sm mx-auto mb-8">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
                      }}
                      className="px-6 py-3 rounded-full border border-white/10 text-sm text-white/70 hover:bg-white/5 transition-all duration-300"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormInput
                        label="Full Name"
                        name="name"
                        required
                        value={form.name}
                        onChange={updateField("name")}
                        delay={0.1}
                      />
                      <FormInput
                        label="Email Address"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={updateField("email")}
                        delay={0.15}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormInput
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={updateField("phone")}
                        delay={0.2}
                      />
                      <FormInput
                        label="Company"
                        name="company"
                        value={form.company}
                        onChange={updateField("company")}
                        delay={0.25}
                      />
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <label className="block text-sm text-muted mb-2 tracking-wide">
                        Subject <span className="text-cyan ml-1">*</span>
                      </label>
                      <select
                        name="subject"
                        required
                        value={form.subject}
                        onChange={(e) => updateField("subject")(e.target.value)}
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 focus:border-cyan/40 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(0,212,255,0.08)] appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238a8a9a' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                        }}
                      >
                        <option value="" disabled className="bg-[#0a0a12] text-white/40">
                          Select a subject
                        </option>
                        {subjects.map((s) => (
                          <option key={s} value={s} className="bg-[#0a0a12] text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                    >
                      <label className="block text-sm text-muted mb-2 tracking-wide">
                        Message <span className="text-cyan ml-1">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => updateField("message")(e.target.value)}
                        placeholder="Tell us about your project or inquiry..."
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300 focus:border-cyan/40 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(0,212,255,0.08)] resize-none"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                      className="pt-2"
                    >
                      <motion.button
                        type="submit"
                        disabled={sending}
                        whileHover={sending ? {} : { scale: 1.03 }}
                        whileTap={sending ? {} : { scale: 0.97 }}
                        className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-cyan to-blue text-white font-semibold text-sm tracking-wide hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        {sending ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="22" y1="2" x2="11" y2="13" />
                              <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactCard({ item }: { item: (typeof contactInfo)[0] }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan/20 transition-all duration-400 group-hover:bg-white/[0.04]">
      <div className="w-11 h-11 rounded-xl bg-cyan/10 flex items-center justify-center shrink-0 text-cyan group-hover:bg-cyan/20 transition-colors duration-300">
        {item.icon}
      </div>
      <div>
        <p className="text-xs text-muted uppercase tracking-wider mb-1">
          {item.label}
        </p>
        <p className="text-sm font-medium text-white/90 group-hover:text-cyan transition-colors duration-300">
          {item.value}
        </p>
      </div>
    </div>
  );
}
