import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { BarChart3, Code2, Binary, BrainCircuit } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

// Max years = 3 (Excel). Bar width is proportional.
const MAX_YEARS = 3;

const skillCategories = [
  {
    title: "Data & Analysis",
    icon: BarChart3,
    color: "#a78bfa",
    skills: [
      { name: "Python", years: 2.5 },
      { name: "Pandas", years: 1 },
      { name: "Excel", years: 3 },
      { name: "SQL", years: 1 },
    ],
  },
  {
    title: "Programming",
    icon: Code2,
    color: "#60a5fa",
    skills: [
      { name: "C++", years: 1 },
      { name: "C#", years: 1 },
      { name: "JavaScript", years: 1 },
      { name: "Java", years: 1 },
    ],
  },
  {
    title: "Math & Theory",
    icon: Binary,
    color: "#e879f9",
    skills: [
      { name: "Algorithms & DS", years: 2 },
      { name: "Statistics", years: 2 },
      { name: "Linear Algebra", years: 1 },
      { name: "Git / GitHub", years: 1 },
    ],
  },
  {
    title: "ML & AI",
    icon: BrainCircuit,
    color: "#34d399",
    skills: [
      { name: "TensorFlow", years: 1 },
      { name: "AI", years: 2 },
    ],
  },
];

const radarData = [
  { subject: "Python", A: 83 },
  { subject: "Excel", A: 86 },
  { subject: "Visualization", A: 60 },
  { subject: "AI", A: 90 },
  { subject: "ML", A: 67 },
  { subject: "Analyzation", A: 87 },
];

const tools = [
  { name: "Python", slug: "logos:python", color: "3776ab" },
  { name: "MySQL", slug: "logos:mysql", color: "4479a1" },
  { name: "Pandas", slug: "logos:pandas-icon", color: "150458" },
  { name: "NumPy", slug: "logos:numpy", color: "013243" },
  { name: "TensorFlow", slug: "logos:tensorflow", color: "ff6f00" },
  { name: "Matplotlib", slug: "logos:matplotlib-icon", color: "11557c" },
  { name: "Plotly", slug: "simple-icons:plotly", color: "3f4f75" },
  { name: "VS Code", slug: "logos:visual-studio-code", color: "007acc" },
  { name: "Git", slug: "logos:git-icon", color: "f05032" },
  { name: "GitHub", slug: "simple-icons:github", color: "ffffff" },
  { name: "Google Colab", slug: "simple-icons:googlecolab", color: "f9ab00" },
  { name: "Excel", slug: "simple-icons:microsoftexcel", color: "217346" },
  { name: "C", slug: "logos:c", color: "a8b9cc" },
  { name: "C++", slug: "logos:c-plusplus", color: "00599c" },
  { name: "JS", slug: "logos:javascript", color: "f7df1e" },
  { name: "Java", slug: "logos:java", color: "007396" },
  { name: "Gemini", slug: "simple-icons:googlegemini", color: "8e75ff" },
  { name: "ChatGPT", slug: "logos:openai-icon", color: "412991" },
  { name: "Claude", slug: "simple-icons:claude", color: "d97757" },
];

function YearBar({
  name,
  years,
  color,
  delay,
}: {
  name: string;
  years: number;
  color: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const pct = (years / MAX_YEARS) * 100;

  const label =
    years === 1
      ? "1 yr"
      : years % 1 !== 0
        ? `${years} yrs`
        : `${years} yrs`;

  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-300 text-sm">{name}</span>
        <span
          className="text-xs font-mono px-2 py-0.5 rounded-full"
          style={{ color, background: color + "18" }}
        >
          {label}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}70, ${color})`,
            boxShadow: `0 0 8px ${color}55`,
          }}
        />
      </div>
    </div>
  );
}

function CategoryCard({
  cat,
  delay,
}: {
  cat: any;
  delay: number;
}) {
  const Icon = cat.icon;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-6 rounded-2xl border transition-all duration-300 cursor-default"
      style={{
        borderColor: hovered ? cat.color + "55" : cat.color + "22",
        background: hovered ? cat.color + "0d" : "rgba(10,0,30,0.5)",
        boxShadow: hovered ? `0 0 30px ${cat.color}22` : "none",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <Icon className="w-6 h-6" style={{ color: cat.color }} />
        <h3 className="text-gray-100" style={{ fontWeight: 600 }}>
          {cat.title}
        </h3>
      </div>
      {cat.skills.map((skill: any, i: number) => (
        <YearBar
          key={skill.name}
          name={skill.name}
          years={skill.years}
          color={cat.color}
          delay={delay + i * 0.12}
        />
      ))}
    </motion.div>
  );
}

export function Skills() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="relative z-10 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm tracking-[0.3em] uppercase font-mono">
            02. Skills
          </span>
          <h2
            className="text-4xl md:text-6xl text-white mt-2"
            style={{ fontWeight: 700 }}
          >
            My{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa, #e879f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Cosmic Toolkit
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Skills measured by years of experience — the longer the bar, the deeper the orbit.
          </p>
        </motion.div>

        {/* Skill cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {skillCategories.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} delay={i * 0.1} />
          ))}
        </div>

        {/* Year legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 mb-16 text-xs text-gray-500 font-mono"
        >
          {[1, 2, 3].map((yr) => (
            <div key={yr} className="flex items-center gap-2">
              <div
                className="w-6 h-1.5 rounded-full"
                style={{
                  background: `linear-gradient(90deg, #a78bfa70, #a78bfa)`,
                  width: `${(yr / MAX_YEARS) * 48}px`,
                }}
              />
              <span>{yr} yr{yr > 1 ? "s" : ""}</span>
            </div>
          ))}
        </motion.div>

        {/* Radar Chart + What sets me apart */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-6 rounded-2xl border border-purple-900/30 bg-purple-900/5 backdrop-blur-sm"
          >
            <h3
              className="text-center text-gray-300 mb-1 text-sm"
              style={{ fontWeight: 600 }}
            >
              Skill Radar
            </h3>
            <p className="text-center text-gray-600 text-xs mb-4 font-mono">
              Proficiency %
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData} cx="50%" cy="50%">
                <PolarGrid
                  gridType="polygon"
                  stroke="rgba(168,85,247,0.2)"
                />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#9ca3af", fontSize: 11 }}
                />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="#a78bfa"
                  fill="#a78bfa"
                  fillOpacity={0.25}
                  strokeWidth={2}
                  dot={(props: any) => {
                    const { cx, cy, fill, index } = props;
                    return (
                      <circle
                        key={`dot-${index}`}
                        cx={cx}
                        cy={cy}
                        r={4}
                        fill={fill || "#a78bfa"}
                        stroke="#fff"
                        strokeWidth={1}
                        style={{ filter: "drop-shadow(0 0 4px #a78bfa)" }}
                      />
                    );
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,0,30,0.95)",
                    border: "1px solid #a78bfa44",
                    borderRadius: 8,
                    color: "#e2e8f0",
                    fontSize: 12,
                  }}
                  formatter={(v) => [`${v}%`, "Proficiency"]}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            <h3 className="text-gray-200 mb-4" style={{ fontWeight: 600 }}>
              What sets me apart
            </h3>
            {[
              {
                label: "Problem Solving",
                value: "Strong analytical mindset with a data-driven approach to every challenge",
                icon: "🧩",
              },
              {
                label: "Communication",
                value: "Translating complex insights into clear, understandable language",
                icon: "💬",
              },
              {
                label: "Continuous Learning",
                value: "Always exploring the latest in AI/ML research and tech trends",
                icon: "📚",
              },
              {
                label: "Collaboration",
                value: "A solid team player with hands-on experience in group projects and academic collaborations",
                icon: "🤝",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/3 hover:border-purple-500/30 hover:bg-purple-900/10 transition-all duration-300"
              >
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div
                    className="text-gray-200 text-sm"
                    style={{ fontWeight: 600 }}
                  >
                    {item.label}
                  </div>
                  <div className="text-gray-400 text-xs mt-0.5">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Tools marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm mb-8 tracking-widest uppercase font-mono">
            Tools and Technologies
          </p>
          
          <div className="overflow-hidden relative">
            <motion.div
              animate={{ x: [0, "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-8 items-center w-fit"
            >
              {[...tools, ...tools].map((tool: any, i: number) => (
                <div
                  key={`${tool.name}-${i}`}
                  className="flex flex-col items-center gap-2 group shrink-0"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-2.5 transition-all duration-300 group-hover:border-purple-500/40 group-hover:bg-purple-500/10 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <img
                      src={`https://api.iconify.design/${tool.slug.includes(':') ? tool.slug : `simple-icons:${tool.slug}`}.svg?color=%23${tool.color}`}
                      alt={tool.name}
                      onError={(e) => {
                        // Fallback to simpler slug or text if specific set fails
                        (e.target as HTMLImageElement).src = `https://api.iconify.design/lucide:box.svg?color=%23666`;
                      }}
                      className="w-full h-full object-contain filter brightness-100 group-hover:brightness-125 transition-all"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-gray-500 group-hover:text-purple-300 transition-colors">
                    {tool.name}
                  </span>
                </div>
              ))}
            </motion.div>
            
            {/* Fade overlays */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030010] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030010] to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}