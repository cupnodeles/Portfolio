import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Github, ChevronRight, MessageSquare, QrCode, Monitor, Database, Globe, Camera } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "PCHSBOT",
    subtitle: "Senior High School AI Chatbot",
    description:
      "An AI-powered chatbot designed specifically for senior high school students. PCHSBOT answers queries about school information, schedules, and student concerns — built using Google's Gemini model through Google AI Studio.",
    tags: ["Python", "Gemini API", "Google AI Studio", "JavaScript"],
    color: "#a78bfa",
    icon: <MessageSquare className="w-6 h-6" />,
    type: "AI / Chatbot",
    highlights: [
      "Gemini-powered NLP",
      "SHS-focused knowledge base",
      "Multi-turn conversations",
    ],
    featured: true,
    github: "https://github.com/cupnodeles",
  },
  {
    id: 2,
    title: "Philippine Mangifera AI Detection",
    subtitle: "AI Mango Classification System",
    description:
      "A group-based AI vision project that classifies Philippine mangoes — detecting whether a mango is fresh, rotten, and identifying the variety. Trained a custom CNN model using YOLOv8 with a carefully collected and cleaned dataset via Roboflow.",
    tags: ["YOLOv8", "Python", "CNN", "Roboflow", "Google Colab", "Jupyter"],
    color: "#f59e0b",
    icon: <Camera className="w-6 h-6" />,
    type: "Computer Vision · Group Project",
    highlights: [
      "Custom dataset collection",
      "YOLOv8 object detection",
      "Fresh / Rotten / Type classification",
    ],
    featured: true,
    github: "https://github.com/cupnodeles",
  },
  {
    id: 3,
    title: "GuestGo AI",
    subtitle: "QR Code-Based Guest Management System",
    description:
      "A smart guest management system that leverages QR code scanning and a Face Verification system for secure, seamless guest check-ins. Built with a full web stack integrating YOLO-Face for biometric verification and Supabase as the backend.",
    tags: ["HTML", "CSS", "PHP", "JavaScript", "SQL", "YOLO-Face", "Flask", "Tailwind CSS", "Supabase"],
    color: "#34d399",
    icon: <QrCode className="w-6 h-6" />,
    type: "Full Stack · AI Integration",
    highlights: [
      "QR Code check-in system",
      "YOLO-Face verification",
      "Supabase real-time backend",
    ],
    featured: true,
    github: "https://github.com/cupnodeles",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.15, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border transition-all duration-400 overflow-hidden group cursor-default flex flex-col"
      style={{
        borderColor: hovered ? project.color + "66" : project.color + "28",
        background: hovered
          ? `linear-gradient(145deg, ${project.color}10, rgba(10,0,30,0.95))`
          : "rgba(10,0,30,0.75)",
        boxShadow: hovered ? `0 0 50px ${project.color}28` : "none",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Top glow bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.color}90, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Side accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(to bottom, ${project.color}, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      <div className="p-7 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
              style={{
                background: project.color + "18",
                border: `1px solid ${project.color}33`,
                boxShadow: hovered ? `0 0 18px ${project.color}33` : "none",
                color: project.color,
              }}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="text-white text-base" style={{ fontWeight: 700 }}>
                {project.title}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: project.color }}>
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Type badge */}
        <div className="mb-3">
          <span
            className="inline-block px-2.5 py-1 rounded-full text-[10px] tracking-wide"
            style={{ background: project.color + "18", color: project.color }}
          >
            {project.type}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="space-y-1.5 mb-5 font-mono">
          {project.highlights.map((h) => (
            <div key={h} className="flex items-center gap-2 text-[10px] text-gray-500">
              <div
                className="w-1 h-1 rounded-full shrink-0"
                style={{ background: project.color, boxShadow: `0 0 4px ${project.color}` }}
              />
              {h}
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[11px] text-gray-400 border border-white/8 bg-white/3"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View link */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1 text-xs"
          style={{ color: project.color }}
        >
          View Project <ChevronRight className="w-3 h-3" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="projects" className="relative z-10 py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-pink-400 text-sm tracking-[0.3em] uppercase font-mono">
            04. Projects
          </span>
          <h2
            className="text-4xl md:text-6xl text-white mt-2"
            style={{ fontWeight: 700 }}
          >
            Data{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #e879f9, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Constellations
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Real-world projects built with AI, data, and a passion for solving problems.
          </p>
        </motion.div>

        {/* Project grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/cupnodeles"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm text-gray-400 border border-white/10 hover:border-purple-500/40 hover:text-white hover:bg-purple-900/20 transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            See All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
