import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { ChevronDown, Github, Linkedin, Mail, Instagram, Download } from "lucide-react";

const TYPED_STRINGS = [
  "Data Analyst Intern",
  "4th Year BSCS Student",
  "Python Developer",
  "AI Explorer",
];

function useTypingEffect(strings: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const current = strings[strIdx];

    if (!deleting && charIdx < current.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setStrIdx((s) => (s + 1) % strings.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [charIdx, deleting, strIdx, strings, speed, pause]);

  return displayed;
}

const socialLinks = [
  { icon: Github, href: "https://github.com/cupnodeles", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/kenmontano1/", label: "LinkedIn" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/cupnodeles/" },
  { icon: Mail, href: "mailto:kenmontano098@gmail.com", label: "Email" },
];

export function Hero() {
  const typed = useTypingEffect(TYPED_STRINGS);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      {/* Glowing orb behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(120,40,220,0.18) 0%, rgba(80,20,160,0.08) 50%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/40 bg-purple-900/20 text-purple-300 text-xs mb-6 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          BSCS Student · 4th Year
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl text-white mb-4 tracking-tight"
          style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", fontWeight: 700 }}
        >
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(135deg, #a78bfa, #60a5fa, #e879f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ken Zedrick Montano
          </span>
        </motion.h1>

        {/* Typed text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl md:text-3xl text-cyan-300 mb-6 h-10 flex items-center justify-center gap-1"
          style={{ fontFamily: "monospace" }}
        >
          <span className="text-gray-500">&gt;</span>
          <span>{typed}</span>
          <span className="w-0.5 h-7 bg-cyan-400 animate-pulse ml-0.5" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Turning raw data into cosmic insights. A BSCS student exploring the universe of data —
          from Python scripts to AI-powered systems — one dataset at a time.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3 rounded-full text-white text-sm font-medium relative overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              boxShadow: "0 0 25px rgba(124, 58, 237, 0.5)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <a
            href="/Ken_Montano_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full text-white text-sm font-medium border border-cyan-500/40 bg-cyan-900/10 hover:bg-cyan-800/20 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-10 h-10 rounded-full border border-purple-500/30 bg-purple-900/20 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-400/60 hover:bg-purple-800/30 hover:shadow-[0_0_14px_rgba(168,85,247,0.4)] transition-all duration-300"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-purple-400 transition-colors cursor-pointer"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Floating data particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xs font-mono opacity-20 pointer-events-none select-none hidden md:block"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
            color: i % 2 === 0 ? "#a78bfa" : "#60a5fa",
          }}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          {["df.head()", "sklearn", "np.array", "pandas", "seaborn", "matplotlib"][i]}
        </motion.div>
      ))}
    </section>
  );
}