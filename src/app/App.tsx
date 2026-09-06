import { StarField } from "./components/StarField";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function SectionDivider({ color }: { color: string }) {
  return (
    <div
      className="w-full h-px mx-auto max-w-4xl"
      aria-hidden="true"
      style={{ background: `linear-gradient(90deg, transparent, rgba(${color},0.4), transparent)` }}
    />
  );
}

export default function App() {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#030010" }}
    >
      {/* Animated galaxy background */}
      <StarField />

      {/* Global background glow layers */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* Top-left purple nebula */}
        <div
          className="absolute"
          style={{
            top: "-10%",
            left: "-10%",
            width: "60%",
            height: "60%",
            background:
              "radial-gradient(ellipse, rgba(88,28,235,0.12) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        {/* Bottom-right cyan nebula */}
        <div
          className="absolute"
          style={{
            bottom: "-10%",
            right: "-10%",
            width: "55%",
            height: "55%",
            background:
              "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        {/* Center pink nebula */}
        <div
          className="absolute"
          style={{
            top: "40%",
            left: "30%",
            width: "40%",
            height: "40%",
            background:
              "radial-gradient(ellipse, rgba(232,121,249,0.06) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative" style={{ zIndex: 1 }}>
        <Hero />

        <SectionDivider color="168,85,247" />

        <About />

        <SectionDivider color="96,165,250" />

        <Skills />

        <SectionDivider color="232,121,249" />

        <Experience />

        <SectionDivider color="52,211,153" />

        <Projects />

        <SectionDivider color="232,121,249" />

        <Certifications />

        <SectionDivider color="96,165,250" />

        <Contact />
      </main>

      <Footer />

      {/* Global styles */}
      <style>{`
        html { scroll-behavior: smooth; }

        * { box-sizing: border-box; }

        body {
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        section[id] { scroll-margin-top: 72px; }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #030010;
        }
        ::-webkit-scrollbar-thumb {
          background: #4c1d95;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #7c3aed;
        }

        ::selection {
          background: rgba(124, 58, 237, 0.4);
          color: #fff;
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}