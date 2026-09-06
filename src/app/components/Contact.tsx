import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Mail, Send, MapPin, Github, Linkedin, Twitter, Instagram, CheckCircle } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/cupnodeles", username: "@cupnodeles" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/kenmontano1/", username: "Ken Zedrick Montano" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/cupnodeles/", username: "@cupnodeles" },
  { icon: Twitter, label: "Twitter / X", href: "https://x.com/Cuppycuppypy", username: "@Cuppycuppypy" },
  { icon: Mail, label: "Email", href: "mailto:kenmontano098@gmail.com", username: "kenmontano098@gmail.com" },
];


export function Contact() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
          const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSent(false), 4000);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl text-sm text-gray-200 outline-none transition-all duration-300 border ${focused === field
      ? "border-purple-500/60 bg-purple-900/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
      : "border-white/10 bg-white/5 hover:border-white/20"
    }`;

  return (
    <section id="contact" className="relative z-10 py-28 px-6 pb-40">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-green-400 text-sm tracking-[0.3em] uppercase font-mono">
            06. Contact
          </span>
          <h2 className="text-4xl md:text-6xl text-white mt-2" style={{ fontWeight: 700 }}>
            Send a{" "}
            <span style={{
              background: "linear-gradient(135deg, #34d399, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Signal
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Whether it's about an opportunity, collaboration, or just a love for data —
            I'm always happy to connect across the galaxy!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Quote */}
            <div
              className="p-6 rounded-2xl border border-purple-900/30"
              style={{ background: "rgba(120,40,200,0.08)", backdropFilter: "blur(8px)" }}
            >
              <p className="text-gray-300 italic text-sm leading-relaxed">
                "In God we trust. All others must bring data."
              </p>
              <p className="text-gray-500 text-xs mt-2">— W. Edwards Deming</p>
            </div>

            {/* Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Philippines · Open to Remote & On-site Opportunities</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>kenmontano098@gmail.com</span>
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              <p className="text-gray-500 text-xs uppercase tracking-widest">Connect with me</p>
              {socialLinks.map(({ icon: Icon, label, href, username }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-purple-500/30 hover:bg-purple-900/10 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg border border-purple-900/40 bg-purple-900/20 flex items-center justify-center group-hover:border-purple-500/50 transition-all">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-gray-300 text-sm" style={{ fontWeight: 500 }}>{label}</div>
                    <div className="text-gray-500 text-xs">{username}</div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-6 rounded-2xl border border-purple-900/30"
              style={{ background: "rgba(10,0,30,0.6)", backdropFilter: "blur(12px)" }}
            >
              {error && (
                <div className="mb-2 p-2 rounded bg-red-900/40 text-red-300 text-xs text-center border border-red-700/30">
                  {error}
                </div>
              )}
              {sent && (
                <div className="mb-2 p-2 rounded bg-green-900/40 text-green-300 text-xs text-center border border-green-700/30">
                  Message sent successfully!
                </div>
              )}
              <h3 className="text-gray-200 mb-2" style={{ fontWeight: 600 }}>
                Send a Message
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Juan Dela Cruz"
                    required
                    className={inputClass("name")}
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="JuanDelaCruz@example.com"
                    required
                    className={inputClass("email")}
                    style={{ background: "rgba(255,255,255,0.04)" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  placeholder="Opportunities / Collaboration / Gaming"
                  className={inputClass("subject")}
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  placeholder="I'd like to know you, let's connect! o kaya laro nalang tayo."
                  required
                  rows={5}
                  className={inputClass("message")}
                  style={{ background: "rgba(255,255,255,0.04)", resize: "none" }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading || sent}
                className="w-full py-3 rounded-xl text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70"
                style={{
                  background: sent
                    ? "linear-gradient(135deg, #059669, #10b981)"
                    : "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  boxShadow: sent
                    ? "0 0 20px rgba(16,185,129,0.4)"
                    : "0 0 20px rgba(124,58,237,0.4)",
                }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Transmitting...
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Signal Received!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
