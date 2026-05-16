"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Mail } from "lucide-react";

// Inline SVGs for Github and Linkedin since lucide-react removed brand icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C6.2 1.4 5 1.8 5 1.8a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3.4 9.4c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xlgzqzkn", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen py-20 md:py-32 bg-transparent flex items-center justify-center overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-square bg-[var(--color-electric-blue)]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-16 items-center">

        <div className="w-full md:w-1/2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-heading font-black text-white tracking-tight leading-tight mb-6"
          >
            Let's Build Something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-neon-purple)]">Futuristic</span>
          </motion.h2>
          <p className="text-white/60 text-lg mb-8">
            Have a project, startup idea, or creative collaboration in mind? Let’s create something visually unforgettable together.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6 text-white/80 mt-10"
          >
            <motion.a
              href="mailto:maulikvpanchal2006@gmail.com"
              whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10, z: 20 }}
              whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0, z: 0 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center gap-4 group hover:text-[var(--color-cyan)] transition-colors w-fit"
            >
              <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center group-hover:border-[var(--color-cyan)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Mail className="w-6 h-6 text-white/70 group-hover:text-[var(--color-cyan)] relative z-10" />
              </div>
              <span className="text-lg font-light tracking-wide">maulikvpanchal2006@gmail.com</span>
            </motion.a>

            <motion.a
              href="https://github.com/maulikpanchal1616" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotateX: -10, rotateY: 10, z: 20 }}
              whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0, z: 0 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center gap-4 group hover:text-[var(--color-cyan)] transition-colors w-fit"
            >
              <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center group-hover:border-[var(--color-cyan)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <GithubIcon className="w-6 h-6 text-white/70 group-hover:text-[var(--color-cyan)] relative z-10" />
              </div>
              <span className="text-lg font-light tracking-wide">GitHub Profile</span>
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/maulik-panchal-260621295" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10, z: 20 }}
              whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0, z: 0 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center gap-4 group hover:text-[var(--color-cyan)] transition-colors w-fit"
            >
              <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center group-hover:border-[var(--color-cyan)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <LinkedinIcon className="w-6 h-6 text-white/70 group-hover:text-[var(--color-cyan)] relative z-10" />
              </div>
              <span className="text-lg font-light tracking-wide">LinkedIn Profile</span>
            </motion.a>

            <motion.a
              href="/MAULIK V PANCHAL.pdf" download="Maulik_Panchal_Resume.pdf"
              whileHover={{ scale: 1.05, rotateX: -10, rotateY: -10, z: 20 }}
              whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0, z: 0 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="flex items-center gap-4 group hover:text-[var(--color-cyan)] transition-colors w-fit"
            >
              <div className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center group-hover:border-[var(--color-cyan)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white/70 group-hover:text-[var(--color-cyan)] relative z-10"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              </div>
              <span className="text-lg font-light tracking-wide">Download Resume</span>
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-full md:w-1/2 glass p-8 md:p-12 rounded-3xl border border-white/10 relative group shadow-2xl"
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-12"
            >
              <div className="w-20 h-20 rounded-full bg-[var(--color-cyan)]/20 flex items-center justify-center mb-6 border border-[var(--color-cyan)]/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-cyan)]"><path d="M20 6 9 17l-5-5" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-white/60">Thank you for reaching out. I'll get back to you soon.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 text-[var(--color-cyan)] hover:underline font-medium"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)] transition-colors peer placeholder-transparent"
                  placeholder="Name"
                />
                <label htmlFor="name" className={`absolute left-0 transition-all duration-300 pointer-events-none ${focused === 'name' ? '-top-5 text-[var(--color-cyan)] text-xs' : 'top-3 text-white/50 text-base peer-focus:-top-5 peer-focus:text-[var(--color-cyan)] peer-focus:text-xs'}`}>
                  Full Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[var(--color-neon-purple)] transition-colors peer placeholder-transparent"
                  placeholder="Email"
                />
                <label htmlFor="email" className={`absolute left-0 transition-all duration-300 pointer-events-none ${focused === 'email' ? '-top-5 text-[var(--color-neon-purple)] text-xs' : 'top-3 text-white/50 text-base peer-focus:-top-5 peer-focus:text-[var(--color-neon-purple)] peer-focus:text-xs'}`}>
                  Email Address
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)] transition-colors peer placeholder-transparent resize-none"
                  placeholder="Message"
                />
                <label htmlFor="message" className={`absolute left-0 transition-all duration-300 pointer-events-none ${focused === 'message' ? '-top-5 text-[var(--color-cyan)] text-xs' : 'top-3 text-white/50 text-base peer-focus:-top-5 peer-focus:text-[var(--color-cyan)] peer-focus:text-xs'}`}>
                  Your Message
                </label>
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={status === "sending" ? {} : { scale: 1.05, rotateX: 15, boxShadow: "0 20px 40px rgba(0,240,255,0.4)" }}
                whileTap={status === "sending" ? {} : { scale: 0.95, rotateX: 0 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="magnetic relative w-full py-4 mt-4 bg-white text-black font-bold rounded-xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500 block" style={{ transform: "translateZ(30px)" }}>
                  {status === "sending" ? "Sending..." : "Send Message"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-electric-blue)] to-[var(--color-neon-purple)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" style={{ transform: "translateZ(-10px)" }} />
              </motion.button>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center mt-2">Something went wrong. Please try again or email me directly.</p>
              )}
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
