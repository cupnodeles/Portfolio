import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-purple-900/20 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white border border-purple-500/50 bg-purple-700/30"
            style={{ fontFamily: "monospace" }}
          >
            KM
          </div>
          <span
            className="text-gray-400 tracking-wide text-sm"
            style={{ fontFamily: "monospace" }}
          >
            Ken Montano
            <span className="text-purple-400"> · Data</span>
          </span>
        </div>

        {/* Center copyright */}
        <div className="text-gray-400 text-xs font-mono text-center">
          © 2026 · Ken Zedrick Montano · BSCS Graduate 2026 · Data Analyst
        </div>

        {/* Scroll to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xs text-gray-400 hover:text-purple-300 focus-visible:text-purple-300 focus-visible:outline-2 focus-visible:outline-purple-400 rounded transition-colors flex items-center gap-1.5"
        >
          Back to top <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
