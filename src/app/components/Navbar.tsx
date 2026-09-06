import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about", number: "01" },
  { label: "Skills", href: "#skills", number: "02" },
  { label: "Experience", href: "#experience", number: "03" },
  { label: "Projects", href: "#projects", number: "04" },
  { label: "Certifications", href: "#certifications", number: "05" },
  { label: "Contact", href: "#contact", number: "06" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["about", "skills", "experience", "projects", "certifications", "contact"];
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 200) {
          const label = s.charAt(0).toUpperCase() + s.slice(1);
          setActive(label);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(5,0,20,0.85)] backdrop-blur-xl border-b border-purple-900/30 shadow-[0_0_30px_rgba(120,40,200,0.15)]"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-purple-400 rounded-lg"
          aria-label="Back to top — Ken Montano"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white border border-purple-500/50 bg-purple-700/30 group-hover:bg-purple-600/40 transition-colors"
            style={{ fontFamily: "monospace" }}
          >
            KM
          </div>
          <span
            className="text-white tracking-wide text-sm"
            style={{ fontFamily: "monospace" }}
          >
            Ken Montano
            <span className="text-purple-400"> · Data</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={`relative px-4 py-2 text-sm transition-all duration-300 rounded-full ${
                active === link.label
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {active === link.label && (
                <motion.div
                  layoutId="navpill"
                  className="absolute inset-0 rounded-full bg-purple-600/30 border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollTo("#contact")}
            className="px-5 py-2 rounded-full text-sm text-white border border-purple-500/60 bg-purple-700/20 hover:bg-purple-600/40 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] focus-visible:outline-2 focus-visible:outline-purple-300 focus-visible:outline-offset-2 transition-all duration-300"
          >
            Hire Me ✦
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-white p-2 -m-2 focus-visible:outline-2 focus-visible:outline-purple-400 rounded-lg"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[68px] left-0 right-0 z-40 bg-[rgba(5,0,25,0.95)] backdrop-blur-xl border-b border-purple-900/40 px-6 py-4 flex flex-col gap-2 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={`text-left px-4 py-3 rounded-xl text-sm transition-all ${
                  active === link.label
                    ? "text-purple-300 bg-purple-800/30 border border-purple-600/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}