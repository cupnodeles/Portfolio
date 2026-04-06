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

        {/* Divider */}
        <div className="w-full h-px mx-auto max-w-4xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)" }} />

        <About />

        <div className="w-full h-px mx-auto max-w-4xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.4), transparent)" }} />

        <Skills />

        <div className="w-full h-px mx-auto max-w-4xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(232,121,249,0.4), transparent)" }} />

        <Experience />

        <div className="w-full h-px mx-auto max-w-4xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)" }} />

        <Projects />

        <div className="w-full h-px mx-auto max-w-4xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)" }} />

        <Certifications />

        <div className="w-full h-px mx-auto max-w-4xl"
          style={{ background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.4), transparent)" }} />

        <Contact />
      </main>

      <Footer />

      {/* Cursor glow effect */}
      <style>{`
        html { scroll-behavior: smooth; }
        
        * { box-sizing: border-box; }

        body {
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #030010;
        }
        ::-webkit-scrollbar-thumb {
          background: #4c1d95;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #7c3aed;
        }

        ::selection {
          background: rgba(124, 58, 237, 0.4);
          color: #fff;
        }
      `}</style>
    </div>
  );
}