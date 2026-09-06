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

// Contact delivery via Formspree (works on static hosts like Vercel — no backend needed).
// Rotate the form endpoint here if you ever recreate the Formspree form.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqpkdpnn";

// Soft anti-spam cap: max 3 successful sends per browser per rolling 24h.
// NOTE: enforced via localStorage, so this is per-browser (not true per-IP) and
// bypassable via incognito/clear-storage. Formspree's own spam filter is the real backstop.
const MAX_SENDS = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "km-contact-sends-v1";
const LIMIT_MESSAGE =
  "You've reached the message limit (3 per day) — please email me directly at kenmontano098@gmail.com.";

function readSends(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const now = Date.now();
    return parsed.filter((t): t is number => typeof t === "number" && now - t < WINDOW_MS);
  } catch {
    return [];
  }
}

function canSend(): boolean {
  return readSends().length < MAX_SENDS;
}

function recordSend() {
  try {
    const sends = readSends();
    sends.push(Date.now());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sends));
  } catch {
    // Storage unavailable (private mode) — form still works, just without the cap.
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export function Contact() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [limited, setLimited] = useState(() => !canSend());
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Honeypot: bots fill this hidden field; humans never see it.
    try {
      const honeypot = new FormData(e.currentTarget as HTMLFormElement).get("_gotcha");
      if (typeof honeypot === "string" && honeypot.trim() !== "") {
        setSentName(form.name.trim().split(/\s+/)[0].slice(0, 30));
        setSent(true);
        setTimeout(() => {
          setSent(false);
          setSentName("");
        }, 5000);
        return;
      }
    } catch {
      // FormData unavailable — continue with normal flow.
    }

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!canSend()) {
      setLimited(true);
      setError(LIMIT_MESSAGE);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const subject = form.subject.trim();
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _subject: `Portfolio: ${subject || "New message"} — from ${name}`,
          _replyto: email,
        }),
        signal: controller.signal,
      });
      const text = await response.text();
      let data: { error?: string; errors?: { message?: string }[] } = {};
      try {
        data = text ? (JSON.parse(text) as typeof data) : {};
      } catch {
        data = {};
      }
      if (response.ok) {
        recordSend();
        if (readSends().length >= MAX_SENDS) setLimited(true);
        setSentName(name.split(/\s+/)[0].slice(0, 30));
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => {
          setSent(false);
          setSentName("");
        }, 5000);
      } else {
        const formError = data.errors?.map((er) => er.message).filter(Boolean).join(" ");
        setError(formError || data.error || "Message failed to send. Please try again or email me directly.");
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("Request timed out. Please try again or email me directly.");
      } else {
        setError("Failed to send message. Please check your connection or email me directly.");
      }
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl text-sm text-gray-200 outline-none transition-all duration-300 border ${focused === field
      ? "border-purple-500/60 bg-purple-900/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
      : "border-white/10 bg-white/5 hover:border-white/20"
    }`;

  return (
    <section id="contact" className="relative z-10 py-24 px-6 pb-32">
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
            Let's{" "}
            <span style={{
              background: "linear-gradient(135deg, #c084fc, #60a5fa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Work Together
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Have a dataset to clean, a report to automate, or a role to fill?
            I usually reply within a day.
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
              <p className="text-gray-400 text-xs mt-2">— W. Edwards Deming</p>
            </div>

            {/* Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Philippines · Open to Remote & On-site Opportunities</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>kenmontano098@gmail.com</span>
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-3">
              <p className="text-gray-400 text-xs uppercase tracking-widest">Connect with me</p>
              {socialLinks.map(({ icon: Icon, label, href, username }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-purple-500/30 hover:bg-purple-900/10 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-lg border border-purple-900/40 bg-purple-900/20 flex items-center justify-center group-hover:border-purple-500/50 transition-all">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-gray-300 text-sm" style={{ fontWeight: 500 }}>{label}</div>
                    <div className="text-gray-400 text-xs">{username}</div>
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
                <div role="alert" className="mb-2 p-2.5 rounded-xl bg-red-900/40 text-red-300 text-xs text-center border border-red-700/30">
                  {error}
                </div>
              )}
              {sent && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, scale: 0.97, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mb-2 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center"
                  style={{
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 0 20px rgba(52,211,153,0.15)",
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-emerald-300" />
                    <p className="text-sm text-white" style={{ fontWeight: 600 }}>
                      Thanks{sentName ? `, ${sentName}` : ""}! Your message is on its way.
                    </p>
                  </div>
                  <p className="text-xs text-gray-300">
                    I usually reply within a day — talk soon.
                  </p>
                </motion.div>
              )}
              <h3 className="text-gray-200 mb-2" style={{ fontWeight: 600 }}>
                Send a Message
              </h3>
              <p className="text-xs text-gray-400 -mt-1 mb-1">
                Prefer email? Reach me directly at{" "}
                <a href="mailto:kenmontano098@gmail.com" className="text-purple-300 hover:text-purple-200 underline underline-offset-2">
                  kenmontano098@gmail.com
                </a>
                .
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs text-gray-400 mb-1.5">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
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
                  <label htmlFor="contact-email" className="block text-xs text-gray-400 mb-1.5">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
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
                <label htmlFor="contact-subject" className="block text-xs text-gray-400 mb-1.5">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  autoComplete="off"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  placeholder="Opportunities / Collaboration / Data Project"
                  className={inputClass("subject")}
                  style={{ background: "rgba(255,255,255,0.04)" }}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs text-gray-400 mb-1.5">Message</label>
                <textarea
                  id="contact-message"
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

              {/* Honeypot anti-spam field — hidden from humans, bots fill it in */}
              <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-gotcha">Leave this field empty</label>
                <input
                  id="contact-gotcha"
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: limited ? 1 : 1.02 }}
                whileTap={{ scale: limited ? 1 : 0.98 }}
                disabled={loading || sent || limited}
                title={limited ? LIMIT_MESSAGE : undefined}
                className="w-full py-3 rounded-xl text-white text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
                    Sending...
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Message Sent!
                  </>
                ) : limited ? (
                  <>
                    <Send className="w-4 h-4" />
                    Daily Limit Reached
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
