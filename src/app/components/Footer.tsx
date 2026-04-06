import { Orbit } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-purple-900/20 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo — same as navbar */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Orbit className="w-5 h-5 text-purple-400" />
            <div className="absolute inset-0 blur-sm rounded-full bg-purple-500 opacity-30" />
          </div>
          <span
            className="text-gray-400 tracking-widest text-sm"
            style={{ fontFamily: "monospace" }}
          >
            <span className="text-purple-400">&lt;</span>
            DataVerse
            <span className="text-purple-400">/&gt;</span>
          </span>
        </div>

        {/* Center copyright */}
        <div className="text-gray-600 text-xs font-mono text-center">
          © 2026 · Ken Zedrick Montano · BSCS 4th Year · Data Analyst Intern
        </div>

        {/* Scroll to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xs text-gray-500 hover:text-purple-400 transition-colors flex items-center gap-1"
        >
          Back to orbit ↑
        </button>
      </div>
    </footer>
  );
}
