import { motion } from "motion/react";
import { Clock, Briefcase, GraduationCap } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Experience() {
  return (
    <section id="experience" className="relative py-20 px-6">
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
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            My <span
              style={{
                background: "linear-gradient(135deg, #c084fc, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >Journey</span>
          </h2>
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
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">
                  Bachelor of Science in Computer Science
                </h3>
                <div className="text-lg text-blue-400 font-medium">
                  Technological University of the Philippines - Manila
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <Clock className="w-4 h-4" />
              <span>2022 - 2026</span>
            </div>

            <div className="text-gray-300 leading-relaxed mb-4 space-y-1">
              <p>• <strong className="text-white">General Weighted Average: 1.6</strong></p>
              <p>• Focus on Data Science, Machine Learning, and Artificial Intelligence</p>
              <p>• Specialized coursework in algorithms, data structures, and statistical analysis</p>
              <p>• Completed multiple AI/ML projects including chatbots and computer vision applications</p>
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

          {/* Experience Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={fadeInUp}
            className="mb-8 p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(10, 0, 30, 0.5)",
              border: "1px solid rgba(168, 85, 247, 0.13)",
              boxShadow: "0 0 0 rgba(168, 85, 247, 0.15)",
            }}
            whileHover={{
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.15)",
              borderColor: "rgba(168, 85, 247, 0.4)",
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 p-2 flex shrink-0 items-center justify-center overflow-hidden">
                <img 
                  src="https://framerusercontent.com/images/HJiJzOcNXzZndgXFx20NNG9bZlM.png" 
                  alt="S.P. Madrid Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-1">
                  Data Analyst Intern
                </h3>
                <div className="text-lg text-purple-400 font-medium">
                  S.P. Madrid & Associates Law Firm
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
              <Clock className="w-4 h-4" />
              <span>February 2026 - Present</span>
            </div>

            <div className="text-gray-300 leading-relaxed mb-4 space-y-1">
              <p>• Analyzing legal and operational datasets to identify trends and insights</p>
              <p>• Creating data visualizations and comprehensive reports for stakeholders</p>
              <p>• Applying statistical methods to support data-driven decision making</p>
              <p>• Collaborating with legal professionals to optimize firm operations through data analysis</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Data Analysis", "Python", "SQL", "Excel", "Data Visualization"].map((skill) => (
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

          {/* Note */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            variants={fadeInUp}
            className="flex items-start gap-4 p-6 rounded-xl"
            style={{
              background: "rgba(34, 211, 238, 0.05)",
              border: "1px solid rgba(34, 211, 238, 0.2)",
            }}
          >
            <svg
              className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <p className="text-gray-300 leading-relaxed">
              Actively seeking additional <strong className="text-cyan-400">Data Analyst Internship</strong> opportunities to expand my skills and contribute to impactful data-driven projects.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
