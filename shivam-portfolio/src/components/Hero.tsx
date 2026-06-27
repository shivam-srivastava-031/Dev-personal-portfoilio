import { motion, useScroll, useTransform, useMotionValue, useSpring, type Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Mail, Eye, Download, Linkedin } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import heroImage from "@/assets/hero-bg.jpg";
import shivamPhoto from "@/assets/shivam-photo.jpg";

const roles = [
  "Full Stack Developer",
  "Data Analyst",
  "Problem Solver",
  "Python Developer",
  "React.js Developer",
];

const skillChips = [
  { label: "Django REST", icon: "⚡", color: "primary", side: "left",  top: "38%" },
  { label: "AI / ML",     icon: "🤖", color: "accent",  side: "right", top: "28%" },
  { label: "React.js",    icon: "⚛️",  color: "primary", side: "left",  top: "62%" },
  { label: "Python",      icon: "🐍", color: "accent",  side: "right", top: "62%" },
];

const Hero = () => {
  const containerRef = useRef(null);
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(role.substring(0, displayText.length + 1));
        if (displayText.length === role.length) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setDisplayText(role.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8 } },
  };

  // Mouse-position parallax — different depths for orbs, photo, and text
  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);

  const orbX = useSpring(useTransform(heroMouseX, [-0.5, 0.5], [-22, 22]), { stiffness: 55, damping: 18 });
  const orbY = useSpring(useTransform(heroMouseY, [-0.5, 0.5], [-14, 14]), { stiffness: 55, damping: 18 });
  const photoX = useSpring(useTransform(heroMouseX, [-0.5, 0.5], [-32, 32]), { stiffness: 75, damping: 22 });
  const photoY = useSpring(useTransform(heroMouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 75, damping: 22 });

  const onHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    heroMouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    heroMouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onHeroMouseLeave = () => {
    heroMouseX.set(0);
    heroMouseY.set(0);
  };

  // Live IST clock
  const [istTime, setIstTime] = useState(() =>
    new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false })
  );
  useEffect(() => {
    const id = setInterval(() => {
      setIstTime(new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
      onMouseMove={onHeroMouseMove}
      onMouseLeave={onHeroMouseLeave}
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src={heroImage} alt="" className="w-full h-[120%] object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/90 to-background" />
      </motion.div>

      {/* Hex grid */}
      <div className="hex-grid-bg opacity-40" />

      {/* Neural Particle Canvas */}
      <ParticleBackground />

      {/* Morphing gradient orbs — shift with mouse at slowest depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute inset-0" style={{ x: orbX, y: orbY }}>
          <motion.div
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/8 to-accent/5 blur-[100px]"
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent/5 to-primary/8 blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Violet AI orb */}
          <motion.div
            className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-violet-500/5 to-primary/5 blur-[80px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Floating dots */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-dot bg-primary"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            top: `${15 + Math.random() * 70}%`,
            left: `${5 + Math.random() * 90}%`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: [0, -(15 + Math.random() * 25), 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{ duration: 3 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
        />
      ))}

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20"
        style={{ opacity }}
      >
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-7">

          {/* ── Profile Photo Frame — floats at deepest depth ── */}
          <motion.div variants={item} className="flex justify-center">
            <motion.div style={{ x: photoX, y: photoY }}>
            <div className="relative w-44 h-44 md:w-52 md:h-52">

              {/* Outer ambient glow */}
              <motion.div
                className="absolute -inset-6 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(0,212,170,0.18) 0%, transparent 70%)" }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Rotating conic-gradient border */}
              <motion.div
                className="absolute -inset-[3px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #00D4AA 0%, transparent 25%, #FFD700 50%, transparent 75%, #00D4AA 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />

              {/* Dark fill ring */}
              <div className="absolute inset-[3px] rounded-full bg-background" />

              {/* Secondary slower ring */}
              <motion.div
                className="absolute -inset-[8px] rounded-full opacity-30"
                style={{ border: "1px solid rgba(0,212,170,0.4)" }}
                animate={{ rotate: -360, scale: [1, 1.05, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />

              {/* Photo */}
              <div className="absolute inset-[6px] rounded-full overflow-hidden neural-ring neon-frame-teal photo-scanlines">
                <img
                  src={shivamPhoto}
                  alt="Shivam Kumar Srivastava"
                  className="w-full h-full object-cover object-top scale-105"
                />
                {/* Holographic overlay */}
                <div className="holographic absolute inset-0" />
              </div>

              {/* Online indicator */}
              <motion.div
                className="absolute bottom-[10px] right-[10px] z-20 w-5 h-5 rounded-full bg-emerald-400 border-[3px] border-background"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(52,211,153,0.9)",
                    "0 0 16px rgba(52,211,153,0.9)",
                    "0 0 0px rgba(52,211,153,0.9)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Floating skill chips — desktop only */}
              {skillChips.map((chip, i) => (
                <motion.div
                  key={i}
                  className={`data-badge absolute hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border backdrop-blur-md whitespace-nowrap ${
                    chip.color === "primary"
                      ? "border-primary/30 bg-primary/8 text-primary"
                      : "border-accent/30 bg-accent/8 text-accent"
                  }`}
                  style={{
                    top: chip.top,
                    [chip.side]: chip.side === "left" ? "-128px" : "-116px",
                    transform: "translateY(-50%)",
                  }}
                  animate={{ y: [0, i % 2 === 0 ? -5 : 4, 0], x: [0, i % 2 === 0 ? -2 : 2, 0] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                >
                  <span>{chip.icon}</span>
                  <span>{chip.label}</span>
                </motion.div>
              ))}
            </div>
            </motion.div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight"
          >
            <span className="gradient-text-animated glitch" data-text="Shivam Kumar">
              Shivam Kumar
            </span>
            <br />
            <span className="text-foreground">Srivastava</span>
          </motion.h1>

          {/* Typewriter Role */}
          <motion.div variants={item} className="h-10 flex items-center justify-center">
            <span className="text-xl md:text-2xl font-medium text-muted-foreground">{"< "}</span>
            <span className="text-xl md:text-2xl font-semibold text-primary mx-1 font-mono">{displayText}</span>
            <motion.span
              className="text-xl md:text-2xl font-semibold text-primary"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
            >|</motion.span>
            <span className="text-xl md:text-2xl font-medium text-muted-foreground">{" />"}</span>
          </motion.div>

          {/* Status Badge */}
          <motion.div variants={item} className="flex justify-center">
            <motion.div
              className="border-glow inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-background/80 backdrop-blur-md cursor-default"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            >
              <div className="relative z-10 flex items-center gap-3">
                <div className="relative flex items-center justify-center w-4 h-4 shrink-0">
                  <motion.span
                    className="absolute w-4 h-4 rounded-full bg-primary/35"
                    animate={{ scale: [1, 2.6], opacity: [0.55, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.span
                    className="absolute w-4 h-4 rounded-full bg-primary/20"
                    animate={{ scale: [1, 2.6], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.55 }}
                  />
                  <span className="relative w-2 h-2 rounded-full bg-primary" style={{ boxShadow: "0 0 8px 2px rgba(0,212,170,0.7)" }} />
                </div>
                <span className="text-sm font-semibold tracking-wide gradient-text-animated whitespace-nowrap">
                  Open to Opportunities
                </span>
                <motion.div
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30"
                  animate={{ boxShadow: ["0 0 0px rgba(52,211,153,0)", "0 0 10px rgba(52,211,153,0.35)", "0 0 0px rgba(52,211,153,0)"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-bold text-emerald-400 tracking-widest uppercase">Available</span>
                </motion.div>

                {/* Divider */}
                <div className="w-px h-4 bg-border/40" />

                {/* Live IST clock */}
                <div className="flex items-center gap-1">
                  <motion.span
                    className="w-1 h-1 rounded-full bg-primary/60"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.span
                    key={istTime}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] font-mono text-muted-foreground/70 tracking-wider"
                  >
                    {istTime} IST
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Final-year B.Tech CSE student crafting{" "}
            <span className="text-foreground font-medium">data-driven platforms</span> and{" "}
            <span className="text-foreground font-medium">scalable applications</span> with
            Python, SQL, JavaScript & modern frameworks.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold group relative overflow-hidden"
              onClick={() => scrollToSection("projects")}
            >
              <span className="relative z-10 flex items-center">
                <Eye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                View Projects
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary/50 px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="bg-accent/90 hover:bg-accent text-background px-8 py-6 text-lg font-semibold group"
              asChild
            >
              <a href="/shivam-resume.docx" download="shivam-resume.docx">
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={item} className="flex justify-center gap-3 pt-2">
            {[
              {
                href: "https://github.com/shivam-srivastava-031",
                label: "GitHub",
                icon: (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
              { href: "https://linkedin.com/in/shivam-kumar-srivastava-675893211", label: "LinkedIn", icon: <Linkedin className="h-5 w-5" /> },
              { href: "mailto:shivamsrivastava@1307", label: "Email", icon: <Mail className="h-5 w-5" /> },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : "_self"}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : ""}
                aria-label={social.label}
                className="p-3 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 icon-glow"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="cursor-pointer flex flex-col items-center gap-2"
            onClick={() => scrollToSection("about")}
          >
            <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
            <ChevronDown className="h-6 w-6 text-primary" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
