import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { GraduationCap, MapPin, BadgeCheck, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import profilePic from "./Pic/kennn.jpg";

const facts = [
  { icon: GraduationCap, label: "Degree", value: "BS Computer Science" },
  { icon: BadgeCheck, label: "Status", value: "Graduate · Class of 2026" },
  { icon: MapPin, label: "Location", value: "Philippines" },
  { icon: User, label: "Position", value: "Data Analyst" },
];

const timeline = [
  {
    year: "2022",
    title: "Started BSCS at TUP-Manila",
    desc: "Built foundations in programming and problem solving, starting from zero coding background.",
    color: "#a78bfa",
  },
  {
    year: "2023",
    title: "Shipped Course Projects",
    desc: "Applied Python, SQL, and core languages across 5+ academic and personal projects.",
    color: "#60a5fa",
  },
  {
    year: "2024",
    title: "Data Structures & Analytics",
    desc: "Strengthened analytical thinking with DSA, statistics, and data cleaning workflows.",
    color: "#e879f9",
  },
  {
    year: "2025",
    title: "Machine Learning & AI Builds",
    desc: "Built chatbots and vision prototypes with Gemini, YOLOv8, and Flask.",
    color: "#34d399",
  },
  {
    year: "2026",
    title: "Graduated + Hired as Data Analyst",
    desc: "Graduated BSCS from TUP-Manila, completed Data Analyst internship (Feb–May), and got accepted as full-time Data Analyst at S.P. Madrid & Associates in June. Placed 4th at TICP x Kiro Hackathon with CareerFlow.",
    color: "#f97316",
  },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="about" className="relative z-10 pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-16">
                <span className="text-purple-400 text-sm tracking-[0.3em] uppercase font-mono">
              01. About Me
            </span>
            <h2
              className="text-4xl md:text-6xl text-white mt-2"
              style={{ fontWeight: 700 }}
            >
              Data Analyst{" "}
              <span style={{
                background: "linear-gradient(135deg, #c084fc, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Behind the Data
              </span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Photo side */}
          <FadeIn delay={0.1}>
            <div className="flex justify-center">
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-2xl blur-xl opacity-60"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #0ea5e9, #e879f9)" }} />
                <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden border border-purple-500/30"
                  style={{ background: "rgba(10,0,30,0.8)" }}>
                  <ImageWithFallback
                    src={profilePic}
                    alt="Ken Zedrick Montano"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top, rgba(5,0,25,0.7) 0%, transparent 50%)" }} />
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl border border-cyan-500/40 backdrop-blur-md text-xs font-mono text-cyan-300"
                  style={{ background: "rgba(5,0,25,0.9)" }}
                >
                  <span className="text-purple-400">const</span> passion ={" "}
                  <span className="text-green-400">"data"</span>;
                </motion.div>
              </div>
            </div>
          </FadeIn>

          {/* Text side */}
          <FadeIn delay={0.2}>
            <div className="space-y-6">
              <p className="text-gray-200 leading-relaxed">
                Hey there! I'm <span className="text-purple-300 font-medium">Ken Zedrick Montano</span>, a
                BSCS graduate (TUP-Manila, Class of 2026) working as a Data Analyst. I turn messy operational
                data into clean reports, dashboards, and automation that teams actually use.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I started with no coding background and worked up through C++, Python, SQL, and AI-assisted
                development. Now I focus on Excel automation, data cleaning, and stakeholder-ready insights —
                combining data, logic, and clear communication.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Interests: AI research, data visualization, and open source.
              </p>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-purple-900/40 bg-purple-900/10 hover:border-purple-500/40 hover:bg-purple-900/20 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4 text-purple-400 shrink-0" />
                    <div>
                      <div className="text-xs text-gray-400">{label}</div>
                      <div className="text-sm text-gray-200">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Timeline */}
        <FadeIn delay={0.1}>
          <h3 className="text-center text-xl text-gray-300 mb-10" style={{ fontWeight: 600 }}>
            My Journey From{" "}
            <span style={{
              background: "linear-gradient(135deg, #c084fc, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Classroom to Production
            </span>
          </h3>
        </FadeIn>

        <div className="relative">
          {/* Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600/60 via-cyan-500/40 to-transparent hidden md:block" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.1}>
                <div className={`flex flex-col md:flex-row gap-4 md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Content */}
                  <div className="md:w-1/2 flex">
                    <div
                      className={`p-5 rounded-2xl border border-opacity-30 bg-opacity-10 hover:scale-[1.02] transition-transform duration-300 cursor-default w-full ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"
                        }`}
                      style={{
                        borderColor: item.color + "44",
                        background: item.color + "0a",
                        boxShadow: `0 0 20px ${item.color}15`,
                      }}
                    >
                      <div className="text-xs font-mono mb-1" style={{ color: item.color }}>
                        {item.year}
                      </div>
                      <div className="text-gray-100 mb-1" style={{ fontWeight: 600 }}>
                        {item.title}
                      </div>
                      <div className="text-gray-300 text-sm">{item.desc}</div>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex w-0 relative justify-center">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 z-10"
                      style={{
                        borderColor: item.color,
                        background: "#0a0020",
                        boxShadow: `0 0 12px ${item.color}`,
                      }}
                    />
                  </div>

                  {/* Empty side */}
                  <div className="md:w-1/2" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}