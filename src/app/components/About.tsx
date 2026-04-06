import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import profilePic from "./Pic/kennn.jpg";

const facts = [
  { icon: GraduationCap, label: "Degree", value: "BS Computer Science" },
  { icon: Calendar, label: "Year", value: "4th Year Student" },
  { icon: MapPin, label: "Location", value: "Philippines" },
  { icon: User, label: "Position", value: "Data Analyst Intern" },
];

const timeline = [
  {
    year: "2022",
    title: "Started BSCS Course at TUP-Manila",
    desc: "Began my college journey into Computer Science — discovering the foundations of programming and problem solving.",
    color: "#a78bfa",
  },
  {
    year: "2023",
    title: "Core Programming Languages",
    desc: "Learned and applied C++, C#, Python, Java, and JavaScript through course subjects and personal activities.",
    color: "#60a5fa",
  },
  {
    year: "2024",
    title: "Data Structures & Algorithms",
    desc: "Deep-dived into DSA, strengthening my analytical thinking and computational problem-solving skills.",
    color: "#e879f9",
  },
  {
    year: "2025",
    title: "Machine Learning & AI",
    desc: "Explored Machine Learning and Artificial Intelligence — building models, training datasets, and understanding AI systems.",
    color: "#34d399",
  },
  {
    year: "2026",
    title: "Applying AI to Create",
    desc: "Currently applying my accumulated knowledge using AI to build real-world projects and intelligent systems.",
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
    <section id="about" className="relative z-10 pt-40 pb-28 px-6">
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
              The{" "}
              <span style={{
                background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Explorer
              </span>{" "}
              Behind the Data
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
              <p className="text-gray-300 leading-relaxed">
                Hey there! I'm <span className="text-purple-300 font-medium">Ken Zedrick Montano</span>, a
                4th-year BSCS student with a burning passion for Data and AI. I believe every dataset
                tells a story that's waiting to be discovered — and I'm the one who listens.
              </p>
              <p className="text-gray-400 leading-relaxed">
                From writing my first C++ program where it was relatively hard for me to understand with no foundation in coding
                to building AI-powered systems, my journey has beena constant evolution. I love how the combination of data, logic, and creativity
                turns raw numbers into meaningful insights and intelligent applications.
              </p>
              <p className="text-gray-400 leading-relaxed">
                When I'm not deep in code or datasets, you'll find me exploring the latest in AI research
                , stargazing, or just playing games.
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
                      <div className="text-xs text-gray-500">{label}</div>
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
            My Journey Through the{" "}
            <span style={{
              background: "linear-gradient(135deg, #a78bfa, #e879f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Data Universe
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
                      <div className="text-gray-400 text-sm">{item.desc}</div>
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