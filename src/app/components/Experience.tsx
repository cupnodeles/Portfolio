import { motion } from "motion/react";
import { Clock, Briefcase, GraduationCap, TrendingUp } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const experiences = [
  {
    title: "Data Analyst",
    company: "S.P. Madrid & Associates Law Firm",
    period: "June 2026 - Present",
    current: true,
    logo: "https://framerusercontent.com/images/HJiJzOcNXzZndgXFx20NNG9bZlM.png",
    bullets: [
      "Own analysis of operational datasets with Python, SQL, and Excel to surface trends for legal teams",
      "Build automated dashboards and stakeholder-ready weekly reports (replace manual copy-paste — add hrs saved)",
      "Maintain the Internship Automation Hubs for cleaning, templating, and week-based outputs",
      "Promoted from Feb–May internship in June — now the go-to data partner for operations",
    ],
    skills: ["Data Analysis", "Python", "SQL", "Excel", "Streamlit", "Reporting"],
  },
  {
    title: "Data Analyst Intern",
    company: "S.P. Madrid & Associates Law Firm",
    period: "February 2026 - May 2026",
    current: false,
    logo: "https://framerusercontent.com/images/HJiJzOcNXzZndgXFx20NNG9bZlM.png",
    bullets: [
      "Cleaned and analyzed operational datasets to support weekly reporting",
      "Built data visualizations and stakeholder-ready reports with Python and Excel",
      "Shipped Internship Automation Hubs (Streamlit) to streamline repetitive Excel work",
      "Partnered with operations staff to improve reporting accuracy and turnaround",
    ],
    skills: ["Data Analysis", "Python", "SQL", "Excel", "Streamlit"],
  },
];

function ExperienceCard({ job, index }: { job: (typeof experiences)[0]; index: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      variants={fadeInUp}
      className="relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
      style={{
        background: job.current ? "rgba(20, 5, 45, 0.65)" : "rgba(10, 0, 30, 0.5)",
        border: job.current
          ? "1px solid rgba(52, 211, 153, 0.35)"
          : "1px solid rgba(168, 85, 247, 0.13)",
        boxShadow: "0 0 0 rgba(168, 85, 247, 0.15)",
      }}
      whileHover={{
        boxShadow: job.current
          ? "0 0 30px rgba(52, 211, 153, 0.18)"
          : "0 0 30px rgba(168, 85, 247, 0.15)",
        borderColor: job.current ? "rgba(52, 211, 153, 0.55)" : "rgba(168, 85, 247, 0.4)",
      }}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 p-2 flex shrink-0 items-center justify-center overflow-hidden">
          <img
            src={job.logo}
            alt="S.P. Madrid Logo"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-xl md:text-2xl font-semibold text-white">
              {job.title}
            </h3>
            {job.current && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-emerald-300 border border-emerald-500/40 bg-emerald-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Current
              </span>
            )}
          </div>
          <div className={`text-lg font-medium ${job.current ? "text-emerald-300" : "text-purple-400"}`}>
            {job.company}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
        <Clock className="w-4 h-4" />
        <span>{job.period}</span>
      </div>

      <div className="text-gray-300 leading-relaxed mb-4 space-y-1">
        {job.bullets.map((b) => (
          <p key={b}>• {b}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <motion.span
            key={skill}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)",
              borderColor: "rgba(168, 85, 247, 0.6)",
              backgroundColor: "rgba(168, 85, 247, 0.2)"
            }}
            className="px-3 py-1.5 text-xs font-medium rounded-full text-purple-300 border border-purple-500/30 bg-purple-500/10 cursor-default transition-colors duration-300"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-purple-400 text-sm tracking-[0.3em] uppercase font-mono">
            03. Education & Experience
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mt-2">
            My <span
              style={{
                background: "linear-gradient(135deg, #c084fc, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >Journey</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            From classroom to full-time impact — promoted from intern to Data Analyst at the same firm.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Education Subsection */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            variants={fadeInUp}
            className="flex items-center gap-4 mb-6 pb-3 border-b-2"
            style={{ borderColor: "rgba(168, 85, 247, 0.2)" }}
          >
            <GraduationCap className="w-7 h-7 text-purple-400" />
            <h3
              className="text-2xl font-semibold"
              style={{
                background: "linear-gradient(135deg, #c084fc, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Education
            </h3>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            variants={fadeInUp}
            className="mb-12 p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(10, 0, 30, 0.5)",
              border: "1px solid rgba(96, 165, 250, 0.2)",
              boxShadow: "0 0 0 rgba(96, 165, 250, 0.15)",
            }}
            whileHover={{
              boxShadow: "0 0 30px rgba(96, 165, 250, 0.15)",
              borderColor: "rgba(96, 165, 250, 0.5)",
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 p-2 flex shrink-0 items-center justify-center overflow-hidden">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Technological_University_of_the_Philippines_Seal.svg/1280px-Technological_University_of_the_Philippines_Seal.svg.png"
                  alt="TUP Manila Logo"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-xl md:text-2xl font-semibold text-white">
                    Bachelor of Science in Computer Science
                  </h3>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium text-blue-300 border border-blue-500/40 bg-blue-500/10">
                    Graduated 2026
                  </span>
                </div>
                <div className="text-lg text-blue-400 font-medium">
                  Technological University of the Philippines - Manila
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <Clock className="w-4 h-4" />
              <span>2022 - 2026 · Completed</span>
            </div>

            <div className="text-gray-300 leading-relaxed mb-4 space-y-1">
              <p>• <strong className="text-white">GWA 1.6 (PH scale, 1.0 highest)</strong> — BSCS, TUP-Manila</p>
              <p>• Focus: Data Science, Machine Learning, and AI-assisted development</p>
              <p>• Coursework in algorithms, data structures, and statistics</p>
              <p>• Shipped chatbots, vision prototypes, and automation tools</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Data Science", "Machine Learning", "Algorithms", "Statistics", "Programming"].map((skill) => (
                <motion.span
                  key={skill}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(168, 85, 247, 0.4)",
                    borderColor: "rgba(168, 85, 247, 0.6)",
                    backgroundColor: "rgba(168, 85, 247, 0.2)"
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-full text-purple-300 border border-purple-500/30 bg-purple-500/10 cursor-default transition-colors duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Professional Experience Subsection */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            variants={fadeInUp}
            className="flex items-center gap-4 mb-6 pb-3 border-b-2"
            style={{ borderColor: "rgba(168, 85, 247, 0.2)" }}
          >
            <Briefcase className="w-7 h-7 text-purple-400" />
            <h3
              className="text-2xl font-semibold"
              style={{
                background: "linear-gradient(135deg, #c084fc, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Professional Experience
            </h3>
          </motion.div>

          {/* Experience Cards with promotion connector */}
          <div className="relative">
            <div className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/50 via-purple-500/30 to-transparent hidden sm:block" aria-hidden="true" />
            <div className="space-y-6">
              {experiences.map((job, i) => (
                <div key={job.title + job.period} className="relative">
                  <ExperienceCard job={job} index={i} />
                  {i === 0 && (
                    <div className="flex items-center gap-2 mt-6 mb-0 ml-1 text-xs font-mono text-emerald-300/90">
                      <TrendingUp className="w-4 h-4" />
                      <span>Promoted in June 2026 — same team, bigger ownership</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            variants={fadeInUp}
            className="flex items-start gap-4 p-6 rounded-xl mt-8"
            style={{
              background: "rgba(52, 211, 153, 0.06)",
              border: "1px solid rgba(52, 211, 153, 0.22)",
            }}
          >
            <svg
              className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <p className="text-gray-300 leading-relaxed">
              Currently working as a <strong className="text-emerald-300">Data Analyst at S.P. Madrid & Associates</strong> — open to collaborations and challenging data problems that create real impact.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
