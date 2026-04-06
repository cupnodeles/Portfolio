import { motion } from "motion/react";
import { Award, Info, ChevronRight, BrainCircuit, Sparkles, Zap } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Certifications() {
  const certifications = [
    {
      icon: <BrainCircuit className="w-10 h-10" />,
      title: "Building Generative AI-Powered Applications in Java",
      issuer: "TUP Manila / Seminar",
      date: "May 20, 2024",
      color: "#a78bfa",
    },
    {
      icon: <Sparkles className="w-10 h-10" />,
      title: "SynthSphere: Bridging Realms of AI and Humanity",
      issuer: "TUP Manila / Tech Event",
      date: "January 17, 2024",
      color: "#60a5fa",
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "G-TECH SUMMIT 2025: Discover, Learn, Innovate with Google Technologies",
      issuer: "Google Communities / Tech Event",
      date: "February 28, 2025",
      color: "#e879f9",
    },
  ];

  return (
    <section id="certifications" className="relative py-20 px-6">
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
            05. Certifications
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Licenses & <span
              style={{
                background: "linear-gradient(135deg, #c084fc, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >Certifications</span>
          </h2>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              variants={fadeInUp}
              className="p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 block group h-full"
              style={{
                background: "rgba(10, 0, 30, 0.5)",
                border: "1px solid rgba(168, 85, 247, 0.13)",
                boxShadow: "0 0 0 rgba(168, 85, 247, 0.15)",
              }}
              whileHover={{
                boxShadow: `0 0 30px ${cert.color}22`,
                borderColor: `${cert.color}66`,
              }}
            >
              <div className="mb-6 transition-all duration-300 group-hover:scale-110" style={{ color: cert.color }}>
                {cert.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors leading-tight">
                {cert.title}
              </h3>
              <div className="text-purple-400 text-sm mb-1">{cert.issuer}</div>
              <div className="text-gray-500 text-xs">{cert.date}</div>
            </motion.div>
          ))}
        </div>

        {/* Placeholder Note */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          variants={fadeInUp}
          className="flex flex-col items-center gap-4 p-8 rounded-xl max-w-2xl mx-auto text-center"
          style={{
            background: "rgba(168, 85, 247, 0.05)",
            border: "1px solid rgba(168, 85, 247, 0.15)",
          }}
        >
          <Info className="w-8 h-8 text-purple-400" />
          <p className="text-gray-300 leading-relaxed">
            More Certification and Achievements will be updated soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
